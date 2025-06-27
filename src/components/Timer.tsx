import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface TimerProps {
  duration: number // in minutes
  label: string
  onComplete?: () => void
}

export default function Timer({ duration, label, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // Convert to seconds
  const [isRunning, setIsRunning] = useState(false)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(duration * 60)
    setIsRunning(false)
  }, [duration])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            onComplete?.()
            toast.success(`${label} timer complete!`)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, label, onComplete])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg"
    >
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="text-3xl font-mono mb-4">{formatTime(timeLeft)}</div>
      <div className="flex gap-2">
        <button
          onClick={toggleTimer}
          className={`px-4 py-2 rounded-md ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </motion.div>
  )
} 