import { EditionType } from '@/lib/data/products';

const editionConfig = {
  founders: {
    label: 'Founders Edition',
    className: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/40',
  },
  nova: {
    label: 'Nova Edition',
    className: 'bg-pink-500/15 text-pink-300 border-pink-500/40',
  },
  'one-time': {
    label: 'One-Time Drop',
    className: 'bg-purple-500/15 text-purple-300 border-purple-500/40',
  },
};

export default function EditionBadge({ edition }: { edition?: EditionType }) {
  if (!edition) return null;
  const config = editionConfig[edition];
  if (!config) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${config.className}`}>
      {edition === 'founders' && '★'}
      {edition === 'nova' && '✦'}
      {edition === 'one-time' && '⚡'}
      {config.label}
    </span>
  );
}
