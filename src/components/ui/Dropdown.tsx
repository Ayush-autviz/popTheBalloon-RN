import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import LinearGradient from 'react-native-linear-gradient'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'
import TextGradient from './TextGradient'

type DropdownItem = {
  label: string
  value: string | number
}

type GradientDropdownProps = {
  label: string
  value: string | number | null
  onChangeValue: (value: string | number | null) => void
  items: DropdownItem[]
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setValue: React.Dispatch<React.SetStateAction<string | number | null>>
  placeholder?: string
  style?: ViewStyle
}

const GradientDropdown: React.FC<GradientDropdownProps> = ({
  label,
  value,
  onChangeValue,
  items,
  open,
  setOpen,
  setValue,
  placeholder,
  style,
}) => {
  return (
    <LinearGradient
      colors={['#B02D9F', '#DE6F41']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder, style]}
    >
      <View style={styles.innerContainer}>

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={onChangeValue}
          placeholder={placeholder ?? `Select ${label.toLowerCase()}`}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.placeholderText}
          listMode="SCROLLVIEW"
          multiple={false}
          // arrowIconStyle={{ tintColor: colors.textPrimary }}
          // tickIconStyle={{ tintColor: colors.primary }}
        />
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 10,
    padding: 1.5,
    marginVertical: spacing.sm,
    zIndex: 1000,
  },
  innerContainer: {
    backgroundColor: colors.background,
    borderRadius: 9,
    paddingVertical: 10
  },
  label: {
    fontSize: typography.body,
    fontWeight: '600',
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
  dropdown: {
    backgroundColor: colors.background,
    borderColor: 'transparent',
    borderRadius: 8,
    minHeight: 40,
  },
  dropdownContainer: {
    borderRadius: 8,
    borderColor: '#B02D9F',
    marginTop: spacing.xs,
  },
  dropdownText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
})

export default GradientDropdown
