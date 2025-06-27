import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import ThemeRegistry from '@/components/ThemeRegistry'
import { RecipeProvider } from '@/lib/recipeContext'
import RecipeInitializer from '@/components/RecipeInitializer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Step by Step Recipe App',
  description: 'A focused cooking experience',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <RecipeProvider>
            <RecipeInitializer />
            {children}
            <Toaster />
          </RecipeProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
