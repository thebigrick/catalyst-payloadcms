import { tv } from 'tailwind-variants';

const headingSlots = tv({
  slots: {
    base: 'text-5xl font-extrabold dark:text-white',
  },
  variants: {
    level: {
      1: 'text-5xl font-extrabold dark:text-white',
      2: 'text-4xl font-bold dark:text-white',
      3: 'text-3xl font-bold dark:text-white',
      4: 'text-2xl font-bold dark:text-white',
      5: 'text-xl font-bold dark:text-white',
      6: 'text-lg font-bold dark:text-white',
    },
  },
});

export type HeadingSlots = keyof ReturnType<typeof headingSlots>;

export default headingSlots;
