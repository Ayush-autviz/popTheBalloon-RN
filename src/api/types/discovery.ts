// Discovery API Types

export type DiscoverProfilesRequest = {
  page?: number;
  limit?: number;
  ageMin?: number;
  ageMax?: number;
  maxDistance?: number;
  gender?: string;
};

export type ProfilePhoto = {
  photoId: string;
  fileName: string;
  s3Key: string;
  signedUrl: string | null;
  isPrimary: boolean;
  order: number;
};

export type Profile = {
  _id: string;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  bio: string;
  profilePhotos: ProfilePhoto[];
  location?: {
    city: string;
    state: string;
    country: string;
  };
  distance?: number;
};

export type DiscoverProfilesResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    profiles: Profile[];
    hasMore: boolean;
    totalCount: number;
  };
};

export type SwipeActionRequest = {
  profileId: string;
};

export type SwipeActionResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    action: string;
    message: string;
    isMatch?: boolean;
    matchId?: string;
    dailyUsage: {
      swipesUsed: number;
      popsUsed: number;
      superLikesUsed: number;
      rewindsUsed: number;
    };
    limits: {
      maxSwipes: number;
      maxPops: number;
      maxSuperLikes: number;
      maxRewinds: number;
    };
  };
};

export type RewindResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    success: boolean;
    message: string;
    profile?: Profile;
  };
};

export type UserProfileResponse = {
  msg: string;
  auth: { success: boolean };
  data: {
    profile: Profile;
  };
};
