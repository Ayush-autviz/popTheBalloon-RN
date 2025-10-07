import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './src/utils/queryClient'
import { ToastProvider } from './src/contexts/ToastContext'

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </QueryClientProvider>
  )
}