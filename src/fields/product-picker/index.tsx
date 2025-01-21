'use client';

import './select.scss';

import { FieldLabel, ReactSelect, useField } from '@payloadcms/ui';
import { Option } from '@payloadcms/ui/dist/elements/ReactSelect/types';
import { SelectFieldClientProps } from 'payload';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounceCallback } from 'usehooks-ts';

import MultiValueLabel from '@thebigrick/catalyst-payloadcms/fields/product-picker/multi-value-label';
import ProductOption from '@thebigrick/catalyst-payloadcms/fields/product-picker/option';
import SingleValue from '@thebigrick/catalyst-payloadcms/fields/product-picker/single-value';
import useProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/use-products';

export interface Props extends SelectFieldClientProps {}

// See: https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Text/index.tsx

const ProductPicker: React.FC<Props> = ({ field, path, readOnly }) => {
  const { label, hasMany } = field;

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

  const components = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: Record<string, React.FC<any>> = {
      Option: ProductOption,
    };

    if (hasMany) {
      res.MultiValueLabel = MultiValueLabel;
    } else {
      res.SingleValue = SingleValue;
    }

    return res;
  }, [hasMany]);

  return (
    <div className="field-type select product-picker">
      <div className="label-wrapper">
        {/* @ts-expect-error Missing types here */}
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>
      <ReactSelect
        components={components}
        disabled={!ready && readOnly}
        isClearable={true}
        isLoading={fetching || !ready}
        isMulti={hasMany}
        isSearchable={true}
        isSortable={true}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={options}
        value={options.filter((option) =>
          Array.isArray(value) ? value.includes(option.value) : option.value === value,
        )}
      />
    </div>
  );
};

export default ProductPicker;
