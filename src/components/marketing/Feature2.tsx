"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SimpleParallax from "simple-parallax-js";
import { ImArrowUpRight2 } from "react-icons/im";

const Feature2 = () => {
  return (
    <section className="container mx-auto w-full py-14 px-6 md:px-16 bg-base-100 relative">
      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="max-w-xl">
          <h2
            className="font-semibold mb-3 flex items-center gap-2 tracking-tight text-balance"
            style={{ fontSize: "var(--fs-display-sm)", lineHeight: "var(--lh-display)" }}
          >
            🤖 Your Personal AI Study Buddy
          </h2>
          <p
            className="text-base-content/70 mb-5"
            style={{ fontSize: "var(--fs-body)", lineHeight: "var(--lh-body)" }}
          >
            Lern comes with a built-in AI tutor that understands your notes and helps you learn
            smarter. Ask questions, get explanations, and test your understanding — all within your
            workspace.
          </p>

          <Link
            href="/notes"
            className="flex items-center gap-2 text-base py-2 rounded-xl hover:underline font-medium"
          >
            Try AI Tutor <ImArrowUpRight2 />
          </Link>
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <SimpleParallax>
            <Image
              src="/images/aiteacher.png"
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
