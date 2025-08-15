import { gsap } from 'gsap';

/**
 * Creates a GSAP timeline with default settings.
 * @param {object} opts - GSAP timeline options.
 * @returns {gsap.core.Timeline}
 */
export const makeTl = (opts = {}) => {
  return gsap.timeline({
    defaults: { duration: 0.6, ease: 'power2.out' },
    ...opts,
  });
};
