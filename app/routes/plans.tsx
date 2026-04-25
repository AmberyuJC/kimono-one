import { Form, Link } from "react-router";
import type { PlanCard } from "@/domains/catalog/contract";
import { readApiJson } from "~/lib/api.server";
import type { Route } from "./+types/plans";

const sceneLabels: Record<string, string> = {
  "first-time": "初体验",
  seasonal: "季节限定",
  value: "高性价比",
  yukata: "浴衣",
};

function formatJPY(value: number) {
  return `¥${value.toLocaleString("ja-JP")}`;
}

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "和服套餐 | Kimono One" },
    {
      name: "description",
      content: "浏览 Kimono One V0 的固定 fixture 套餐，并创建游客预约草稿。",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const plans = await readApiJson<PlanCard[]>(
    `/api/plans${query ? `?${query}` : ""}`,
  );

  return {
    filters: {
      scene: url.searchParams.get("scene") ?? "",
    },
    plans,
  };
}

export default function Plans({ loaderData }: Route.ComponentProps) {
  const { filters, plans } = loaderData;

  return (
    <main className="shop-shell">
      <header className="shop-hero">
        <nav className="top-nav" aria-label="主导航">
          <Link to="/plans">套餐</Link>
          <Link to="/cart">购物车</Link>
          <Link to="/harness">Harness</Link>
        </nav>
        <div className="shop-hero-copy">
          <p className="eyebrow">Kimono One V0</p>
          <h1>选择当天要体验的和服套餐</h1>
          <p>
            固定 seed
            数据驱动的最小业务闭环：套餐浏览、详情确认、购物车和预约草稿。
          </p>
        </div>
      </header>

      <section className="catalog-toolbar" aria-label="套餐筛选">
        <Form method="get" className="filter-form">
          <label>
            场景
            <select name="scene" defaultValue={filters.scene}>
              <option value="">全部</option>
              {Object.entries(sceneLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">筛选</button>
        </Form>
        <p>{plans.length} 个套餐可预约</p>
      </section>

      <section className="plan-grid" aria-label="套餐列表">
        {plans.map((plan) => (
          <article className="plan-card" key={plan.id}>
            <Link to={`/plans/${plan.slug}`} className="plan-card-link">
              <div className={`plan-art scene-${plan.scene}`}>
                <span>{sceneLabels[plan.scene] ?? plan.scene}</span>
              </div>
              <div className="plan-card-body">
                <p className="plan-scene">
                  {sceneLabels[plan.scene] ?? plan.scene}
                </p>
                <h2>{plan.name}</h2>
                <dl className="plan-facts">
                  <div>
                    <dt>线上价</dt>
                    <dd>{formatJPY(plan.price)}</dd>
                  </div>
                  <div>
                    <dt>时长</dt>
                    <dd>{plan.durationHours} 小时</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
