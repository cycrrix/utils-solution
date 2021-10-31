import { useState, useEffect, useRef } from 'react';

/**
 * setInterval hooks
 * @param callback 回调函数
 * @param delay 延迟时间
 */
export default function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

/**
 * 防抖debounce hooks
 * @param value 实时变化值
 * @param delay 延迟时间
 * @returns 防抖值
 */
export function useDebounceHook(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    let timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
}