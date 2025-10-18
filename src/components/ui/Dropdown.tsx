import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ViewStyle, 
  FlatList
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ChevronDown, ChevronUp, Check } from 'lucide-react-native'
import spacing from '../../constants/spacing'
import typography from '../../constants/typography'
import colors from '../../constants/color'

type DropdownItem = {
  label: string
  value: string | number
}

type GradientDropdownProps = {
  label: string
  value: string | number | null
  onChangeValue: (value: string | number | null) => void
  items: DropdownItem[]
  placeholder?: string
  style?: ViewStyle
}

const GradientDropdown: React.FC<GradientDropdownProps> = ({
  label,
  value,
  onChangeValue,
  items,
  placeholder,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null)

  // Find selected item based on value
  useEffect(() => {
    const item = items.find(item => item.value === value)
    setSelectedItem(item || null)
  }, [value, items])

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelectItem = (item: DropdownItem) => {
    setSelectedItem(item)
    onChangeValue(item.value)
    setIsOpen(false)
  }

  const displayText = selectedItem ? selectedItem.label : (placeholder ?? `Select ${label.toLowerCase()}`)
  const isPlaceholder = !selectedItem

  return (
    <LinearGradient
      colors={['#B02D9F', '#DE6F41']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradientBorder, style]}
    >
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={handleToggleDropdown}
          activeOpacity={0.7}
        >
          <Text style={[styles.dropdownText, isPlaceholder && styles.placeholderText]}>
            {displayText}
          </Text>
          {isOpen ? (
            <ChevronUp size={20} color={colors.textPrimary} />
          ) : (
            <ChevronDown size={20} color={colors.textPrimary} />
          )}
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.expandedContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedItem?.value === item.value && styles.selectedItem
                  ]}
                  onPress={() => handleSelectItem(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.itemContent}>
                    {selectedItem?.value === item.value && (
                      <Check size={16} color={colors.primary} style={styles.checkIcon} />
                    )}
                    <Text style={[
                      styles.dropdownItemText,
                      selectedItem?.value === item.value && styles.selectedItemText
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              bounces={false}
              style={styles.itemsList}
            />
          </View>
        )}
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 10,
    padding: 1.5,
    marginVertical: spacing.sm,
  },
  innerContainer: {
    backgroundColor: colors.background,
    borderRadius: 9,
    marginRight: 4,
    marginBottom: 4,
    overflow: 'hidden',
  },
  dropdown: {
    backgroundColor: colors.background,
    borderColor: 'transparent',
    borderRadius: 8,
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: 10,
  },
  dropdownText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  placeholderText: {
    color: colors.textSecondary,
    fontWeight: '700',
  },
  expandedContainer: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemsList: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedItem: {
    backgroundColor: colors.backgroundPrimary,
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    marginRight: spacing.xs,
  },
  dropdownItemText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  selectedItemText: {
    color: colors.primary,
  },
})

export default GradientDropdown
