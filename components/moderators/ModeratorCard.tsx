'use client';

import Link from 'next/link';
import Card, { CardBody } from '@/components/ui/Card';
import { Moderator } from '@/types/moderator';

interface ModeratorCardProps {
  moderator: Moderator;
  onDelete?: (id: number) => void;
  onStatusToggle?: (id: number, status: 'active' | 'inactive') => void;
}

export default function ModeratorCard({ moderator, onDelete, onStatusToggle }: ModeratorCardProps) {
  return (
    <Card className="hover:shadow-lg transition">
      <CardBody>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {moderator.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {moderator.profile?.displayName || 'Unnamed'}
              </h3>
              <p className="text-sm text-gray-500">{moderator.email}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              moderator.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {moderator.status}
          </span>
        </div>

        {moderator.profile?.bio && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{moderator.profile.bio}</p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <Link
            href={`/moderators/${moderator.id}`}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View Details →
          </Link>
          {(onDelete || onStatusToggle) && (
            <div className="flex space-x-2">
              {onStatusToggle && (
                <button
                  onClick={() =>
                    onStatusToggle(
                      moderator.id,
                      moderator.status === 'active' ? 'inactive' : 'active'
                    )
                  }
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Toggle Status
                </button>
              )}
              {onDelete && (
                <button
                  onClick={() => onDelete(moderator.id)}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

