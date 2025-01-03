import { useMemo } from 'react';
import { ClassValue, TVProps, TVReturnType, TVVariants } from 'tailwind-variants';

import getSlots from '@thebigrick/catalyst-payloadcms/service/tv-slots/get-slots';
import {
  SlotsToClasses,
  TVConfig,
  TVSlots,
} from '@thebigrick/catalyst-payloadcms/service/tv-slots/types';

export type { SlotsToClasses };

const useTvSlots = <
  V extends TVVariants<S, B, EV>,
  C extends TVConfig<V, EV>,
  B extends ClassValue = undefined,
  S extends TVSlots = undefined,
  // @ts-expect-error - Trust me, this is fine ;)
  E extends TVReturnType = TVReturnType<
    V,
    S,
    B,
    C,
    // @ts-expect-error - Trust me, this is fine ;)
    EV extends undefined ? {} : EV,
    // @ts-expect-error - Trust me, this is fine ;)
    ES extends undefined ? {} : ES
  >,
  EV extends TVVariants<ES, B, E['variants'], ES> = E['variants'],
  ES extends TVSlots = E['slots'] extends TVSlots ? E['slots'] : undefined,
>(
  slotsFn: TVReturnType<V, S, B, C, EV, ES, E>,
  // @ts-expect-error - Trust me, this is fine ;)
  classNames: SlotsToClasses<keyof ReturnType<typeof slotsFn>> | undefined,
  props: TVProps<V, S, C, EV, ES> | Record<string, unknown>,
): ReturnType<TVReturnType<V, S, B, C, EV, ES, E>> => {
  return useMemo(() => getSlots(slotsFn, classNames, props), [slotsFn, classNames, props]);
};

export default useTvSlots;
