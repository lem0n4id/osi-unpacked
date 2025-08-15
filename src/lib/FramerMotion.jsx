export const scene = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1], // A nice ease-out curve
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.45, 0, 0.55, 1], // A nice ease-in curve
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};
