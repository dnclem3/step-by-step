import { motion } from 'framer-motion'
import { FiClock, FiExternalLink } from 'react-icons/fi'
import Link from 'next/link'
import type { Recipe } from '@/lib/recipeParser'

interface RecipeCardProps {
  recipe: Recipe
  onSelect: () => void
}

export default function RecipeCard({ recipe, onSelect }: RecipeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{recipe.title}</h3>
        {recipe.sourceUrl && (
          <Link
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiExternalLink size={20} />
          </Link>
        )}
      </div>

      <div className="flex items-center text-gray-600 mb-4">
        <FiClock className="mr-2" />
        <span>{recipe.totalTime} minutes</span>
      </div>

      <div className="space-y-2">
        <div>
          <span className="font-medium">Prep Steps:</span>
          <span className="ml-2 text-gray-600">
            {recipe.prep.length} items
          </span>
        </div>
        <div>
          <span className="font-medium">Cook Steps:</span>
          <span className="ml-2 text-gray-600">
            {recipe.cook.length} items
          </span>
        </div>
      </div>

      {recipe.servings && (
        <div className="mt-4 text-sm text-gray-500">
          Serves {recipe.servings} people
        </div>
      )}
    </motion.div>
  )
} 