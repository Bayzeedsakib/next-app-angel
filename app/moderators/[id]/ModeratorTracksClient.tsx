'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import TrackList from '@/components/tracks/TrackList';
import AddTrackForm from '@/components/tracks/AddTrackForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Track, CreateTrackData } from '@/types/track';
import { tracksApi } from '@/lib/api/tracks';

interface ModeratorTracksClientProps {
  moderatorId: number;
}

export default function ModeratorTracksClient({ moderatorId }: ModeratorTracksClientProps) {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingTrackId, setDeletingTrackId] = useState<number | null>(null);

  // Fetch tracks on mount - CSR
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const data = await tracksApi.getModeratorTracks(moderatorId);
        setTracks(data);
      } catch (error: any) {
        toast.error('Failed to load tracks');
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, [moderatorId]);

  const handleAddTrack = async (data: CreateTrackData) => {
    try {
      const newTrack = await tracksApi.addTrack(moderatorId, data);
      setTracks([...tracks, newTrack]);
      toast.success('Track added successfully');
    } catch (error: any) {
      toast.error('Failed to add track');
      throw error;
    }
  };

  const handleDeleteTrack = async (trackId: number) => {
    if (!confirm('Are you sure you want to delete this track?')) return;

    setDeletingTrackId(trackId);
    try {
      await tracksApi.deleteTrack(trackId);
      setTracks(tracks.filter((t) => t.id !== trackId));
      toast.success('Track deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete track');
    } finally {
      setDeletingTrackId(null);
    }
  };

  return (
    <>
      {/* Add Track Form */}
      <Card className="mb-8">
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">Add New Track</h2>
        </CardHeader>
        <CardBody>
          <AddTrackForm onSubmit={handleAddTrack} />
        </CardBody>
      </Card>

      {/* Tracks List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-gray-900">
            Tracks ({tracks.length})
          </h2>
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="py-8">
              <LoadingSpinner />
            </div>
          ) : (
            <TrackList
              tracks={tracks}
              onDelete={handleDeleteTrack}
              isDeleting={deletingTrackId}
            />
          )}
        </CardBody>
      </Card>
    </>
  );
}

