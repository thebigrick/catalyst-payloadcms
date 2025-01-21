'use client';

import { FieldLabel, ReactSelect, useField } from '@payloadcms/ui';
import { Option } from '@payloadcms/ui/dist/elements/ReactSelect/types';
import { SelectFieldClientProps } from 'payload';
import React, { useCallback } from 'react';

import CategoryOption from '@thebigrick/catalyst-payloadcms/fields/category-picker/option';
import SingleValue from '@thebigrick/catalyst-payloadcms/fields/category-picker/single-value';
import useCategories from '@thebigrick/catalyst-payloadcms/fields/category-picker/use-categories';

import './select.scss';

export interface Props extends SelectFieldClientProps {}

// See: https://github.com/payloadcms/payload/blob/main/packages/ui/src/fields/Text/index.tsx

const CategoryPicker: React.FC<Props> = ({ field, path, readOnly }) => {
  const { label } = field;

  const { value, setValue } = useField<string>({ path });
  const { loading, categories } = useCategories();

  const options = categories.filter(Boolean).map<Option>((category) => ({
    ...category,
    label: category.name,
    value: String(category.entityId),
  }));

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
    <div className="field-type select category-picker">
      <div className="label-wrapper">
        {/* @ts-expect-error Missing types here */}
        <FieldLabel field={field} htmlFor={`field-${path}`} label={label} />
      </div>
      <ReactSelect
        components={{ Option: CategoryOption, SingleValue }}
        disabled={readOnly || loading}
        isLoading={loading}
        isSearchable={true}
        onChange={handleChange}
        options={options}
        value={options.find((option) => option.value === value)}
      />
    </div>
  );
};

export default CategoryPicker;
