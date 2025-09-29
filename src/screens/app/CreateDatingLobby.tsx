import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../constants/color'
import Header from '../../components/Header'
import spacing from '../../constants/spacing'
import ProgressSteps from '../../components/datingLobby/createDatingLobby/ProgressSteps'
import CreateLobby1 from '../../components/datingLobby/createDatingLobby/CreateLobby1'
import Button from '../../components/ui/Button'
import CreateLobby2 from '../../components/datingLobby/createDatingLobby/CreateLobby2'
import CreateLobby3 from '../../components/datingLobby/createDatingLobby/CreateLobby3'
import CreateLobby4 from '../../components/datingLobby/createDatingLobby/CreateLobby4'
import CreateLobby5 from '../../components/datingLobby/createDatingLobby/CreateLobby5'
import CreateLobby6 from '../../components/datingLobby/createDatingLobby/CreateLobby6'
import CreateLobby7 from '../../components/datingLobby/createDatingLobby/CreateLobby7'

export default function CreateDatingLobby(): React.ReactElement {
  const TOTAL_STEPS = 7
  const [step, setStep] = useState<number>(1)

  const goNext = useCallback(() => {
    setStep(prev => (prev < TOTAL_STEPS ? prev + 1 : prev))
  }, [])

  const goBack = useCallback(() => {
    setStep(prev => (prev > 1 ? prev - 1 : prev))
  }, [])

  const StepContent = useMemo(() => {
    switch (step) {
      case 1:
        return <CreateLobby1 />
      case 2:
        return <CreateLobby2 />
      case 3:
        return <CreateLobby3 />
      case 4:
        return <CreateLobby4 />
      case 5:
        return <CreateLobby5 />
      case 6:
        return <CreateLobby6 />
      case 7:
        return <CreateLobby7 />
      default:
        return <CreateLobby1 />
    }
  }, [step])
  return (
   <SafeAreaView style={styles.main}>
    <Header text='Dating Lobby' />
    <View style={styles.container} >
      {step !== 7 && <ProgressSteps currentStep={step} />}
      {StepContent}
    </View>

      <Button text={step === TOTAL_STEPS ? 'Create Lobby' : 'Continue'} onPress={goNext} style={{marginHorizontal: spacing.screenPadding}} />
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        backgroundColor: colors.background
    },
    container: {
      flex: 1,
      paddingHorizontal: spacing.screenPadding
    }
})