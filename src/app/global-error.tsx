'use client'

import { useEffect } from 'react'
import { Button, Container, Typography, Box } from '@mui/material'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <Container maxWidth="sm">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Something went wrong!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              A critical error occurred. Please try refreshing the page.
            </Typography>
            <Button
              variant="contained"
              onClick={reset}
              sx={{ mt: 2 }}
            >
              Try again
            </Button>
          </Box>
        </Container>
      </body>
    </html>
  )
} 