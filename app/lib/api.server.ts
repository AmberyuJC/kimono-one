import { createHttpApp } from "@/api/http/app";

const httpApp = createHttpApp();

export async function readApiJson<TValue>(path: string, init?: RequestInit) {
  const response = await httpApp.request(path, init);

  if (!response.ok) {
    throw new Response(await response.text(), {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return (await response.json()) as TValue;
}
