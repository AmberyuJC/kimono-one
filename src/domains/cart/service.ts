import type { CartLine, CartState } from "./contract";

export function createEmptyCart(): CartState {
  return { lines: [] };
}

export function upsertCartLine(
  state: CartState,
  nextLine: CartLine,
): CartState {
  const lines = [...state.lines];
  const index = lines.findIndex(
    (line) =>
      line.planId === nextLine.planId && line.storeId === nextLine.storeId,
  );

  if (index === -1) {
    lines.push(nextLine);
  } else {
    lines[index] = nextLine;
  }

  return { lines };
}

export function removeCartLine(
  state: CartState,
  planId: string,
  storeId: string,
): CartState {
  return {
    lines: state.lines.filter(
      (line) => !(line.planId === planId && line.storeId === storeId),
    ),
  };
}
