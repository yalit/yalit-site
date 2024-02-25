export interface WindowSize {
  width: number;
  height: number;
}

export function getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
}
