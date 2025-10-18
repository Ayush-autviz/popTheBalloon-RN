import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Sound from 'react-native-nitro-sound'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import Button from '../ui/Button'
import GradientProgressBar from '../ui/ProgressBar'
import { requestMicrophonePermission, showPermissionDeniedAlert } from '../../utils/audioPermissions'

export type VoiceRecorderProps = {
  maxDuration?: number // in seconds
  onRecordingComplete?: (filePath: string) => void
  onRecordingStart?: () => void
  onRecordingStop?: () => void
}

export type RecordingState = 'idle' | 'recording' | 'paused' | 'loading'

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  maxDuration = 60, // 1 minute default
  onRecordingComplete,
  onRecordingStart,
  onRecordingStop,
}) => {
  const [state, setState] = useState<RecordingState>('idle')
  const [currentTime, setCurrentTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [recordingPath, setRecordingPath] = useState<string | null>(null)

  const progress = currentTime / maxDuration
  const timeString = formatTime(currentTime)
  const maxTimeString = formatTime(maxDuration)


  const startRecording = useCallback(async () => {
    const permissionResult = await requestMicrophonePermission()
    if (!permissionResult.granted) {
      if (permissionResult.error) {
        Alert.alert('Permission Error', permissionResult.error)
      } else {
        showPermissionDeniedAlert()
      }
      return
    }

    setIsLoading(true)
    setState('loading')

    try {
      // Set up recording progress listener
      Sound.addRecordBackListener((e) => {
        const seconds = Math.floor(e.currentPosition / 1000)
        setCurrentTime(seconds)

        // Auto-stop at max duration
        if (seconds >= maxDuration) {
          stopRecording()
        }
      })

      const result = await Sound.startRecorder()
      setRecordingPath(result)
      setState('recording')
      setCurrentTime(0)
      onRecordingStart?.()
    } catch (error) {
      console.error('Failed to start recording:', error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      Alert.alert('Recording Error', `Failed to start recording: ${errorMessage}`)
      setState('idle')
    } finally {
      setIsLoading(false)
    }
  }, [maxDuration, onRecordingStart])

  const stopRecording = useCallback(async () => {
    if (state !== 'recording') return

    setIsLoading(true)
    setState('loading')

    try {
      const result = await Sound.stopRecorder()
      Sound.removeRecordBackListener()
      setState('idle')
      onRecordingStop?.()
      onRecordingComplete?.(result)
    } catch (error) {
      console.error('Failed to stop recording:', error)
      Alert.alert('Recording Error', 'Failed to stop recording.')
      setState('idle')
    } finally {
      setIsLoading(false)
    }
  }, [state, onRecordingStop, onRecordingComplete])

  const pauseRecording = useCallback(async () => {
    if (state !== 'recording') return

    setIsLoading(true)
    try {
      await Sound.pauseRecorder()
      setState('paused')
    } catch (error) {
      console.error('Failed to pause recording:', error)
    } finally {
      setIsLoading(false)
    }
  }, [state])

  const resumeRecording = useCallback(async () => {
    if (state !== 'paused') return

    setIsLoading(true)
    try {
      await Sound.resumeRecorder()
      setState('recording')
    } catch (error) {
      console.error('Failed to resume recording:', error)
    } finally {
      setIsLoading(false)
    }
  }, [state])

  const resetRecording = useCallback(() => {
    setCurrentTime(0)
    setRecordingPath(null)
    setState('idle')
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Sound.removeRecordBackListener()
    }
  }, [])

  const getButtonText = () => {
    if (isLoading) return 'Loading...'
    switch (state) {
      case 'recording': return 'Stop Recording'
      case 'paused': return 'Resume'
      case 'idle': return 'Record'
      default: return 'Record'
    }
  }

  const getButtonVariant = () => {
    switch (state) {
      case 'recording': return 'gradient'
      case 'paused': return 'outline'
      case 'idle': return 'gradient'
      default: return 'gradient'
    }
  }


  const handleButtonPress = () => {
    switch (state) {
      case 'idle': startRecording(); break
      case 'recording': stopRecording(); break
      case 'paused': resumeRecording(); break
      default: startRecording()
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{timeString}/{maxTimeString}</Text>
      <GradientProgressBar progress={progress} />
      
      <View style={styles.buttonContainer}>
        <Button
          variant={getButtonVariant()}
          text={getButtonText()}
          onPress={handleButtonPress}
          disabled={isLoading}
          loading={isLoading}
          style={styles.recordButton}
        />
        
        {/* {state === 'recording' && (
          <Button
            variant="outline"
            text="Pause"
            onPress={pauseRecording}
            disabled={isLoading}
            style={styles.pauseButton}
          />
        )} */}
        
        {(state === 'paused' || recordingPath) && (
          <Button
            variant="ghost"
            text="Reset"
            onPress={resetRecording}
            style={styles.resetButton}
          />
        )}
      </View>
    </View>
  )
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.lg,
  },
  timeText: {
    fontSize: typography.subtitle,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  recordButton: {
   // paddingHorizontal: spacing.xl,
    borderRadius: spacing.xxl,
   //width: '100%',
  },
  pauseButton: {
    paddingHorizontal: spacing.lg,
  },
  resetButton: {
    paddingHorizontal: spacing.lg,
  },
})

export default VoiceRecorder