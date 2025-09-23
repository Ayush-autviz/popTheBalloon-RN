// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// type HeaderProps = {
//     text: string;
//     backButton?: boolean;
//     settingButton?: boolean
// }

// const Header: React.FC<HeaderProps> = ({
//     text,
//     backButton=true,
//     settingButton=false
// }) => {
//   return (
//     <View style={styles.container}>
//       <Text>Header</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center'
//     }
// })

// export default Header



import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import spacing from '../constants/spacing'
import colors from '../constants/color'
import typography from '../constants/typography'
import { useNavigation } from '@react-navigation/native'
// import Icon from 'react-native-vector-icons/Ionicons' // Or any icon library you prefer


type HeaderProps = {
  text: string
  backButton?: boolean
  settingButton?: boolean
  onSettingPress?: () => void
  containerStyle?: ViewStyle
  textStyle?: TextStyle
}

const Header: React.FC<HeaderProps> = ({
  text,
  backButton = true,
  settingButton = false,
  onSettingPress,
  containerStyle,
  textStyle,
}) => {

const navigation = useNavigation()
const onBackPress = () => {
  navigation.goBack()
}

  return (
    <View style={[styles.container, containerStyle]}>
      {backButton ? (
        <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Text>s</Text>
          {/* <Icon name="chevron-back" size={24} color={colors.textPrimary} /> */}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <Text style={[styles.title, textStyle]} numberOfLines={1}>
        {text}
      </Text>

      {settingButton ? (
        <TouchableOpacity onPress={onSettingPress} style={styles.iconButton}>
          {/* <Icon name="settings-outline" size={22} color={colors.textPrimary} /> */}
          <Text>csa</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.screenPadding,
    backgroundColor: colors.background, 
  },
  title: {
    fontSize: typography.secondaryTitle,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  iconButton: {
    padding: spacing.xs,
  },
  iconPlaceholder: {
    width: spacing.xxl, // To keep spacing consistent
  },
})

export default Header
