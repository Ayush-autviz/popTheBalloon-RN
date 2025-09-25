import React, { useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TextInputProps,
    useWindowDimensions,
    Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import spacing from '../../constants/spacing';
import colors from '../../constants/color';
import typography from '../../constants/typography';



type OtpInputProps = {
    otp: string[];
    setOtp: (otp: string[]) => void;
    length?: number;
    gradientColors?: string[];
};

const OtpInput: React.FC<OtpInputProps> = ({
    otp,
    setOtp,
    length = 6,
    gradientColors = ['#B02D9F', '#DE6F41'],
}) => {
    const inputRef = useRef<TextInput[]>([]);
    const { width: screenWidth } = useWindowDimensions();

    const handleChange = (digit: string, index: number) => {
        if (!/^\d$/.test(digit) && digit !== '') return;
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        if (digit && index < length - 1) {
            inputRef.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        inputRef.current[0]?.focus();
    }, []);

    return (
        <>
            <Text style={styles.text}>Verification Code</Text>

            <View style={styles.container}>
                {Array.from({ length }).map((_, index) => (
                    <LinearGradient
                        key={index}
                        colors={gradientColors}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.gradientBox, { width: screenWidth / 7 }]}
                    >
                        <TextInput
                            ref={(ref) => {
                                inputRef.current[index] = ref!;
                            }}
                            style={styles.input}
                            value={otp[index]}
                            keyboardType="number-pad"
                            maxLength={1}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    </LinearGradient>
                ))}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    text: {
        marginTop: spacing.xxl,
        color: colors.textPrimary,
        fontWeight: '500'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.md,
    },
    gradientBox: {
        padding: 2,
        borderRadius: 10,
    },
    input: {
        backgroundColor: colors.background,
        borderRadius: 8,
        fontSize: typography.title,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: spacing.sm,
        color: colors.textPrimary,
    },
});

export default OtpInput;
