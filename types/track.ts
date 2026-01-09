export interface Track {
  id: number;
  title: string;
  artist?: string;
  moderatorId: number;
}

export interface CreateTrackData {
  title: string;
  artist?: string;
}

export interface Playlist {
  id: number;
  name: string;
  tracks?: Track[];
}

export interface CreatePlaylistData {
  name: string;
  trackIds?: number[];
}

