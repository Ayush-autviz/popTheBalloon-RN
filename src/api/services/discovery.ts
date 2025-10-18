import client from '../client'
import type { 
  DiscoverProfilesRequest,
  DiscoverProfilesResponse,
  SwipeActionRequest,
  SwipeActionResponse,
  RewindResponse,
  UserProfileResponse
} from '../types/discovery'

export async function discoverProfiles(params: DiscoverProfilesRequest = {}): Promise<DiscoverProfilesResponse> {
  const { data } = await client.get<DiscoverProfilesResponse>('/dating/discovery/profiles', { params })
  return data
}

export async function ignoreProfile(payload: SwipeActionRequest): Promise<SwipeActionResponse> {
  const { data } = await client.post<SwipeActionResponse>('/dating/discovery/ignore', payload)
  return data
}

export async function popProfile(payload: SwipeActionRequest): Promise<SwipeActionResponse> {
  const { data } = await client.post<SwipeActionResponse>('/dating/discovery/pop', payload)
  return data
}

export async function starProfile(payload: SwipeActionRequest): Promise<SwipeActionResponse> {
  const { data } = await client.post<SwipeActionResponse>('/dating/discovery/star', payload)
  return data
}

export async function rewindLastSwipe(): Promise<RewindResponse> {
  const { data } = await client.post<RewindResponse>('/dating/discovery/rewind')
  return data
}

export async function getUserProfile(userId: string): Promise<UserProfileResponse> {
  const { data } = await client.get<UserProfileResponse>(`/dating/discovery/profile/${userId}`)
  return data
}
