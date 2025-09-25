import { Check, MapPin } from 'lucide-react-native';
import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import Button from '../ui/Button';

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={require('../../assets/images/people/Sarah.png')}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.infoContainer}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>Sarah, 24</Text>
            <View style={styles.distanceRow}>
              <MapPin size={typography.subtitle} color={'#fff'} />
              <Text style={styles.distance}>2 miles away</Text>
            </View>
          </View>
          <Text style={styles.description}>
            Love hiking, coffee dates, and spontaneous adventures! Looking for someone to explore the city with ❤️
          </Text>
        </View>

        <View style={styles.buttonRow}>
          <Button variant='outline' icon='cross' />
          
          <Button variant='gradient' pop />
          
          <Button variant='outline' icon='star' />
 
          
        </View>


      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: spacing.lg,
    marginBottom: spacing.xlarge,
    borderRadius: spacing.xxl,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    aspectRatio: 0.7,
    justifyContent: 'flex-end',
  },
  infoContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.jumbo,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    color: 'white',
    fontSize: typography.secondaryTitle,
    fontWeight: '700',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distance: {
    color: 'white',
    fontSize: typography.body,
    marginLeft: 4,
  },
  description: {
    color: 'white',
    fontSize: typography.body,
    lineHeight: 18,
  },
  buttonRow: {
    position: 'absolute',
    bottom: -35,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
});
