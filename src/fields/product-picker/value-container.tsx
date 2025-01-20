import React from 'react';
import { components, OptionProps } from 'react-select';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const ValueContainer: React.FC<OptionProps<ProductData>> = (props) => {
  const { getValue, hasValue, children, selectProps } = props;
  const { inputValue } = selectProps;

  const product = hasValue ? getValue()[0] : null;
  const hasInputValue = Boolean(inputValue && inputValue.length > 0);

  return (
    <components.ValueContainer {...props}>
      {hasValue && (
        <div className="product-picker-option">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={product?.name || 'Loading'}
            className="product-picker-image"
            src={
              hasInputValue
                ? 'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
                : product?.defaultImage.url
            }
          />

          <div className="product-picker-details">
            <div className="product-picker-name">{children}</div>
            {!hasInputValue && (
              <p>
                ID: {product?.entityId} &mdash; SKU: {product?.sku}{' '}
              </p>
            )}
            {hasInputValue && <p>&nbsp;</p>}
          </div>
        </div>
      )}
      {!hasValue && children}
    </components.ValueContainer>
  );
};

export default ValueContainer;
