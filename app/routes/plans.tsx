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

const sceneGuides: Record<string, { inclusions: string[]; summary: string }> = {
  "first-time": {
    inclusions: ["基础着付", "轻量配饰", "浅草或京都门店"],
    summary: "第一次穿和服也能快速完成选择，节奏轻松，适合半日街区漫步。",
  },
  seasonal: {
    inclusions: ["季节色系建议", "拍照友好搭配", "4小时外出"],
    summary: "围绕樱花季和纪念照片做层级更高的色彩搭配，适合明确拍照需求。",
  },
  value: {
    inclusions: ["学生凭证优惠", "基础着付", "4小时外出"],
    summary: "价格更克制，保留完整和服体验，适合预算敏感或多人同行。",
  },
  yukata: {
    inclusions: ["浴衣着付", "半日轻体验", "快速出发"],
    summary: "更轻便的夏季方案，适合午后短行程和第一次尝试浴衣的客人。",
  },
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
            从价格、时长、场景和包含内容快速比较套餐，确认后进入详情、购物车和预约草稿。
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
                <div className="plan-card-heading">
                  <p className="plan-scene">
                    {sceneLabels[plan.scene] ?? plan.scene}
                  </p>
                  <h2>{plan.name}</h2>
                </div>
                <p className="plan-summary">
                  {sceneGuides[plan.scene]?.summary ??
                    "适合当天和服体验的固定套餐。"}
                </p>
                <dl className="plan-facts">
                  <div>
                    <dt>线上价</dt>
                    <dd>{formatJPY(plan.price)}</dd>
                  </div>
                  <div>
                    <dt>时长</dt>
                    <dd>{plan.durationHours} 小时</dd>
                  </div>
                  <div>
                    <dt>推荐场景</dt>
                    <dd>{sceneLabels[plan.scene] ?? plan.scene}</dd>
                  </div>
                </dl>
                <div className="plan-inclusions">
                  <p>包含</p>
                  <ul>
                    {(
                      sceneGuides[plan.scene]?.inclusions ?? ["固定套餐内容"]
                    ).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <span className="plan-card-action">查看详情</span>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
