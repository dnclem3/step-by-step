'use client'

import { useState } from 'react'
import { extractRecipeFromUrl, parseRecipeContent } from '@/lib/recipeParser'
import type { Recipe, RecipeParseError } from '@/lib/recipeParser'

export default function TestPage() {
  const [url, setUrl] = useState('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/')
  const [recipeText, setRecipeText] = useState('')
  const [result, setResult] = useState<Recipe | RecipeParseError | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUrlTest = async () => {
    setLoading(true)
    try {
      const recipe = await extractRecipeFromUrl(url)
      setResult(recipe)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTextTest = async () => {
    setLoading(true)
    try {
      const recipe = await parseRecipeContent(recipeText)
      setResult(recipe)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Recipe Extraction Test</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">URL Extraction</h2>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4"
            placeholder="Enter recipe URL"
          />
          <button
            onClick={handleUrlTest}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            {loading ? 'Extracting...' : 'Test URL Extraction'}
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Text Extraction</h2>
          <textarea
            value={recipeText}
            onChange={(e) => setRecipeText(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mb-4 h-48"
            placeholder="Paste recipe text here"
          />
          <button
            onClick={handleTextTest}
            disabled={loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            {loading ? 'Extracting...' : 'Test Text Extraction'}
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
} 