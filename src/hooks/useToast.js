import { useEffect, useRef, useState } from 'react';

const TOAST_DURATION_MS = 3000;

export function useToast() {
  const [message, setMessage] = useState('');
  const timerRef = useRef();

  useEffect(() => () => clearTimeout(timerRef.current), []);

  function notify(message) {
    setMessage(message);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setMessage(''), TOAST_DURATION_MS);
  }

  function dismiss() {
    clearTimeout(timerRef.current);
    setMessage('');
  }

  return { message, notify, dismiss };
}
