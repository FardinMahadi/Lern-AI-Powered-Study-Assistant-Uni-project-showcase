"use client";
import { ReactLenis } from "lenis/react";
import { useTransform, motion, useScroll } from "motion/react";
import { useRef } from "react";
import Image from "next/image";
const projects = [
  {
    title: "Smart AI Note-Taking",
    description:
      "Lern structures your knowledge intelligently as you type. Forget messy notebooks—get organized with real-time suggestions, searchable notes, and contextual awareness.",
    src: "/ai-note.jpg",
    color: "#5196fd",
  },
  {
    title: "Built-In AI Tutor",
    description:
      "Turn your notes into quizzes, flashcards, and study prompts. Lern helps you learn, recall, and master information—on demand, like a personal study coach.",
    src: "/ai-tutor.jpg",
    color: "#8f89ff",
  },
  {
    title: "Your Second Brain",
    description:
      "Lern captures, connects, and revives ideas just when you need them. Think faster, remember more, and build your personal knowledge base—effortlessly.",
    src: "/second-brain.png",
    color: "#13006c",
  },
  {
    title: "Learns With You",
    description:
      "The more you use Lern, the smarter it gets. Lern adapts to your learning style, improves suggestions, and personalizes the way it supports you.",
    src: "/ai-learn.jpg",
    color: "#ed649e",
  },
  {
    title: "Privacy-First by Design",
    description:
      "No ads, no tracking, no shady data selling. Lern encrypts your notes and runs AI on-device where possible—so your mind stays your own.",
    src: "/secure.jpg",
    color: "#fd521a",
  },
  {
    title: "Built for Learners",
    description:
      "Lern isn’t just a note app. It’s made for students, self-learners, and curious minds—featuring tools crafted for learning, not for meetings.",
    src: "/learner-focus.jpg",
    color: "#00b894",
  },
];

export default function CardStack() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });
  return (
    <ReactLenis root>
      <main ref={container} className="">
        <section className="text-white w-full">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                url={project?.link}
                src={project?.src}
                title={project?.title}
                color={project?.color}
                description={project?.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
export const Card = ({
  i,
  title,
  description,
  src,
  url,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);
  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0 my-10 "
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className={`flex flex-col relative -top-[25%] h-[450px] w-[90%] md:w-[80%] lg:w-[70%] rounded-md p-5 md:p-10 origin-top`}
      >
        <h2 className="text-xl md:text-2xl text-center font-semibold">
          {title}
        </h2>
        <div
          className={`flex flex-col md:flex-row h-full mt-5 gap-5 md:gap-10`}
        >
          <div className={`w-full md:w-[40%] relative md:top-[10%]`}>
            <p className="text-sm md:text-base">{description}</p>
          </div>

          <div
            className={`relative w-full md:w-[60%] h-[250px] md:h-full rounded-lg overflow-hidden`}
          >
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image fill src={src} alt="image" className="object-cover" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
