/* eslint @typescript-eslint/ban-ts-comment: 0 */

import type { extendTailwindMerge } from 'tailwind-merge';
import { ClassValue, TVVariants } from 'tailwind-variants';
import type { DefaultScreens } from 'tailwind-variants/transformer';

export type TVGeneratedScreens = DefaultScreens;
export type MergeConfig = Parameters<typeof extendTailwindMerge>[0];
export type TVSlots = Record<string, ClassValue> | undefined;
export type LegacyMergeConfig = Extract<MergeConfig, { extend?: unknown }>['extend'];

export interface TWMConfig {
  twMerge?: boolean;

  twMergeConfig?: MergeConfig & LegacyMergeConfig;
}

export type TVConfig<
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  V extends TVVariants | undefined = undefined,
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  EV extends TVVariants | undefined = undefined,
> = {
  responsiveVariants?:
    | boolean
    | TVGeneratedScreens[]
    | Partial<Record<keyof V | keyof EV, boolean | TVGeneratedScreens[]>>;
} & TWMConfig;

export type SlotsToClasses<S extends string> = Partial<Record<S, ClassValue>>;
