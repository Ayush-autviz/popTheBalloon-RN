import { ImageSourcePropType } from "react-native"

type Message = {
    id: string
    text: string
    time: string
    sender: 'me' | 'other'
    avatar: ImageSourcePropType
  }  

export const messages: Message[] = [
  {
    id: '1',
    text: 'Hey, how are you?',
    time: '10:20 PM',
    sender: 'other',
    avatar: require('../../assets/images/people/person1.png')
  },
  {
    id: '2',
    text: 'I’m good, what about you?',
    time: '10:21 PM',
    sender: 'me',
    avatar: require('../../assets/images/people/person6.png')
  },
  {
    id: '3',
    text: 'All good here, thanks!',
    time: '10:22 PM',
    sender: 'other',
    avatar: require('../../assets/images/people/person1.png')
  },
]
