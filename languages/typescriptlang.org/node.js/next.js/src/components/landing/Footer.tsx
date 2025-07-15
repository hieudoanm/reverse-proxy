import { APP_NAME } from '@reverse-proxy/constants/app';
import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="container mx-auto px-6 py-6 text-center text-sm text-neutral-500">
      © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
    </footer>
  );
};
