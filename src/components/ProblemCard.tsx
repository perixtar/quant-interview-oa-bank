import type { Problem } from "../data/problems";

const difficultyMarks = {
  Foundation: "●○○",
  Intermediate: "●●○",
  Advanced: "●●●",
} as const;

export function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  return (
    <article className="problem" id={problem.id}>
      <div className="problem__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="problem__main">
        <div className="problem__heading">
          <h2>{problem.title}</h2>
          <span className="origin-badge">{problem.origin}</span>
        </div>
        <p className="problem__summary">{problem.summary}</p>
        <div className="problem__tags" aria-label="Roles and topics">
          {problem.roles.map((role) => (
            <span className="tag tag--role" key={role}>
              {role}
            </span>
          ))}
          {problem.topics.map((topic) => (
            <span className="tag" key={topic}>
              {topic}
            </span>
          ))}
        </div>
        <details className="problem__details">
          <summary>Practice brief and evaluation signal</summary>
          <div>
            <p>
              <strong>Practice:</strong> {problem.practicePrompt}
            </p>
            <p>
              <strong>Evaluates:</strong> {problem.signal}
            </p>
            <p className="problem__source">{problem.sourceNote}</p>
          </div>
        </details>
      </div>
      <dl className="problem__meta">
        <div>
          <dt>Firm context</dt>
          <dd>{problem.firm}</dd>
        </div>
        <div>
          <dt>Stage / format</dt>
          <dd>
            {problem.stage}
            <br />
            {problem.format}
          </dd>
        </div>
        <div>
          <dt>Difficulty / time</dt>
          <dd>
            <span aria-label={problem.difficulty}>
              {difficultyMarks[problem.difficulty]}
            </span>{" "}
            · {problem.timeMinutes} min
          </dd>
        </div>
        <div>
          <dt>Freshness</dt>
          <dd>
            {problem.recruitingCycle} cycle
            <br />
            Reviewed {problem.lastReviewed}
          </dd>
        </div>
      </dl>
    </article>
  );
}
