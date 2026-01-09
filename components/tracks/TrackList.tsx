'use client';

import { Track } from '@/types/track';
import Button from '@/components/ui/Button';

interface TrackListProps {
  tracks: Track[];
  onDelete: (trackId: number) => void;
  isDeleting?: number | null;
}

export default function TrackList({ tracks, onDelete, isDeleting }: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
          />
        </svg>
        <p>No tracks yet. Add your first track!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{track.title}</h4>
              {track.artist && <p className="text-sm text-gray-500">{track.artist}</p>}
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(track.id)}
            disabled={isDeleting === track.id}
          >
            {isDeleting === track.id ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      ))}
    </div>
  );
}

