export type LobbyCard = {
    id: string
    host: string
    title: string
    participantsCurrent: number
    participantsMax: number
    entryFee: string
    image: string
}

export const lobbyCardsData: LobbyCard[] = [
    {
        id: '1',
        host: 'Emily',
        title: 'Coffee Chat',
        participantsCurrent: 5,
        participantsMax: 10,
        entryFee: 'Free',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1887&auto=format&fit=crop',
    },
    {
        id: '2',
        host: 'David',
        title: 'Movie Night',
        participantsCurrent: 3,
        participantsMax: 8,
        entryFee: '$5',
        image: 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=2011&auto=format&fit=crop',
    },
    {
        id: '3',
        host: 'Sophia',
        title: 'Game Night',
        participantsCurrent: 2,
        participantsMax: 6,
        entryFee: 'Free',
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    },
]

