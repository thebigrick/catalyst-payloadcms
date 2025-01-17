import React, { useEffect, useState } from 'react';

import getProduct from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/get-product';
import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

export interface Props {
  entityId: number;
  onClear: () => void;
}

const Product: React.FC<Props> = ({ entityId, onClear }) => {
  const [product, setProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    getProduct(entityId)
      .then((p: ProductData) => {
        setProduct(p);
      })
      .catch((error: unknown) => {
        console.error(error);
        setProduct(null);
      });
  }, [entityId]);

  if (!product) {
    return <div className="product-preview">Loading...</div>;
  }

  return (
    <div className="product-preview">
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
      <div>
        <button className="product-action btn" onClick={onClear}>
          <svg className="icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              className="stroke"
              d="M9.68531 4.62938H5.2634C4.92833 4.62938 4.60698 4.76248 4.37004 4.99942C4.13311 5.23635 4 5.5577 4 5.89278V14.7366C4 15.0717 4.13311 15.393 4.37004 15.63C4.60698 15.8669 4.92833 16 5.2634 16H14.1072C14.4423 16 14.7636 15.8669 15.0006 15.63C15.2375 15.393 15.3706 15.0717 15.3706 14.7366V10.3147M13.7124 4.39249C13.9637 4.14118 14.3046 4 14.66 4C15.0154 4 15.3562 4.14118 15.6075 4.39249C15.8588 4.6438 16 4.98464 16 5.34004C16 5.69544 15.8588 6.03629 15.6075 6.28759L9.91399 11.9817C9.76399 12.1316 9.57868 12.2413 9.37515 12.3008L7.56027 12.8314C7.50591 12.8472 7.44829 12.8482 7.39344 12.8341C7.33859 12.8201 7.28853 12.7915 7.24849 12.7515C7.20845 12.7115 7.17991 12.6614 7.16586 12.6066C7.15181 12.5517 7.15276 12.4941 7.16861 12.4397L7.69924 10.6249C7.75896 10.4215 7.86888 10.2364 8.01888 10.0866L13.7124 4.39249Z"
              strokeLinecap="square"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Product;
