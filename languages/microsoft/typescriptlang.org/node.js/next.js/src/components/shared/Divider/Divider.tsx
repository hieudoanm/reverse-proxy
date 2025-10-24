import { FC } from 'react';

export const Divider: FC<{ className?: string }> = ({ className = '' }) => {
  const baseClasses = 'w-full border-t border-neutral-800';
  return <div className={`${baseClasses} ${className}`} />;
};
