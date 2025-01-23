// import { useState, useEffect } from "react";

// export function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);
//   return debouncedValue;
// }

// export function useMultiDebounce<T>(values: T[], delay: number): T[] {
//   const [debouncedValues, setDebouncedValues] = useState<T[]>(values);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValues(values);
//     }, delay);

//     // Cleanup function to clear the timeout
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [values, delay]); // Effect runs when `values` or `delay` changes

//   return debouncedValues;
// }
