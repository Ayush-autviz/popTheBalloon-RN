import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import Toast, { ToastConfig, ToastType } from '../components/ui/Toast'

type ToastContextType = {
  showToast: (config: Omit<ToastConfig, 'id'>) => void
  hideToast: (id: string) => void
  hideAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([])

  const showToast = useCallback((config: Omit<ToastConfig, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    const newToast: ToastConfig = {
      ...config,
      id,
    }
    
    setToasts(prev => [...prev, newToast])
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const hideAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const contextValue: ToastContextType = {
    showToast,
    hideToast,
    hideAllToasts,
  }

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <View style={styles.toastContainer} pointerEvents="box-none">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            toast={toast}
            onHide={hideToast}
          />
        ))}
      </View>
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
})
