import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { cartStateSchema, type CartLine } from "@/domains/cart/contract";
import type { Route } from "./+types/booking-new";

const cartStorageKey = "kimono-one.cart.v0";

function tomorrowDate() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().slice(0, 10);
}

function readFirstCartLine() {
  const raw = window.localStorage.getItem(cartStorageKey);
  if (!raw) {
    return null;
  }

  return cartStateSchema.safeParse(JSON.parse(raw)).data?.lines[0] ?? null;
}

export function meta(_args: Route.MetaArgs) {
  return [{ title: "创建预约草稿 | Kimono One" }];
}

export default function BookingNew() {
  const navigate = useNavigate();
  const [line] = useState<CartLine | null>(() =>
    typeof window === "undefined" ? null : readFirstCartLine(),
  );
  const [error, setError] = useState<string | null>(null);
  const defaultVisitDate = useMemo(() => tomorrowDate(), []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!line) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/booking-drafts", {
      body: JSON.stringify({
        guestContact: {
          email: String(formData.get("guestEmail") ?? ""),
          name: String(formData.get("guestName") ?? ""),
          phone: String(formData.get("guestPhone") ?? ""),
        },
        notes: String(formData.get("notes") ?? ""),
        planId: line.planId,
        storeId: line.storeId,
        visitDate: String(formData.get("visitDate") ?? ""),
      }),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setError(payload?.message ?? "预约草稿创建失败。");
      return;
    }

    const draft = (await response.json()) as { id: string };
    navigate(`/booking/${draft.id}`);
  }

  return (
    <main className="flow-shell">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link to="/plans">套餐</Link>
        <span>/</span>
        <Link to="/cart">购物车</Link>
        <span>/</span>
        <span>预约信息</span>
      </nav>

      <section className="flow-layout">
        <div>
          <p className="eyebrow">Booking draft</p>
          <h1>创建预约草稿</h1>
          <p className="flow-copy">
            这一步只创建草稿，不锁库存、不收款、不登录。
          </p>
        </div>

        {!line ? (
          <div className="empty-state">
            <p>请先选择一个套餐。</p>
            <Link to="/plans">返回套餐列表</Link>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div className="selected-plan">
              <span>已选套餐</span>
              <strong>{line.planName}</strong>
              <span>{line.storeName}</span>
            </div>
            <label>
              到店日期
              <input
                min={defaultVisitDate}
                name="visitDate"
                required
                type="date"
                defaultValue={defaultVisitDate}
              />
            </label>
            <label>
              姓名
              <input name="guestName" required defaultValue="Guest Tester" />
            </label>
            <label>
              邮箱
              <input
                name="guestEmail"
                required
                type="email"
                defaultValue="guest@example.com"
              />
            </label>
            <label>
              电话
              <input name="guestPhone" required defaultValue="08012345678" />
            </label>
            <label>
              备注
              <textarea name="notes" rows={4} placeholder="可选" />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button type="submit">提交预约草稿</button>
          </form>
        )}
      </section>
    </main>
  );
}
