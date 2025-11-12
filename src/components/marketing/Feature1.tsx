"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Link from "next/link";
import { ImArrowUpRight2 } from "react-icons/im";
import { useRef } from "react";

const Feature1 = () => {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="container mx-auto w-full py-16 px-6 md:px-20 bg-base-100 relative"
    >
      <motion.div
        className="flex flex-col md:flex-row items-center justify-between gap-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="w-full md:w-1/2 max-w-md">
          <Lottie animationData={require("@/../public/note.json")} loop={true} />
        </div>

        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-2">
            ✍️ Smart Notes with AI
          </h2>
          <p className="text-lg text-base-content/70 mb-6">
            Forget messy notebooks. Lern structures your knowledge as you type. With real-time AI
            assistance, your notes are organized, searchable, and smart.
          </p>

          <Link
            href="/notes"
            className="flex items-center gap-2 text-lg py-2 rounded-xl hover:underline"
          >
            Take a Note with Lern <ImArrowUpRight2 />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Feature1;
