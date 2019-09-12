import { useRef } from 'react';
import debounce from 'fn/debounce';

export default function useDebounce(func, delay) {
  const ref = useRef(null);

  if (ref.current === null) {
    ref.current = debounce(func, delay);
  }
  return ref.current;
}
