import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { cartStateSchema, type CartState } from "@/domains/cart/contract";
import { upsertCartLine } from "@/domains/cart/service";
import type { PlanDetail } from "@/domains/catalog/contract";
import { readApiJson } from "~/lib/api.server";
import type { Route } from "./+types/plan-detail";

const cartStorageKey = "kimono-one.cart.v0";

function formatJPY(value: number) {
  return `¥${value.toLocaleString("ja-JP")}`;
}

function readCart(): CartState {
  if (typeof window === "undefined") {
    return { lines: [] };
  }

  const raw = window.localStorage.getItem(cartStorageKey);
  if (!raw) {
    return { lines: [] };
  }

  return cartStateSchema.safeParse(JSON.parse(raw)).data ?? { lines: [] };
}

function writeCart(state: CartState) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(state));
}

export function meta({ data }: Route.MetaArgs) {
  return [
    { title: `${data?.plan.name ?? "套餐详情"} | Kimono One` },
    {
      name: "description",
      content: data?.plan.description ?? "Kimono One 套餐详情",
    },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.slug) {
    throw new Response("Plan slug is required.", { status: 400 });
  }

  return {
    plan: await readApiJson<PlanDetail>(`/api/plans/${params.slug}`),
  };
}

export default function PlanDetail({ loaderData }: Route.ComponentProps) {
  const { plan } = loaderData;
  const navigate = useNavigate();
  const [selectedStoreId, setSelectedStoreId] = useState(
    plan.availableStores[0]?.id ?? "",
  );
  const selectedStore = plan.availableStores.find(
    (store) => store.id === selectedStoreId,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedStore) {
      return;
    }

    writeCart(
      upsertCartLine(readCart(), {
        planId: plan.id,
        planName: plan.name,
        planSlug: plan.slug,
        quantity: 1,
        storeId: selectedStore.id,
        storeName: selectedStore.name,
        unitPrice: selectedStore.onlinePrice,
      }),
    );

    navigate("/cart");
  }

  return (
    <main className="detail-shell">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link to="/plans">套餐</Link>
        <span>/</span>
        <span>{plan.name}</span>
      </nav>

      <section className="detail-layout">
        <div className={`detail-art scene-${plan.scene}`}>
          <span>{plan.scene}</span>
        </div>

        <article className="detail-copy">
          <p className="eyebrow">套餐详情</p>
          <h1>{plan.name}</h1>
          <p>{plan.description}</p>
          <dl className="detail-facts">
            <div>
              <dt>基础价格</dt>
              <dd>{formatJPY(plan.price)}</dd>
            </div>
            <div>
              <dt>体验时长</dt>
              <dd>{plan.durationHours} 小时</dd>
            </div>
          </dl>

          <form className="booking-card" onSubmit={handleSubmit}>
            <label>
              选择门店
              <select
                name="storeId"
                value={selectedStoreId}
                onChange={(event) => setSelectedStoreId(event.target.value)}
              >
                {plan.availableStores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name} · {store.city} · {formatJPY(store.onlinePrice)}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={!selectedStore}>
              加入购物车
            </button>
          </form>
        </article>
      </section>
    </main>
  );
}
