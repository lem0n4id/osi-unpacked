import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(ScrambleTextPlugin);

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
