import { tv } from 'tailwind-variants';

const columnsSlots = tv({
  slots: {
    base: 'columns-1',
  },
  variants: {
    columnsCount: {
      1: {
        base: 'columns-1',
      },
      2: {
        base: 'columns-2',
      },
      3: {
        base: 'columns-3',
      },
      4: {
        base: 'columns-4',
      },
      5: {
        base: 'columns-5',
      },
      6: {
        base: 'columns-6',
      },
      7: {
        base: 'columns-7',
      },
      8: {
        base: 'columns-8',
      },
      9: {
        base: 'columns-9',
      },
      10: {
        base: 'columns-10',
      },
      11: {
        base: 'columns-11',
      },
      12: {
        base: 'columns-12',
      },
    },
  },
});

export type ColumnsSlots = keyof ReturnType<typeof columnsSlots>;

export default columnsSlots;
