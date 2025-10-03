import React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    GestureResponderEvent,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constants/color';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { Check } from 'lucide-react-native'; 

type GradientCheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (event: GestureResponderEvent) => void;
    disabled?: boolean;
};

const GradientCheckbox: React.FC<GradientCheckboxProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
}) => {
    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={onChange}
                disabled={disabled}
                style={[styles.checkbox, checked && styles.checkedBox]}>
                {checked && <Check size={16} color="#fff" />}
            </TouchableOpacity>

            <Text style={styles.label}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.sm,
    },
    gradientBorder: {
        borderRadius: 6,
        padding: 1.5,
    },
    checkbox: {
        height: spacing.xxl,
        width: spacing.xxl,
        borderRadius: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#F0F2F5',
        borderWidth: 2
    },
    checkedBox: {
        backgroundColor: '#B02D9F',
    },
    label: {
        marginLeft: spacing.sm,
        fontSize: typography.body,
        fontWeight: '400',
        color: colors.textPrimary,
    },
});

export default GradientCheckbox;
