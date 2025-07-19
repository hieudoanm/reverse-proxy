import { Glass } from '@reverse-proxy/components/shared/Glass';
import Link from 'next/link';
import { FC } from 'react';

type CallToActionProps = { title: string; subtitle: string; action: string };

export const CallToAction: FC<CallToActionProps> = ({ title = '', subtitle = '', action = '' }) => {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-20">
      <h2 className="mb-4 text-center text-2xl font-semibold md:text-3xl">{title}</h2>
      <p className="mb-6 text-center text-neutral-300">{subtitle}</p>
      <div className="flex w-full items-center justify-center">
        <Link href="/api">
          <Glass.Button>{action}</Glass.Button>
        </Link>
      </div>
    </section>
  );
};
