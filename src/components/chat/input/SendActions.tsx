import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "../../ui/Button";
import { Image as ImageIcon, Mic } from "lucide-react-native";
import colors from "../../../constants/color";
import spacing from "../../../constants/spacing";

export default function SendActions(props: any) {
    return (
        <View style={styles.container}>
            <Button
                onPress={props.onSend}
                variant="ghost"
                icon={<ImageIcon color={colors.textSecondary} />}
                style={{ marginTop: 0 }}
            />
            <Button
                onPress={() => {}}
                variant="ghost"
                icon={<Mic color={colors.textSecondary} />}
                style={{ marginTop: 0 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        marginLeft: spacing.sm,
    },
});

