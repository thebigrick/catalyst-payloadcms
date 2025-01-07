import { CSSProperties } from 'react';

/**
 * Parses a CSS style string into a CSSProperties object
 * @param {string | null | undefined} styleString
 * @returns {CSSProperties}
 */
const parseStyle = (styleString: string | null | undefined): CSSProperties => {
  if (!styleString) return {};

  return styleString
    .split(';')
    .map((rule) => rule.trim())
    .filter(Boolean)
    .reduce<CSSProperties>((acc, rule) => {
      const [property, value] = rule.split(':').map((s) => s.trim());

      if (!property || !value) return acc;

      const camelCaseProperty = property.replace(/-([a-z])/g, (_, letter: string) =>
        letter.toUpperCase(),
      );

      // @ts-expect-error - TS doesn't know that camelCaseProperty is a valid CSS property
      acc[camelCaseProperty] = value;

      return acc;
    }, {});
};

export default parseStyle;
