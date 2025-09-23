import { ImageSourcePropType } from "react-native";

export interface Profile {
    id: string;
    name: string;
    age: number;
    image: ImageSourcePropType;
}

const profileCardData: Profile[] = [
    {
        id: '1',
        name: 'Leilani',
        age: 19,
        image: require('../../assets/images/people/person1.png'),
    },
    {
        id: '2',
        name: 'Annabelle',
        age: 20,
        image: require('../../assets/images/people/person2.png'),
    },
    {
        id: '3',
        name: 'Reagan',
        age: 24,
        image: require('../../assets/images/people/person3.png'),
    },
    {
        id: '4',
        name: 'Hadley',
        age: 25,
        image: require('../../assets/images/people/person4.png'),
    },
    {
        id: '5',
        name: 'Kyle',
        age: 24,
        image: require('../../assets/images/people/person5.png'),
    },
    {
        id: '6',
        name: 'Kyle',
        age: 24,
        image: require('../../assets/images/people/person6.png'),
    },
];

export default profileCardData;
