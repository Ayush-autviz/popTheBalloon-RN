import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import colors from "../../../constants/color";
import typography from "../../../constants/typography";

export default function Composer(props: any) {
    return (
        <View style={styles.container}>
            <TextInput
                {...props}
                style={styles.input}
                placeholder="Type a message..."
                placeholderTextColor={colors.textSecondary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        fontSize: typography.subtitle,
        color: colors.textPrimary,
        minHeight: 40,
    },
});

