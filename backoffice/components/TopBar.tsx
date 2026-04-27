import { ReactNode } from 'react';

interface Props {
  title: string;
  actions?: ReactNode;
}

export default function TopBar({ title, actions }: Props) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gold-border/30 bg-bg-section sticky top-0 z-10">
      <h1 className="font-display text-xl font-bold text-text-primary">{title}</h1>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}
