import { Link } from "react-router";
import type { BookingDraft } from "@/domains/booking/contract";
import { readApiJson } from "~/lib/api.server";
import type { Route } from "./+types/booking-detail";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "预约草稿 | Kimono One" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.draftId) {
    throw new Response("Booking draft id is required.", { status: 400 });
  }

  return {
    draft: await readApiJson<BookingDraft>(
      `/api/booking-drafts/${params.draftId}`,
    ),
  };
}

export default function BookingDetail({ loaderData }: Route.ComponentProps) {
  const { draft } = loaderData;

  return (
    <main className="flow-shell">
      <nav className="breadcrumb" aria-label="面包屑">
        <Link to="/plans">套餐</Link>
        <span>/</span>
        <span>预约草稿</span>
      </nav>

      <section className="confirmation-panel">
        <p className="eyebrow">Draft created</p>
        <h1>预约草稿已创建</h1>
        <dl>
          <div>
            <dt>草稿编号</dt>
            <dd>{draft.id}</dd>
          </div>
          <div>
            <dt>套餐</dt>
            <dd>{draft.planName}</dd>
          </div>
          <div>
            <dt>门店</dt>
            <dd>{draft.storeName}</dd>
          </div>
          <div>
            <dt>到店日期</dt>
            <dd>{draft.visitDate}</dd>
          </div>
          <div>
            <dt>联系人</dt>
            <dd>
              {draft.guestContact.name} · {draft.guestContact.email}
            </dd>
          </div>
        </dl>
        <Link className="primary-link" to="/plans">
          继续浏览套餐
        </Link>
      </section>
    </main>
  );
}
