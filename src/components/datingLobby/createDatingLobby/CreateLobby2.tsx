import React, { useMemo, useState } from 'react'
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import typography from '../../../constants/typography'
import spacing from '../../../constants/spacing'
import colors from '../../../constants/color'
import ImagePicker from '../../ui/ImagePicker'

type ThemeItem = { id: string; image: ImageSourcePropType }

const THEMES: ThemeItem[] = [
  { id: '1', image: require('../../../assets/images/datingLobby/picnicDate.png') },
  { id: '2', image: require('../../../assets/images/datingLobby/coffeeDate.png') },
  { id: '3', image: require('../../../assets/images/datingLobby/movieDate.png') },
  { id: '4', image: require('../../../assets/images/datingLobby/gamingDate.png') },
]

export default function CreateLobby2() {
  const data = useMemo(() => THEMES, [])
  const [selectedId, setSelectedId] = useState<string | null>(data[0]?.id ?? null)

  const renderItem = (item: ThemeItem) => {
    const isSelected = item.id === selectedId
    const ImageContent = (
      <Image source={item.image} style={styles.image} resizeMode='cover' />
    )

    if (isSelected) {
      return (
        <LinearGradient
          colors={colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.innerContainer}>{ImageContent}</View>
        </LinearGradient>
      )
    }

    return <View style={styles.imageWrapper}>{ImageContent}</View>
  }

  return (
    <View>
      <Text style={styles.heading}>Theme</Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectedId(item.id)}
            style={[styles.card, (index % 2 === 0) && styles.cardRightSpacing]}
          >
            {renderItem(item)}
          </TouchableOpacity>
        )}
      />

      <Text style={styles.heading}>Upload Image</Text>

      <ImagePicker images={''} maxImages={1} onPress={() => {}} boxStyle={styles.box}/>
    </View>
  )
}

const styles = StyleSheet.create({
    heading: {
        fontWeight: '600',
        fontSize: typography.subtitle
    },
    listContainer: {
        marginTop: spacing.lg,
    },
    card: {
        width: (spacing.screenWidth / 2) - spacing.screenPadding - spacing.sm,
        aspectRatio: 1,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: spacing.md,
    },
    cardRightSpacing: {
        marginRight: spacing.md,
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.surface,
    },
    gradientBorder: {
        borderRadius: 16,
        padding: 2,
    },
    innerContainer: {
        borderRadius: 14,
        overflow: 'hidden',
        backgroundColor: colors.background,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    box: {
      width: (spacing.screenWidth / 2) - spacing.screenPadding - spacing.large,
      aspectRatio: 1,
      flex: 0
    }
})