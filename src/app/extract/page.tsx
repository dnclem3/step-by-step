'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiChevronLeft, FiLoader } from 'react-icons/fi'
import Link from 'next/link'
import { extractRecipeFromUrl } from '@/lib/recipeParser'
import { useRecipe } from '@/lib/recipeContext'
import type { Recipe } from '@/lib/recipeParser'

export default function ExtractPage() {
  const router = useRouter()
  const { setRecipe } = useRecipe()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      toast.error('Please enter a recipe URL')
      return
    }

    setIsLoading(true)
    
    try {
      const result = await extractRecipeFromUrl(url)
      
      if ('code' in result) {
        toast.error(result.message)
        return
      }
      
      // Save the recipe to local storage and context
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
      recipes.push(result)
      localStorage.setItem('recipes', JSON.stringify(recipes))
      
      // Set the current recipe in context
      setRecipe(result)
      
      toast.success('Recipe extracted successfully!')
      router.push('/prep')
    } catch (error) {
      toast.error('Failed to extract recipe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <FiChevronLeft className="mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-3xl font-bold mb-6">
            Extract a Recipe
          </h1>
          
          <p className="text-gray-600 mb-8">
            Paste a recipe URL below and Chef Mode will break it down into simple,
            easy-to-follow steps.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipe URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/recipe"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin mr-2" />
                  Extracting Recipe...
                </>
              ) : (
                'Extract Recipe'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
} 