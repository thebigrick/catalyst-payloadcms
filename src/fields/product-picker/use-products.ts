import { useCallback, useEffect, useState } from 'react';

import getProduct from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/get-product';
import searchProducts from '@thebigrick/catalyst-payloadcms/fields/product-picker/_actions/search-product';
import { ProductData } from '@thebigrick/catalyst-payloadcms/fields/product-picker/types';

const useProducts = (initialEntityId: string) => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [ready, setReady] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (initialEntityId) {
      setReady(false);
      getProduct(Number(initialEntityId))
        .then((response) => {
          setProducts([response]);
        })
        .catch((e: unknown) => {
          setError(e);
        })
        .finally(() => {
          setReady(true);
        });
    }
  }, [initialEntityId]);

  const fetch = useCallback((search: string) => {
    if (!search) {
      setProducts([]);

      return;
    }

    setFetching(true);
    searchProducts(search)
      .then((response) => {
        setProducts(response);
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
