'use client';

import { FieldLabel, useField } from '@payloadcms/ui';
import { SelectFieldClientProps } from 'payload';
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import './select.scss';

import searchProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/search-product';
import Product from '@thebigrick/catalyst-payloadcms/fields/product-picker/product';

import Option from './option';

export interface Props extends SelectFieldClientProps {}

// See: https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Text/index.tsx

const ProductPicker: React.FC<Props> = ({ field, path, readOnly }) => {
  const { label } = field;

  const { value, setValue } = useField<number>({ path });

  const onClear = useCallback(() => {
    setValue(null);
  }, [setValue]);

  return (
    <div className="field-type slug-field-component product-picker">
      <div className="label-wrapper">
        {/* @ts-expect-error Missing types here */}
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>
      {!value && (
        <AsyncSelect
          cacheOptions
          className={`products-search field-${path.replace(/\./g, '__')}`}
          // @ts-expect-error Missing types here
          components={{ Option }}
          disabled={readOnly}
          isClearable={true}
          isMulti={false}
          isSearchable={true}
          loadOptions={searchProducts}
          onChange={(option) => {
            setValue(option?.entityId);
          }}
        />
      )}
      {!!value && <Product entityId={value} onClear={onClear} readOnly={readOnly} />}
    </div>
  );
};

export default ProductPicker;
