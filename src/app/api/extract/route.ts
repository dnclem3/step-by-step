import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { OPENAI_API_KEY, RECIPE_SYSTEM_PROMPT } from '@/lib/config'
import { JSDOM } from 'jsdom'
import type { Recipe } from '@/lib/recipeParser'

if (!OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables')
}

// Initialize OpenAI client with API key directly
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

async function fetchRecipeContent(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch recipe page')
  }
  return await response.text()
}

function extractRecipeContent(html: string): string {
  const dom = new JSDOM(html)
  const document = dom.window.document

  // Remove unwanted elements
  const unwantedSelectors = [
    'script',
    'style',
    'nav',
    'header',
    'footer',
    '.nav',
    '.header',
    '.footer',
    '.sidebar',
    '.advertisement',
    '.ads',
    '.social-share',
    '.comments',
    '#comments',
    '.related-posts',
    '.navigation',
    'iframe',
    'noscript'
  ]
  
  unwantedSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.remove())
  })

  // Try to find the main recipe content first
  const recipeSelectors = [
    '[itemtype*="Recipe"]',
    '.recipe-content',
    '.recipe',
    '.post-content',
    '.entry-content',
    'article',
    'main'
  ]

  // Try to find specific recipe container
  for (const selector of recipeSelectors) {
    const element = document.querySelector(selector)
    const text = element?.textContent || ''
    const trimmed = text.trim()
    if (trimmed) {
      return trimmed
    }
  }

  // Fallback to body content if no recipe container found
  const bodyText = document.body?.textContent || ''
  return bodyText.trim()
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, content } = body
    console.log('API Request:', { url, content: content?.substring(0, 100) + '...' })

    let recipeContent: string
    let sourceUrl: string | null = null

    if (url) {
      console.log('Fetching recipe from URL:', url)
      recipeContent = await fetchRecipeContent(url)
      sourceUrl = url
    } else if (content) {
      console.log('Processing provided recipe content')
      recipeContent = content
    } else {
      console.log('Error: No URL or content provided')
      return NextResponse.json(
        { error: 'Either URL or content is required' },
        { status: 400 }
      )
    }

    // If URL was provided, extract content from HTML
    const extractedContent = url ? extractRecipeContent(recipeContent) : recipeContent

    console.log('Sending to OpenAI:', extractedContent.substring(0, 200) + '...')

    const systemMessage = RECIPE_SYSTEM_PROMPT
    const userMessage = "Extract recipe information from this content and return it as a JSON object:\n\n" + extractedContent

    // Extract recipe using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { 
          role: "system", 
          content: systemMessage
        },
        { 
          role: "user", 
          content: userMessage
        }
      ]
    })

    console.log('OpenAI Response:', completion.choices[0].message.content)

    const responseContent = completion.choices[0].message.content
    if (!responseContent) {
      throw new Error('No content received from OpenAI')
    }

    const parsedRecipe = JSON.parse(responseContent) as Recipe
    
    // Ensure all cook steps have a time value (null if not specified)
    if (Array.isArray(parsedRecipe.cook)) {
      parsedRecipe.cook = parsedRecipe.cook.map(step => ({
        ...step,
        time: step.time || null
      }))
    }

    // Add source URL if provided
    parsedRecipe.sourceUrl = sourceUrl

    console.log('Final processed recipe:', parsedRecipe)
    return NextResponse.json(parsedRecipe)
  } catch (error) {
    console.error('Recipe extraction error:', error)
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 