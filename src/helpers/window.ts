export interface WindowSize {
  width: number;
  height: number;
}

export const noWindowSize: WindowSize = {
  width: 0,
  height: 0,
};

export function getWindowSize(): WindowSize {
  const { innerWidth, innerHeight } = window;
  return {
    width: innerWidth,
    height: innerHeight,
  };
}
