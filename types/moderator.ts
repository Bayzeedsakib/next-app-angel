export interface Moderator {
  id: number;
  email: string;
  status: 'active' | 'inactive';
  profile?: Profile;
  tracks?: Track[];
}

export interface Profile {
  id: number;
  displayName?: string;
  bio?: string;
}

export interface CreateModeratorData {
  email: string;
  password: string;
  displayName?: string;
  bio?: string;
}

export interface UpdateModeratorData {
  email?: string;
  displayName?: string;
  bio?: string;
}

export interface Track {
  id: number;
  title: string;
  artist?: string;
  moderatorId: number;
}

