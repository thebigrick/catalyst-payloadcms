import { useMemo } from 'react';

import { BoxBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import getBoxStyle from '@thebigrick/catalyst-payloadcms/service/get-box-style';

const useBoxStyle = (box?: BoxBlock) => {
  const serializedBox = JSON.stringify(box);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => getBoxStyle(box), [serializedBox]);
};

export default useBoxStyle;
