'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import theme from '@/lib/theme';

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 