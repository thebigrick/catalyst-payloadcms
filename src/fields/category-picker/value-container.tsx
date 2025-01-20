import React from 'react';
import { components, OptionProps } from 'react-select';

import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';

const ValueContainer: React.FC<OptionProps<CategoryData>> = (props) => {
  const { getValue, hasValue, children, selectProps } = props;
  const { inputValue } = selectProps;
  const hasInputValue = Boolean(inputValue && inputValue.length > 0);

  const value = hasValue ? getValue()[0] : null;

  return (
    <components.ValueContainer {...props}>
      {hasValue && (
        <>
          {children}
          {!hasInputValue && (
            <p>
              ID: {value?.entityId} &mdash; Path: {value?.path}
            </p>
          )}
          {hasInputValue && <p>&nbsp;</p>}
        </>
      )}
      {!hasValue && children}
    </components.ValueContainer>
  );
};

export default ValueContainer;
