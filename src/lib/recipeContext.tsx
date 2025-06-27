'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import type { Recipe } from './recipeParser'

interface RecipeContextType {
  recipe: Recipe | null
  setRecipe: (recipe: Recipe) => void
  currentPrepStep: number
  setCurrentPrepStep: (step: number) => void
  currentCookStep: number
  setCurrentCookStep: (step: number) => void
  isPreparationComplete: boolean
  setIsPreparationComplete: (complete: boolean) => void
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [currentPrepStep, setCurrentPrepStep] = useState(0)
  const [currentCookStep, setCurrentCookStep] = useState(0)
  const [isPreparationComplete, setIsPreparationComplete] = useState(false)

  return (
    <RecipeContext.Provider
      value={{
        recipe,
        setRecipe,
        currentPrepStep,
        setCurrentPrepStep,
        currentCookStep,
        setCurrentCookStep,
        isPreparationComplete,
        setIsPreparationComplete,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipe() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error('useRecipe must be used within a RecipeProvider')
  }
  return context
} 