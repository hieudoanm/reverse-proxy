import { Glass } from "@reverse-proxy/components/shared/Glass";
import { Linear } from "@reverse-proxy/components/shared/Linear";
import Link from "next/link";
import { FC } from "react";

type HeroProps = { headline: string; tagline: string; action: string };

export const Hero: FC<HeroProps> = ({
  headline = "",
  tagline = "",
  action = "",
}) => {
  return (
    <header className="flex flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">
        <Linear.Text>{headline}</Linear.Text>
      </h1>
      <p className="mb-8 max-w-xl text-neutral-100">{tagline}</p>
      <Link href="/docs" className="w-full md:w-auto">
        <Glass.Button>{action}</Glass.Button>
      </Link>
    </header>
  );
};
