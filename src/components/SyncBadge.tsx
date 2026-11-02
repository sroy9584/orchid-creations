import React from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { SyncMetadata } from '../types/portfolio';

interface SyncBadgeProps {
  metadata?: SyncMetadata;
}

export const SyncBadge: React.FC<SyncBadgeProps> = ({ metadata }) => {
  if (!metadata) return null;

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return isoString;
    }
  };

  const isSuccess = metadata.status === 'success' || metadata.status === 'manual';

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[11px] text-neutral-400 backdrop-blur-md">
      <span className="flex items-center gap-1.5">
        {isSuccess ? (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        ) : (
          <AlertCircle className="w-3 h-3 text-amber-400" />
        )}
        <span className="text-neutral-300 font-medium">
          {metadata.status === 'manual' ? 'Curated Sync' : 'Auto Synced'}
        </span>
      </span>

      <span className="text-white/20">•</span>

      <span>
        Updated: <span className="text-neutral-300">{formatDate(metadata.lastSyncTime)}</span>
      </span>

      <span className="text-white/20">•</span>

      <span>
        <span className="text-[#BF54A3] font-medium">{metadata.videosSynchronized}</span> Videos
      </span>
    </div>
  );
};

