export interface DeezerTrack {
  id: number;
  title: string;
  link: string;
  duration: number;
  artist: {
    id: number;
    name: string;
    picture_big: string;
  };
  album: {
    id: number;
    title: string;
    cover_big: string;
  };
}

export interface DeezerResponse {
  data: DeezerTrack[];
  total: number;
  next: string;
}