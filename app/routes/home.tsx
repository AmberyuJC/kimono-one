import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
  return [
    { title: "Kimono One Harness Lab" },
    {
      name: "description",
      content:
        "Harness-first bootstrap for Kimono One. Repository controls, checks, docs, and test rails land before product surface area.",
    },
  ];
}

export default function Home() {
  const milestones = [
    "Milestone 0: instructions, custom agents, checks, CI, docs, DB skeleton",
    "Milestone 1: fixture-backed data foundation and domain contracts",
    "Milestone 2: catalog, cart, and booking draft vertical slice",
    "Milestone 3: weekly review automation and lightweight trace ledger",
  ];

  const commands = [
    "pnpm lint",
    "pnpm typecheck",
    "pnpm test",
    "pnpm test:e2e",
    "pnpm check:harness",
    "pnpm db:reset",
  ];

  return (
    <main className="home-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Harness-first bootstrap</p>
          <h1>Kimono One</h1>
          <p className="lede">
            This repository starts with controls, not feature sprawl. Agents are
            expected to read the rules, follow the contracts, and prove their
            work.
          </p>
        </div>
        <div className="status-card">
          <p className="status-label">Current status</p>
          <p className="status-value">Milestone 0 in progress</p>
          <p className="status-meta">
            Repo instructions, checks, CI, and database skeleton are now
            first-class artifacts.
          </p>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <h2>Control plane</h2>
          <ul>
            <li>
              Root `AGENTS.md` points agents to the shortest correct path.
            </li>
            <li>
              GitHub instructions and custom agents encode repo-specific
              behavior.
            </li>
            <li>
              Checks and CI reject boundary violations before review time is
              wasted.
            </li>
            <li>Plans are delivery artifacts, not optional notes.</li>
          </ul>
        </article>

        <article className="panel">
          <h2>Milestones</h2>
          <ol>
            {milestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>

        <article className="panel">
          <h2>Validation commands</h2>
          <ul>
            {commands.map((command) => (
              <li key={command}>
                <code>{command}</code>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}
