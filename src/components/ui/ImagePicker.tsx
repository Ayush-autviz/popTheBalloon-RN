import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ImageStyle, ViewStyle, ImageSourcePropType } from 'react-native';
// import { Image as ImageIcon } from 'lucide-react-native';
// import { Asset } from 'react-native-image-picker';
import spacing from '../../constants/spacing';
import colors from '../../constants/color';

type ImagePickerBoxesProps = {
    //   images: Asset[];
    images: any
    onPress: (index: number) => void;
    maxImages?: number;
    boxStyle?: ViewStyle;
    imageStyle?: ImageStyle;
};

const ImagePicker: React.FC<ImagePickerBoxesProps> = ({
    images,
    onPress,
    maxImages = 3,
    boxStyle,
    imageStyle,
}) => {
    const imageSlots = Array.from({ length: maxImages }).map((_, index) => images[index] || null);

    return (
        <View style={styles.container}>
            {imageSlots.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => onPress(index)}
                    style={[styles.box, boxStyle]}
                    activeOpacity={0.8}
                >
                    {item ? (
                        <Image source={{ uri: item.uri }} style={[styles.image, imageStyle]} />
                    ) : (
                        <Image source={require('../../assets/icons/landscape.png')} resizeMode='contain' style={{ width: spacing.large, }} />
                    )}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: spacing.lg,
        gap: '2%'
    },
    box: {
        flex: 1,
        height: 120, // Fixed height for consistent sizing
        borderRadius: spacing.lg,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        overflow: 'hidden', // Ensure images don't overflow the rounded corners
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: spacing.lg,
        resizeMode: 'cover', // Ensure images cover the container properly
    },
});

export default ImagePicker;
