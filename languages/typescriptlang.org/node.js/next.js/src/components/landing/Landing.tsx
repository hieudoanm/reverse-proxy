import { CallToAction } from '@reverse-proxy/components/landing/CallToAction';
import { Features } from '@reverse-proxy/components/landing/Features';
import { Footer } from '@reverse-proxy/components/landing/Footer';
import { Hero } from '@reverse-proxy/components/landing/Hero';
import { Navbar } from '@reverse-proxy/components/landing/Navbar';
import { Divider } from '@reverse-proxy/components/shared/Divider';
import { Linear } from '@reverse-proxy/components/shared/Linear';
import { FC } from 'react';

const content = {
  landing: {
    hero: {
      headline: 'Simplify API Access with Our Reverse Proxy',
      tagline: 'Securely route and manage external API calls through a single, unified gateway.',
      action: 'Start Proxying',
    },
    features: [
      {
        title: 'Secure API Routing',
        description: 'Hide sensitive API keys and manage requests with confidence.',
      },
      {
        title: 'Flexible Proxying',
        description: 'Support GET, POST, and other methods with full header and body forwarding.',
      },
      {
        title: 'Developer Friendly',
        description: 'Clear documentation and quick setup to get your proxy up and running fast.',
      },
    ],
    callToAction: {
      title: 'Ready to Proxy?',
      subtitle: 'Start routing your external requests securely and easily.',
      action: 'View Docs',
    },
  },
};

export const Landing: FC = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100">
      <Linear.Background />
      <div className="relative z-10">
        <Navbar />
        <Divider />
        <Hero
          headline={content.landing.hero.headline}
          tagline={content.landing.hero.tagline}
          action={content.landing.hero.action}
        />
        <Divider />
        <Features features={content.landing.features} />
        <Divider />
        <CallToAction
          title={content.landing.callToAction.title}
          subtitle={content.landing.callToAction.subtitle}
          action={content.landing.callToAction.action}
        />
        <Divider />
        <Footer />
      </div>
    </div>
  );
};
