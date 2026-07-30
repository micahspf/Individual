import { EditionType } from '@/lib/rewards/types';

const editionConfig = {
  founders: {
    label: 'Founders Edition',
    className: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/40 shadow-[0_0_12px_rgba(250,204,21,0.25)]',
  },
  nova: {
    label: 'Nova Edition',
    className: 'bg-pink-500/15 text-pink-300 border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.25)]',
  },
  'one-time': {
    label: 'One-Time Drop',
    className: 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.25)]',
  },
};

export default function EditionBadge({ edition }: { edition?: EditionType }) {
  if (!edition) return null;
  
  const config = editionConfig[edition];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.className}`}
    >
      {edition === 'founders' && '★'}
      {edition === 'nova' && '✦'}
      {edition === 'one-time' && '⚡'}
      {config.label}
    </span>
  );
}
