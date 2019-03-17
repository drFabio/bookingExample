import { useRef, MutableRefObject } from "react";

export function useMutableRef<T>(initial?: T | null) {
  const ret: MutableRefObject<T | undefined | null> = useRef<
    T | undefined | null
  >(initial);
  return ret;
}
