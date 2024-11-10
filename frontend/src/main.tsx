import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './config/reactQuery.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from './components/ui/toaster.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
)
