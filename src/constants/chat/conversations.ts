import { ImageSourcePropType } from 'react-native'

export type Conversation = {
  id: string
  avatar: ImageSourcePropType
  title: string
  subtitle: string
  time: string
  unreadCount?: number
}

export const conversations: Conversation[] = [
  {
    id: '1',
    avatar: require('../../assets/images/people/person1.png'),
    title: 'Metal Exchange',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
    unreadCount: 2,
  },
  {
    id: '2',
    avatar: require('../../assets/images/people/person2.png'),
    title: 'Design Team (10 Members)',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
    unreadCount: 2,
  },
  {
    id: '3',
    avatar: require('../../assets/images/people/person3.png'),
    title: 'Joseph Ray',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
    unreadCount: 2,
  },
  {
    id: '4',
    avatar: require('../../assets/images/people/person4.png'),
    title: 'Thomas Adison',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
    unreadCount: 2,
  },
  {
    id: '5',
    avatar: require('../../assets/images/people/person5.png'),
    title: 'Jira (25 Members)',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
    unreadCount: 2,
  },
  {
    id: '6',
    avatar: require('../../assets/images/people/person6.png'),
    title: 'Michael Tony',
    subtitle: 'Lorem ipsum dolor sit amet, consec tetur adipiscing elit,',
    time: '10 min',
  },
]
