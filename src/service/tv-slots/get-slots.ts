/* eslint @typescript-eslint/ban-ts-comment: 0 */

import { ClassValue, TVProps, TVReturnType, TVVariants } from 'tailwind-variants';

import { SlotsToClasses, TVConfig, TVSlots } from './types';

const getSlots = <
  V extends TVVariants<S, B, EV>,
  C extends TVConfig<V, EV>,
  B extends ClassValue = undefined,
  S extends TVSlots = undefined,
  // @ts-expect-error
  E extends TVReturnType = TVReturnType<
    V,
    S,
    B,
    C,
    // @ts-expect-error
    EV extends undefined ? {} : EV,
    // @ts-expect-error
    ES extends undefined ? {} : ES
  >,
  EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'],
  ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined,
>(
  slotsFn: TVReturnType<V, S, B, C, EV, ES, E>,
  // @ts-expect-error - This is fine ;)
  classNames: SlotsToClasses<keyof ReturnType<typeof slotsFn>> | undefined,
  props: TVProps<V, S, C, EV, ES> | Record<string, unknown>,
): ReturnType<TVReturnType<V, S, B, C, EV, ES, E>> => {
  // @ts-expect-error
  const slots = slotsFn(props);

  // @ts-expect-error
  return Object.keys(slots).reduce<ReturnType<TVReturnType<V, S, B, C, EV, ES, E>>>(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    (acc, k: string) => ({
      // @ts-expect-error
      ...acc,
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-assignment
      [k]: () => slots[k]({ ...props, class: classNames?.[k] }),
    }),
    // @ts-expect-error
    {},
  );
};

export default getSlots;
