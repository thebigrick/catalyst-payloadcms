import { tv } from 'tailwind-variants';

const imageSlots = tv({
  slots: {
    base: 'w-full',
  },
});

export type ImageSlots = keyof ReturnType<typeof imageSlots>;

export default imageSlots;
