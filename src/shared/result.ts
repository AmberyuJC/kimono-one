export type Result<TValue, TError extends { code: string; message: string }> =
  | { ok: true; value: TValue }
  | { ok: false; error: TError };

export function ok<TValue>(value: TValue): Result<TValue, never> {
  return { ok: true, value };
}

export function err<TError extends { code: string; message: string }>(
  error: TError,
): Result<never, TError> {
  return { ok: false, error };
}
