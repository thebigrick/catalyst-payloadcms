import React from 'react';
import { components, OptionProps } from 'react-select';

import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';

const Option: React.FC<OptionProps<CategoryData>> = (props) => {
  const { data: category } = props;

  return (
    <components.Option {...props}>
      <div>
        <strong>{category.name}</strong>
      </div>
      <p>
        ID: {category.entityId} &mdash; Path: {category.path}
      </p>
    </components.Option>
  );
};

export default Option;
