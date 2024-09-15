import { motion } from 'framer-motion';

const LazySection5 = ({ visible, sectionId, title, content }) => {
  return (
    <section
      className="min-h-[50vh] px-4 sm:px-6 md:px-16 py-20 bg-white"
      data-section={sectionId}
    >
      <motion.div
        className="flex flex-col lg:mt-[10vh] mt-0 mx-auto max-w-10/12"
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.5,
            },
          },
        }}
      >
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold text-left mb-10 lg:mb-20"
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg md:text-xl text-left leading-relaxed tracking-normal"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {content}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default LazySection5;
