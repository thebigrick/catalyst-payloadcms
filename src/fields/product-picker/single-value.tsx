import React from 'react';
import { components, SingleValueProps } from 'react-select';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const SingleValue: React.FC<SingleValueProps<ProductData>> = (props) => {
  const { data, hasValue, children, selectProps } = props;
  const { inputValue } = selectProps;

  const product = hasValue ? data : null;
  const hasInputValue = Boolean(inputValue && inputValue.length > 0);

  if (hasInputValue) {
    return null;
  }

  return (
    <components.SingleValue {...props}>
      <div className="product-picker-option">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product?.name || 'Loading'}
          className="product-picker-image"
          src={product?.defaultImage.url}
        />

        <div className="product-picker-details">
          <div className="product-picker-name">{children}</div>
          <p>
            ID: {product?.entityId} &mdash; SKU: {product?.sku}{' '}
          </p>
        </div>
      </div>
    </components.SingleValue>
  );
};

export default SingleValue;
