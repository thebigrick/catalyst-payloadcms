import { useCallback, useEffect, useRef, useState } from 'react';

import getProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/get-products';
import searchProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/search-products';
import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const useProducts = (currentValue: string | string[]) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const oldValue = useRef<number[]>([]);

  useEffect(() => {
    const entityIds = Array.isArray(currentValue)
      ? currentValue.map(Number)
      : [Number(currentValue)];

    // Avoid reloading the products if the entityIds are the same but in a different order
    if (JSON.stringify([...entityIds].sort()) === JSON.stringify([...oldValue.current].sort())) {
      setProducts((prev) => {
        return [...prev].sort(
          (a, b) => entityIds.indexOf(a.entityId) - entityIds.indexOf(b.entityId),
        );
      });

      return;
    }

    oldValue.current = entityIds;

    if (currentValue) {
      setReady(false);
      getProducts(entityIds)
        .then((response) => {
          setProducts(response);
        })
        .catch((e: unknown) => {
          setError(e);
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, [currentValue]);

  const fetch = useCallback((search: string) => {
    if (!search) {
      return;
    }

    setFetching(true);
    searchProducts(search)
      .then((response) => {
        // Avoid duplicates
        setProducts((prev) => {
          return [...prev, ...response].filter(
            (product, index, self) =>
              index === self.findIndex((p) => p.entityId === product.entityId),
          );
        });
      })
      .catch((e: unknown) => {
        setError(e);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  return {
    fetch,
    fetching,
    error,
    ready,
    products,
  };
};

export default useProducts;
