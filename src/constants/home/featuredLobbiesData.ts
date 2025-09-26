export interface FeaturedLobbieType {
    id: string;
    title: string;
    description: string;
    image: string;
    membersCount: number;
    members: string[];
  }
  
  export const FeaturedLobbiesData: FeaturedLobbieType[] = [
    {
      id: '1',
      title: "Coffee Lovers Unite",
      description: "Join fellow coffee enthusiasts for weekend cafe hopping",
      image: "https://img.freepik.com/free-photo/female-hands-hold-cup-coffee-wooden-background-flat-lay_169016-27416.jpg",
      membersCount: 12,
      members: [
        'https://randomuser.me/api/portraits/women/31.jpg',
        'https://picsum.photos/200'
      ]
    },
    {
      id: '2',
      title: "Bookworms Club",
      description: "Weekly book discussions and cozy reading meetups",
      image: "https://example.com/images/book_club.jpg",
      membersCount: 8,
      members: [
        'https://randomuser.me/api/portraits/men/33.jpg',
        'https://randomuser.me/api/portraits/women/31.jpg'
      ]
    },
    {
      id: '3',
      title: "Sunday Runners",
      description: "Morning jogs and running challenges around the city",
      image: "https://example.com/images/running_group.jpg",
      membersCount: 20,
      members: [
        "https://example.com/avatars/user7.jpg",
        "https://example.com/avatars/user8.jpg",
        "https://example.com/avatars/user9.jpg"
      ]
    }
  ];
  