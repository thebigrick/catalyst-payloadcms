import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import useBoxStyle from '@thebigrick/catalyst-payloadcms/hooks/use-box-style';
import { BoxComponentProps } from '@thebigrick/catalyst-payloadcms/types';

const Box: React.FC<PropsWithChildren<BoxComponentProps>> = ({ block, children, className }) => {
  const boxStyle = useBoxStyle(block.box);

  return (
    <div className={clsx(boxStyle.className, className)} style={boxStyle.styles}>
      {children}
    </div>
  );
};

export default Box;
