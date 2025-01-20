'use client';

import './select.scss';

import { FieldLabel, ReactSelect, useField } from '@payloadcms/ui';
import { Option } from '@payloadcms/ui/dist/elements/ReactSelect/types';
import { SelectFieldClientProps } from 'payload';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import ProductOption from '@thebigrick/catalyst-payloadcms/fields/product-picker/option';
import useProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/use-products';
import ValueContainer from '@thebigrick/catalyst-payloadcms/fields/product-picker/value-container';

export interface Props extends SelectFieldClientProps {}

// See: https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Text/index.tsx

const ProductPicker: React.FC<Props> = ({ field, path, readOnly }) => {
  const { label, required } = field;

  const { value, setValue } = useField<string>({ path });
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { products, ready, fetch, fetching } = useProducts(value);

  useEffect(() => {
    fetch(searchTerm);
  }, [searchTerm, fetch]);

  const options = useMemo(
    () =>
      products.filter(Boolean).map((p) => ({
        ...p,
        label: p.name,
        value: String(p.entityId),
      })),
    [products],
  );

  const handleInputChange = useDebounceCallback(setSearchTerm, 500);

  const handleChange = useCallback(
    (option: Option | Option[] | null) => {
      if (Array.isArray(option)) {
        setValue(option.map((o) => o.value));
      } else {
        setValue(option?.value ?? null);
      }
    },
    [setValue],
  );

  return (
    <div className="field-type select product-picker">
      <div className="label-wrapper">
        {/* @ts-expect-error Missing types here */}
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>

      <ReactSelect
        components={{ Option: ProductOption, ValueContainer }}
        disabled={!ready && readOnly}
        filterOption={() => true}
        isClearable={true}
        isLoading={fetching || !ready}
        isMulti={false}
        isSearchable={true}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        showError={!value && required}
        value={options.find((option) => option.value === value)}
      />
    </div>
  );
};

export default ProductPicker;
