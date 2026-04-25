import { createHttpApp } from "@/api/http/app";
import type { Route } from "./+types/api.$";

const httpApp = createHttpApp();

export async function loader({ request }: Route.LoaderArgs) {
  return httpApp.fetch(request);
}

export async function action({ request }: Route.ActionArgs) {
  return httpApp.fetch(request);
}
