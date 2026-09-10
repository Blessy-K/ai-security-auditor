import { useEffect, useState } from "react";

export default function CountUp({ value, duration = 900 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(duration / Math.max(value || 1, 1), 20);

    const timer = setInterval(() => {
      start += 1;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
}