export default function debounce(fn, interval) {
  let timeout = null;

  return (...args) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      fn(...args);
    }, interval);
  };
}
