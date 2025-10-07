import { useToast as useToastContext } from '../contexts/ToastContext'
import { ToastType } from '../components/ui/Toast'

export const useToast = () => {
  const { showToast, hideToast, hideAllToasts } = useToastContext()

  const success = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'success',
      title,
      message,
      duration,
    })
  }

  const error = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'error',
      title,
      message,
      duration,
    })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'warning',
      title,
      message,
      duration,
    })
  }

  const info = (title: string, message?: string, duration?: number) => {
    showToast({
      type: 'info',
      title,
      message,
      duration,
    })
  }

  const custom = (
    type: ToastType,
    title: string,
    message?: string,
    duration?: number,
    onPress?: () => void
  ) => {
    showToast({
      type,
      title,
      message,
      duration,
      onPress,
    })
  }

  return {
    success,
    error,
    warning,
    info,
    custom,
    hideToast,
    hideAllToasts,
  }
}
