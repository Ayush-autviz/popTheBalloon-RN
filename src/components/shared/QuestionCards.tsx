import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../../constants/color'
import spacing from '../../constants/spacing'
import RadioButton from '../ui/RadioButton'
import typography from '../../constants/typography'
import Button from '../ui/Button'
import { SvgXml } from 'react-native-svg'
import { MicIcon } from '../../constants/svg'

type Question = {
    id: string
    text: string
}

type QuestionCardsProps = {
    questions: Question[]
}

export default function QuestionCards({ questions }: QuestionCardsProps) {
    return (
        <View>
            {questions.map((q) => (
                <LinearGradient
                    key={q.id}
                    colors={colors.gradientPrimary}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientBorder}
                >
                    <View style={styles.innerContainer}>
                        <RadioButton
                            label={q.text}
                            selected={false}
                            onPress={() => {
                                console.log(`Selected question: ${q.id}`)
                            }}
                        />

                        <View style={styles.recordRow}>
                            <Text style={styles.recordText}>Tap to Record</Text>
                            <Button icon={<SvgXml xml={MicIcon} height={typography.subtitle} />} style={styles.micButton} />
                        </View>
                    </View>
                </LinearGradient>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    gradientBorder: {
        marginVertical: spacing.sm,
        borderRadius: 10,
        padding: 1.5,
    },
    innerContainer: {
        borderRadius: 9,
        backgroundColor: colors.backgroundSecondary,
        paddingHorizontal: spacing.md,
        gap: spacing.md,
    },
    recordRow: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: spacing.md,
    },
    recordText: {
        color: colors.textSecondary,
        fontSize: typography.small,
        marginTop: spacing.lg,
    },
    micButton: {
        borderRadius: spacing.jumbo,
        paddingHorizontal: 0,
        paddingVertical: 10,
    },
})
