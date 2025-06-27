'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Container, Typography, TextField, Button, Tab, Tabs } from '@mui/material'
import { extractRecipeFromUrl, parseRecipeContent } from '@/lib/recipeParser'
import { useRecipe } from '@/lib/recipeContext'
import { testRecipe } from '@/lib/testRecipe'
import toast from 'react-hot-toast'

export default function Home() {
  const router = useRouter()
  const { setRecipe } = useRecipe()
  const [url, setUrl] = useState('')
  const [recipeText, setRecipeText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (activeTab === 0 && !url.trim()) {
      toast.error('Please enter a recipe URL')
      return
    }

    if (activeTab === 1 && !recipeText.trim()) {
      toast.error('Please paste a recipe')
      return
    }

    setIsLoading(true)
    console.log('Starting recipe extraction...')
    console.log('Input:', activeTab === 0 ? { url } : { content: recipeText })
    
    try {
      const result = activeTab === 0 
        ? await extractRecipeFromUrl(url)
        : await parseRecipeContent(recipeText)
      
      console.log('API Response:', result)
      
      if ('code' in result) {
        console.error('Extraction error:', result)
        toast.error(result.message)
        return
      }
      
      // Save the recipe to local storage and context
      const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
      recipes.push(result)
      localStorage.setItem('recipes', JSON.stringify(recipes))
      setRecipe(result)
      
      console.log('Recipe saved successfully:', result)
      toast.success('Recipe extracted successfully!')
      router.push('/prep')
    } catch (error) {
      console.error('Extraction failed:', error)
      toast.error('Failed to extract recipe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestRecipe = () => {
    // Save test recipe to local storage and context
    const recipes = JSON.parse(localStorage.getItem('recipes') || '[]')
    recipes.push(testRecipe)
    localStorage.setItem('recipes', JSON.stringify(recipes))
    setRecipe(testRecipe)
    
    toast.success('Test recipe loaded!')
    router.push('/prep')
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        pt: 8
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Step-by-Step
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            A simpler way to make dinner
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(_, newValue) => setActiveTab(newValue)}
            centered
          >
            <Tab label="Recipe URL" />
            <Tab label="Paste Recipe" />
          </Tabs>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          {activeTab === 0 ? (
            <TextField
              fullWidth
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste recipe URL here..."
              disabled={isLoading}
              sx={{ mb: 2 }}
            />
          ) : (
            <TextField
              fullWidth
              multiline
              rows={6}
              value={recipeText}
              onChange={(e) => setRecipeText(e.target.value)}
              placeholder="Paste recipe text here..."
              disabled={isLoading}
              sx={{ mb: 2 }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ mb: 2 }}
          >
            {isLoading ? 'Processing...' : 'Extract Recipe'}
          </Button>

          <Button
            onClick={handleTestRecipe}
            variant="outlined"
            fullWidth
            disabled={isLoading}
          >
            Load Test Recipe
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
