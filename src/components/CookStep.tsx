import { motion } from 'framer-motion'
import type { Step } from '@/lib/recipeParser'
import Timer from './Timer'

interface CookStepProps {
  step: Step
  stepNumber: number
  isActive: boolean
  onComplete: () => void
}

export default function CookStep({
  step,
  stepNumber,
  isActive,
  onComplete
}: CookStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`p-6 rounded-lg ${
        isActive ? 'bg-white shadow-lg' : 'bg-gray-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full ${
            isActive ? 'bg-blue-500' : 'bg-gray-300'
          } text-white flex items-center justify-center font-semibold`}
        >
          {stepNumber}
        </div>
        
        <div className="flex-grow">
          <p className="text-lg mb-4">{step.instruction}</p>
          
          {step.ingredients.length > 0 && (
            <div className="mb-6 space-y-2">
              <h4 className="font-medium">Ingredients for this step:</h4>
              <ul className="list-disc list-inside space-y-1">
                {step.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="text-gray-700">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                    {ingredient.notes && (
                      <span className="text-gray-500"> ({ingredient.notes})</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {isActive && step.timer && (
            <div className="mb-6">
              <Timer
                duration={step.timer.duration}
                label={step.timer.label}
              />
            </div>
          )}
          
          {isActive && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              onClick={onComplete}
            >
              Complete Step
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
} 