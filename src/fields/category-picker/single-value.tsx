import React from 'react';
import { components, SingleValueProps } from 'react-select';

import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';

const SingleValue: React.FC<SingleValueProps<CategoryData>> = (props) => {
  const { data, hasValue } = props;

  const value = hasValue ? data : null;

  return (
    <components.SingleValue {...props}>
      <strong>{value?.name}</strong>
      <p>
        ID: {value?.entityId} &mdash; Path: {value?.path}
      </p>
    </components.SingleValue>
  );
};

export default SingleValue;
