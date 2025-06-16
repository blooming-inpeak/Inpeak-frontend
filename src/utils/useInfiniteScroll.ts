import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  containerRef: React.RefObject<HTMLElement | null>;
  shouldFetch: boolean;
  onScrollEnd: () => void;
}

export const useInfiniteScroll = ({ containerRef, shouldFetch, onScrollEnd }: UseInfiniteScrollProps) => {
  const isTriggeredRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el || !shouldFetch || isTriggeredRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;

      if (isNearBottom) {
        isTriggeredRef.current = true;
        onScrollEnd();
      }
    };

    const el = containerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, shouldFetch, onScrollEnd]);

  useEffect(() => {
    if (shouldFetch) {
      isTriggeredRef.current = false;
    }
  }, [shouldFetch]);
};
