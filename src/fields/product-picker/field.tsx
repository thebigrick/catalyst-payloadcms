'use client';

import { FieldLabel, useField } from '@payloadcms/ui';
import { TextFieldClientProps } from 'payload';
import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import './select.scss';

import searchProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/search-product';
import Product from '@thebigrick/catalyst-payloadcms/fields/product-picker/product';

import Option from './option';

export interface Props extends TextFieldClientProps {}

const Field: React.FC<Props> = ({ field, path }) => {
  const { label } = field;

  const { value, setValue } = useField<number>({ path: path || field.name });

  const onClear = useCallback(() => {
    setValue(null);
  }, [setValue]);

  return (
    <div className="field-type slug-field-component product-picker">
      <div className="label-wrapper ">
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>
      {!value && (
        <AsyncSelect
          cacheOptions
          className="products-search"
          components={{ Option }}
          isClearable={true}
          isMulti={false}
          isSearchable={true}
          loadOptions={searchProducts}
          onChange={(option) => {
            setValue(option?.entityId);
          }}
        />
      )}
      {!!value && <Product entityId={value} onClear={onClear} />}
    </div>
  );
};

export default Field;
