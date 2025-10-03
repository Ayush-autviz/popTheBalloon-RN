import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import colors from "../../../constants/color";
import spacing from "../../../constants/spacing";
import typography from "../../../constants/typography";

export default function MessageBubble(props: any) {
    const isMe = props.currentMessage.user._id === 1;

    return (
        <View
            style={{
                alignItems: isMe ? "flex-end" : "flex-start",
                marginVertical: 6,
                maxWidth: "100%",
            }}
        >
            <View
                style={{
                    flexDirection: isMe ? "row-reverse" : "row",
                    alignItems: "flex-start",
                    gap: 6,
                }}
            >
                <Image
                    source={props.currentMessage.user.avatar}
                    style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                    }}
                />

                {isMe ? (
                    <LinearGradient
                        colors={colors.gradientPrimary}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.bubble, styles.meBubble]}
                    >
                        <Text style={[styles.messageText, styles.meMessageText]}>
                            {props.currentMessage.text}
                        </Text>
                    </LinearGradient>
                ) : (
                    <View style={[styles.bubble, styles.otherBubble]}>
                        <Text style={[styles.messageText, styles.otherMessageText]}>
                            {props.currentMessage.text}
                        </Text>
                    </View>
                )}
            </View>

            <Text style={[styles.timeText, isMe ? styles.timeRight : styles.timeLeft]}>
                {props.currentMessage.createdAt.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: {
        borderRadius: spacing.sm,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        maxWidth: "75%",
    },
    meBubble: {},
    otherBubble: {
        backgroundColor: colors.backgroundSecondary,
    },
    messageText: {},
    meMessageText: {
        color: "#fff",
        fontSize: typography.body,
        lineHeight: 20,
    },
    otherMessageText: {
        color: colors.textPrimary,
        fontSize: typography.body,
        lineHeight: 20,
    },
    timeText: {
        fontSize: typography.xsmall,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    timeLeft: {
        textAlign: "left",
        marginLeft: spacing.large,
    },
    timeRight: {
        textAlign: "right",
        marginRight: spacing.large,
    },
});

