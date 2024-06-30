"use client";

import { useEffect, useRef, useState } from "react";
import { initialProducts } from "../page";
import ProductListItem from "./product-list-item";
import { getMoreProducts } from "../actions";

interface initialProps {
  initialProducts: initialProducts;
}

export default function ProductList({ initialProducts }: initialProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const trigger = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);

          setIsLoading(true);

          const moreProducst = await getMoreProducts(page + 1);
          if (moreProducst.length !== 0) {
            setProducts((prev) => [...prev, ...moreProducst]);
            setPage((prev) => prev + 1);
          } else {
            setIsLastPage(true);
          }

          setIsLoading(false);
        }
      }
    );

    if (trigger.current) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="space-y-5">
      {products.map((a, i) => (
        <ProductListItem {...a} key={i} />
      ))}

      {!isLastPage && (
        <span className="text-xs text-neutral-300" ref={trigger}>
          {isLoading ? "Loading..." : "Load More"}
        </span>
      )}
    </div>
  );
}
