import { useState } from 'react';

export default function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setPersistedValue = (nextValue) => {
    setValue((current) => {
      const resolvedValue = typeof nextValue === 'function' ? nextValue(current) : nextValue;
      localStorage.setItem(key, JSON.stringify(resolvedValue));
      return resolvedValue;
    });
  };

  return [value, setPersistedValue];
}
