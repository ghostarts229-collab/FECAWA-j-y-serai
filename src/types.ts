export interface Participant {
  id: string;
  name: string;
  city?: string;
  photoUrl: string;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
  role?: string;
  posterUrl?: string;
}

export type FilterStatus = 'all' | 'approved' | 'pending' | 'rejected';

export interface PosterOptions {
  photoUrl: string;
  name?: string;
  zoom?: number;
  offsetX?: number;
  offsetY?: number;
}
