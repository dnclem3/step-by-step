'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSwipeable } from 'react-swipeable'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { Box, AppBar, Toolbar, Typography, IconButton, Container, useTheme, useMediaQuery } from '@mui/material'
import type { PrepStep as PrepStepType } from '@/lib/recipeParser'
import PrepStep from './PrepStep'

interface PrepViewProps {
  steps: PrepStepType[]
  onComplete: () => void
  title: string
}

export default function PrepView({ steps, onComplete, title }: PrepViewProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
    preventScrollOnSwipe: true,
    trackMouse: true
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (!steps.length) {
    return (
      <Box 
        sx={{ 
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'background.paper'
        }}
      >
        <Typography 
          variant="h4" 
          color="text.secondary"
          sx={{ fontSize: { xs: '2.5rem', sm: '3rem' } }}
        >
          No preparation steps found.
        </Typography>
      </Box>
    )
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column'
      }}
      {...handlers}
    >
      {/* Header */}
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          bgcolor: 'grey.50',
          borderBottom: 2,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ px: { xs: 3, sm: 4 }, py: { xs: 2.5, sm: 3 } }}>
            <Typography 
              variant="h3" 
              component="h1"
              noWrap
              sx={{
                fontSize: { xs: '2.75rem', sm: '3.5rem' },
                fontWeight: 500
              }}
            >
              {title}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main content area */}
      <Box 
        sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Step content */}
        <Box 
          sx={{ 
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            py: { xs: 6, sm: 8 }
          }}
        >
          <Container maxWidth="lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                style={{ width: '100%' }}
              >
                <PrepStep
                  step={steps[currentStep]}
                  isActive={true}
                  onComplete={handleNext}
                />
              </motion.div>
            </AnimatePresence>
          </Container>
        </Box>

        {/* Navigation controls */}
        <Box 
          sx={{ 
            py: 4,
            borderTop: 2,
            borderColor: 'divider',
            bgcolor: 'grey.50'
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: { xs: 3, sm: 4 }
              }}
            >
              <IconButton
                onClick={handlePrevious}
                disabled={currentStep === 0}
                size="large"
                sx={{
                  opacity: currentStep === 0 ? 0.3 : 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  },
                  p: 2
                }}
              >
                <FiChevronLeft size={48} />
              </IconButton>

              {/* Step counter for desktop */}
              {!isMobile && (
                <Typography 
                  variant="h4"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '2.25rem', sm: '2.5rem' } }}
                >
                  Step {currentStep + 1} of {steps.length}
                </Typography>
              )}

              {/* Mobile dots */}
              {isMobile && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {steps.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        bgcolor: index === currentStep ? 'primary.main' : 'grey.300',
                        transition: 'background-color 0.2s'
                      }}
                    />
                  ))}
                </Box>
              )}

              <IconButton
                onClick={handleNext}
                size="large"
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover'
                  },
                  p: 2
                }}
              >
                <FiChevronRight size={48} />
              </IconButton>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  )
} 