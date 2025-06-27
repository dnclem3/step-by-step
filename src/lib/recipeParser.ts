export interface PrepStep {
  instruction: string
  ingredient: string
  quantity: string
  placement: string
  icon: string
}

export interface CookIngredient {
  name: string
  quantity: string
}

export interface CookStep {
  instruction: string
  ingredients: CookIngredient[]
  time: string | null
  method: string
  icon: string
}

export interface Recipe {
  title: string
  sourceUrl: string | null
  prep: PrepStep[]
  cook: CookStep[]
}

export interface RecipeParseError {
  message: string
  code: 'INVALID_URL' | 'EXTRACTION_FAILED' | 'PARSING_FAILED'
}

export async function extractRecipeFromUrl(url: string): Promise<Recipe | RecipeParseError> {
  try {
    const urlObj = new URL(url)
    
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: url }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        message: data.error || 'Failed to extract recipe',
        code: 'EXTRACTION_FAILED'
      }
    }

    return data as Recipe
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid URL')) {
      return {
        message: 'Invalid URL provided',
        code: 'INVALID_URL'
      }
    }
    
    return {
      message: error instanceof Error ? error.message : 'Failed to extract recipe',
      code: 'EXTRACTION_FAILED'
    }
  }
}

export async function parseRecipeContent(content: string): Promise<Recipe | RecipeParseError> {
  try {
    const response = await fetch('/api/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        message: data.error || 'Failed to parse recipe',
        code: 'PARSING_FAILED'
      }
    }

    return data as Recipe
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Failed to parse recipe',
      code: 'PARSING_FAILED'
    }
  }
} 