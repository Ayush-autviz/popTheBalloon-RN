import React from "react";
import { InputToolbar } from "react-native-gifted-chat";
import colors from "../../../constants/color";
import spacing from "../../../constants/spacing";

export default function InputToolbarCustom(props: any) {
    return (
        <InputToolbar
            {...props}
            containerStyle={{
                backgroundColor: colors.backgroundTertiary,
                borderRadius: spacing.lg,
                marginHorizontal: spacing.xs,
                marginVertical: spacing.sm,
                paddingHorizontal: spacing.md,
                borderTopWidth: 0,
            }}
            primaryStyle={{ alignItems: "center" }}
        />
    );
}

