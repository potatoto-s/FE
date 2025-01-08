import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // 지정된 delay 후 debouncedValue를 업데이트
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 컴포넌트가 언마운트되거나 value/delay가 변경될 때 타이머 정리
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
