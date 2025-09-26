export type NotificationType = 'like' | 'join' | 'message';

export interface ActivityType {
  id: string;
  name: string;
  message: string;
  timeAgo: string;
  avatarUrl: string;
  type: NotificationType;
}

export const RecentActivityData: ActivityType[] = [
  {
    id: "1",
    name: "Emma",
    message: "liked your profile",
    timeAgo: "2 minutes ago",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    type: "like"
  },
  {
    id: "2",
    name: "Alex",
    message: "joined Coffee Lovers lobby",
    timeAgo: "2 minutes ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    type: "join"
  },
  {
    id: "3",
    name: "Jordan",
    message: "sent you a message",
    timeAgo: "2 minutes ago",
    avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    type: "message"
  }
];
