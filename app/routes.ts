import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("api/*", "routes/api.$.tsx"),
  route("harness", "routes/home.tsx"),
  route("plans", "routes/plans.tsx"),
  route("plans/:slug", "routes/plan-detail.tsx"),
  route("cart", "routes/cart.tsx"),
  route("booking/new", "routes/booking-new.tsx"),
  route("booking/:draftId", "routes/booking-detail.tsx"),
] satisfies RouteConfig;
