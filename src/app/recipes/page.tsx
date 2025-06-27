'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiChevronLeft } from 'react-icons/fi'
import Link from 'next/link'
import type { Recipe } from '@/lib/recipeParser'
import RecipeCard from '@/components/RecipeCard'

export default function RecipesPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    // Get all recipes from local storage
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]')
    setRecipes(storedRecipes)
  }, [])

  const handleSelectRecipe = (index: number) => {
    // Move the selected recipe to the end of the array (making it the "current" recipe)
    const updatedRecipes = [...recipes]
    const [selectedRecipe] = updatedRecipes.splice(index, 1)
    updatedRecipes.push(selectedRecipe)
    
    // Update local storage and navigate to prep mode
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes))
    router.push('/prep')
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <FiChevronLeft className="mr-2" />
            Back to Home
          </Link>

          <h1 className="text-2xl font-bold">My Recipes</h1>

          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {recipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg text-center"
          >
            <p className="text-gray-600 mb-4">
              You haven't saved any recipes yet.
            </p>
            <Link
              href="/extract"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Extract Your First Recipe
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onSelect={() => handleSelectRecipe(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 