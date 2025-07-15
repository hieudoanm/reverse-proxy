import { FC, ReactNode } from 'react';

export const Background: FC = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-0 m-auto flex w-screen items-center justify-center bg-neutral-900">
      <div className="aspect-square w-full max-w-xl bg-[radial-gradient(#510424_0,_transparent_72%)]"></div>
    </div>
  );
};

type LinearTextProps = { children: ReactNode };

export const Text: FC<LinearTextProps> = ({ children = <></> }) => {
  return (
    <span className="bg-gradient-to-r from-red-800 via-purple-800 to-blue-800 bg-clip-text text-transparent">
      {children}
    </span>
  );
};

export const Linear = { Background, Text };
