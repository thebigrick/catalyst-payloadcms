import React, { CSSProperties } from 'react';

import { BoxBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import parseStyle from '@thebigrick/catalyst-payloadcms/service/parse-style';

export interface BoxStyle {
  className?: string;
  styles: React.CSSProperties;
}

const getMeasure = (value: number | null | undefined) => (value ? `${value}px` : undefined);

const getBoxStyle = (box?: BoxBlock): BoxStyle => {
  const { padding, margin } = box ?? {};

  const styles: CSSProperties = {
    paddingLeft: getMeasure(padding?.left),
    paddingRight: getMeasure(padding?.right),
    paddingTop: getMeasure(padding?.top),
    paddingBottom: getMeasure(padding?.bottom),
    marginLeft: getMeasure(margin?.left),
    marginRight: getMeasure(margin?.right),
    marginTop: getMeasure(margin?.top),
    marginBottom: getMeasure(margin?.bottom),
    ...parseStyle(box?.style),
  };

  return {
    className: box?.class || undefined,
    styles,
  };
};

export default getBoxStyle;
