import { useState } from "react";
import { Link } from "react-router";
import { cartStateSchema, type CartState } from "@/domains/cart/contract";
import { createEmptyCart, removeCartLine } from "@/domains/cart/service";
import type { Route } from "./+types/cart";

const cartStorageKey = "kimono-one.cart.v0";

function formatJPY(value: number) {
  return `¥${value.toLocaleString("ja-JP")}`;
}

function readCart(): CartState {
  const raw = window.localStorage.getItem(cartStorageKey);
  if (!raw) {
    return createEmptyCart();
  }

  return cartStateSchema.safeParse(JSON.parse(raw)).data ?? createEmptyCart();
}

function writeCart(state: CartState) {
  window.localStorage.setItem(cartStorageKey, JSON.stringify(state));
}

export function meta(_args: Route.MetaArgs) {
  return [{ title: "购物车 | Kimono One" }];
}

export default function Cart() {
  const [cart, setCart] = useState<CartState>(() =>
    typeof window === "undefined" ? createEmptyCart() : readCart(),
  );

  function removeLine(planId: string, storeId: string) {
    const nextCart = removeCartLine(cart, planId, storeId);
    setCart(nextCart);
    writeCart(nextCart);
  }

  const subtotal = cart.lines.reduce(
    (sum, line) => sum + line.unitPrice * line.quantity,
    0,
  );

  return (
    <main className="flow-shell">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link to="/plans">套餐</Link>
        <span>/</span>
        <span>购物车</span>
      </nav>

      <section className="flow-layout">
        <div>
          <p className="eyebrow">Cart</p>
          <h1>购物车</h1>
          <p className="flow-copy">
            V0 购物车只保存在当前浏览器，用来验证游客预约草稿流程。
          </p>
        </div>

        <div className="cart-panel">
          {cart.lines.length === 0 ? (
            <div className="empty-state">
              <p>还没有选择套餐。</p>
              <Link to="/plans">返回套餐列表</Link>
            </div>
          ) : (
            <>
              <ul className="cart-lines">
                {cart.lines.map((line) => (
                  <li key={`${line.planId}:${line.storeId}`}>
                    <div>
                      <h2>{line.planName}</h2>
                      <p>{line.storeName}</p>
                    </div>
                    <div className="line-actions">
                      <strong>{formatJPY(line.unitPrice)}</strong>
                      <button
                        type="button"
                        onClick={() => removeLine(line.planId, line.storeId)}
                      >
                        移除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-summary">
                <span>小计</span>
                <strong>{formatJPY(subtotal)}</strong>
              </div>
              <Link className="primary-link" to="/booking/new">
                创建预约草稿
              </Link>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
