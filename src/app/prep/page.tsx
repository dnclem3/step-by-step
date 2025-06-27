'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Box, Typography, Link as MuiLink } from '@mui/material'
import { useRecipe } from '@/lib/recipeContext'
import PrepView from '@/components/PrepView'
import toast from 'react-hot-toast'

export default function PrepPage() {
  const router = useRouter()
  const {
    recipe,
    setIsPreparationComplete
  } = useRecipe()

  useEffect(() => {
    if (!recipe) {
      toast.error('No recipe selected')
      router.push('/')
    }
  }, [recipe, router])

  const handleComplete = () => {
    setIsPreparationComplete(true)
    toast.success('Preparation complete! Ready to cook!')
    router.push('/cook')
  }

  if (!recipe) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            No Recipe Selected
          </Typography>
          <MuiLink
            component={Link}
            href="/"
            sx={{
              color: 'primary.main',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'underline'
              }
            }}
          >
            Return Home
          </MuiLink>
        </Box>
      </Box>
    )
  }

  return (
    <PrepView 
      steps={recipe.prep}
      title={recipe.title}
      onComplete={handleComplete}
    />
  )
} 