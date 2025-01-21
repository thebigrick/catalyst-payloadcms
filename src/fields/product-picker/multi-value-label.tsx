import React from 'react';
import { components, MultiValueProps } from 'react-select';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const MultiValueLabel: React.FC<MultiValueProps<ProductData>> = (props) => {
  const product = props.data;

  return (
    <components.MultiValueLabel {...props}>
      <div className="product-picker-option">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name || 'Loading'}
          className="product-picker-image"
          src={product.defaultImage.url}
        />

        <div className="product-picker-details">
          <div className="product-picker-name">{product.name}</div>
          <p>
            ID: {product.entityId} &mdash; SKU: {product.sku}{' '}
          </p>
        </div>
      </div>
    </components.MultiValueLabel>
  );
};

export default MultiValueLabel;
