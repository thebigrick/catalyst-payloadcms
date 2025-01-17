import React from 'react';
import { components, OptionProps } from 'react-select';

import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const Option: React.FC<OptionProps<ProductData>> = (props) => {
  const { data: product } = props;

  return (
    <components.Option {...props}>
      <div className="product-option">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={product.name || 'Loading'}
          className="product-image"
          src={product.defaultImage.url}
        />

        <div className="product-details">
          <p className="product-name">{product.name}</p>
          <p className="product-data">
            ID: {product.entityId} &mdash; SKU: {product.sku}{' '}
          </p>
        </div>
      </div>
    </components.Option>
  );
};

export default Option;
