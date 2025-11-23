'use client';

import Link from 'next/link';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { ImArrowUpRight2 } from 'react-icons/im';
import noteAnimation from '@/../public/note.json';

const Feature1 = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="container mx-auto w-full py-14 px-6 md:px-16 bg-base-100 relative"
    >
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="w-full md:w-1/2 max-w-md">
          <Lottie animationData={noteAnimation} loop={true} />
        </div>

        <div className="max-w-xl">
          <h2
            className="font-semibold mb-3 flex items-center gap-2 tracking-tight text-balance"
            style={{ fontSize: 'var(--fs-display-sm)', lineHeight: 'var(--lh-display)' }}
          >
            ✍️ Smart Notes with AI
          </h2>
          <p
            className="text-base-content/70 mb-5"
            style={{ fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)' }}
          >
            Forget messy notebooks. Lern structures your knowledge as you type. With real-time AI
            assistance, your notes are organized, searchable, and smart.
          </p>

          <Link
            href="/notes"
            className="flex items-center gap-2 text-base py-2 rounded-xl hover:underline font-medium"
          >
            Take a Note with Lern <ImArrowUpRight2 />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Feature1;
