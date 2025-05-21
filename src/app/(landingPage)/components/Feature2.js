"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ImArrowUpRight2 } from "react-icons/im";
import SimpleParallax from "simple-parallax-js";

const Feature2 = () => {
  return (
    <section className="container mx-auto w-full py-16 px-6 md:px-20 bg-base-100 relative">
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-2">
            🤖 Your Personal AI Study Buddy
          </h2>
          <p className="text-lg text-base-content/70 mb-6">
            Lern comes with a built-in AI tutor that understands your notes and
            helps you learn smarter. Ask questions, get explanations, and test
            your understanding — all within your workspace.
          </p>

          <Link
            href="/notes"
            className="flex items-center gap-2 text-lg py-2 rounded-xl hover:underline"
          >
            Try AI Tutor <ImArrowUpRight2 />
          </Link>
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <SimpleParallax>
            <Image
              src="/aiteacher.png"
              alt="AI Teacher illustration"
              width={500}
              height={500}
              className="w-full h-auto"
              priority
            />
          </SimpleParallax>
        </div>
      </motion.div>
    </section>
  );
};

export default Feature2;
