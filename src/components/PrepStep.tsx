import { motion } from 'framer-motion'
import { Box, Typography, Stack } from '@mui/material'
import type { PrepStep as PrepStepType } from '@/lib/recipeParser'

interface PrepStepProps {
  step: PrepStepType
  isActive: boolean
  onComplete: () => void
}

export default function PrepStep({
  step,
  isActive,
  onComplete
}: PrepStepProps) {
  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Box 
        sx={{ 
          px: 4, 
          py: 6,
          bgcolor: 'background.paper',
          borderRadius: 2
        }}
      >
        <Stack spacing={6}>
          <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            fontSize: '2.5rem', 
            fontWeight: 500, 
            lineHeight: 1.3,
          }}>
            Prep
          </Typography>

          {/* Instruction with icon */}
          <Stack direction="row" spacing={3} alignItems="center">
            <Typography 
              variant="h1" 
              component="span"
              sx={{ 
                fontSize: { xs: '5rem', sm: '6rem' },
                lineHeight: 1
              }}
            >
              {step.icon} {step.instruction}
            </Typography>
          </Stack>
          {/* Ingredient details */}
          <Stack spacing={2.5}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontSize: { xs: '2.25rem', sm: '3rem' },
                fontWeight: 400
              }}
            >
              {step.quantity} {step.ingredient}
              <br />
              Place in {step.placement}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  )
} 