import { useEffect, useState } from 'react';

import getCategories from '@thebigrick/catalyst-payloadcms/fields/category-picker/_actions/get-categories';
import { CategoryData } from '@thebigrick/catalyst-payloadcms/fields/category-picker/types';

const useCategories = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(undefined);

  useEffect(() => {
    setLoading(true);
    getCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { error, categories, loading };
};

export default useCategories;
