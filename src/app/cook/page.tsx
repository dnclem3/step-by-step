'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { useSwipeable } from 'react-swipeable'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRecipe } from '@/lib/recipeContext'
import Timer from '@/components/Timer'
import toast from 'react-hot-toast'

export default function CookView() {
  const router = useRouter()
  const {
    recipe,
    currentCookStep,
    setCurrentCookStep,
    isPreparationComplete
  } = useRecipe()

  useEffect(() => {
    if (!recipe) {
      toast.error('No recipe selected')
      router.push('/')
      return
    }

    if (!isPreparationComplete) {
      toast.error('Please complete preparation first')
      router.push('/prep')
    }
  }, [recipe, isPreparationComplete, router])

  const goToNextStep = () => {
    if (!recipe) return
    
    if (currentCookStep < recipe.cook.length - 1) {
      setCurrentCookStep(currentCookStep + 1)
    } else {
      toast.success('Cooking complete! Enjoy your meal! 🎉')
      router.push('/recipes')
    }
  }

  const goToPrevStep = () => {
    if (currentCookStep > 0) {
      setCurrentCookStep(currentCookStep - 1)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: goToNextStep,
    onSwipedRight: goToPrevStep,
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  if (!recipe || !isPreparationComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {!recipe ? 'No Recipe Selected' : 'Complete Preparation First'}
          </h1>
          <Link
            href={!recipe ? '/' : '/prep'}
            className="text-blue-500 hover:text-blue-600 underline"
          >
            {!recipe ? 'Return Home' : 'Go to Prep Mode'}
          </Link>
        </div>
      </div>
    )
  }

  const step = recipe.cook[currentCookStep]

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Cook Mode</h1>
        <p className="text-gray-600">
          Step {currentCookStep + 1} of {recipe.cook.length}
        </p>
      </div>

      {/* Main content */}
      <div 
        {...handlers}
        className="flex-grow flex items-center justify-center px-4"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCookStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full"
          >
            {/* Step icon and instruction */}
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">{step.icon}</span>
              <h2 className="text-2xl font-semibold">{step.instruction}</h2>
            </div>

            {/* Ingredients */}
            {step.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Ingredients:</h3>
                <ul className="space-y-2">
                  {step.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span className="text-gray-600">{ingredient.name}</span>
                      <span className="font-medium">{ingredient.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Timer */}
            {step.time && (
              <div className="mt-6">
                <Timer 
                  duration={parseInt(step.time)} 
                  label={`Step ${currentCookStep + 1}`}
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8 px-4">
        <button
          onClick={goToPrevStep}
          disabled={currentCookStep === 0}
          className={`p-4 rounded-full ${
            currentCookStep === 0 
              ? 'text-gray-400 bg-gray-100' 
              : 'text-gray-800 bg-white shadow-md hover:bg-gray-50'
          }`}
        >
          <FiArrowLeft size={24} />
        </button>
        <button
          onClick={goToNextStep}
          className="p-4 rounded-full text-gray-800 bg-white shadow-md hover:bg-gray-50"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  )
} 