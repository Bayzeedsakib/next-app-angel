'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import ModeratorCard from '@/components/moderators/ModeratorCard';
import { Moderator } from '@/types/moderator';
import { moderatorsApi } from '@/lib/api/moderators';

interface ModeratorsClientProps {
  initialModerators: Moderator[];
}

export default function ModeratorsClient({ initialModerators }: ModeratorsClientProps) {
  const [moderators, setModerators] = useState<Moderator[]>(initialModerators);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this moderator?')) return;

    try {
      await moderatorsApi.deleteModerator(id);
      setModerators(moderators.filter((m) => m.id !== id));
      toast.success('Moderator deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete moderator');
    }
  };

  const handleStatusToggle = async (id: number, status: 'active' | 'inactive') => {
    try {
      await moderatorsApi.updateModeratorStatus(id, status);
      setModerators(
        moderators.map((m) => (m.id === id ? { ...m, status } : m))
      );
      toast.success(`Moderator status updated to ${status}`);
    } catch (error: any) {
      toast.error('Failed to update status');
    }
  };

  if (moderators.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No moderators</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by creating a new moderator.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moderators.map((moderator) => (
        <ModeratorCard
          key={moderator.id}
          moderator={moderator}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
        />
      ))}
    </div>
  );
}

