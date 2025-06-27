'use client'

import { useEffect } from 'react'
import { useRecipe } from '@/lib/recipeContext'
import type { Recipe } from '@/lib/recipeParser'

export default function RecipeInitializer() {
  const { setRecipe } = useRecipe()

  useEffect(() => {
    // Load the most recent recipe from localStorage
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]') as Recipe[]
    if (recipes.length > 0) {
      setRecipe(recipes[recipes.length - 1])
    }
  }, [setRecipe])

  return null
} 