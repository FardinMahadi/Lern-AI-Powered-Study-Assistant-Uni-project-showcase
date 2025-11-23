'use client';

import Hero from '@/components/marketing/Hero';
import Header from '@/components/marketing/Header';
import Footer from '@/components/marketing/Footer';
import Feature1 from '@/components/marketing/Feature1';
import Feature2 from '@/components/marketing/Feature2';
import CardStack from '@/components/marketing/CardStack';
import DecryptedText from '@/components/shared/decrypted-text';

const page = () => {
  return (
    <>
      <Header />

      <main>
        <section aria-label="Hero">
          <Hero />
        </section>

        <section aria-labelledby="features-heading">
          <h2
            id="features-heading"
            className="text-center font-semibold tracking-tight mt-16"
            style={{ fontSize: 'var(--fs-display-md)', lineHeight: 'var(--lh-display)' }}
          >
            <DecryptedText speed={100} text="Features" animateOn="view" />
          </h2>
          <Feature1 />
          <Feature2 />
        </section>

        <section aria-labelledby="why-lern-heading">
          <h2
            id="why-lern-heading"
            className="text-center font-semibold tracking-tight mt-16"
            style={{ fontSize: 'var(--fs-display-md)', lineHeight: 'var(--lh-display)' }}
          >
            <DecryptedText speed={100} text="Why Use Lern?" animateOn="view" />
          </h2>
          <CardStack />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default page;
