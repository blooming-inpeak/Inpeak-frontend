import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  containerRef: React.RefObject<HTMLElement | null>;
  hasNext: boolean;
  fetchNext: (nextPage: number) => void;
}

export const useInfiniteScroll = ({ containerRef, hasNext, fetchNext }: UseInfiniteScrollProps) => {
  const isFetchingRef = useRef(false);
  const lastRequestedPageRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || isFetchingRef.current || !hasNext) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

      if (isNearBottom) {
        const nextPage = lastRequestedPageRef.current + 1;
        lastRequestedPageRef.current = nextPage;
        isFetchingRef.current = true;

        fetchNext(nextPage); // 부모에서 정의한 fetch 함수 호출
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, hasNext, fetchNext]);

  const reset = () => {
    isFetchingRef.current = false;
    lastRequestedPageRef.current = 0;
  };

  const complete = () => {
    isFetchingRef.current = false;
  };

  return { reset, complete };
};
