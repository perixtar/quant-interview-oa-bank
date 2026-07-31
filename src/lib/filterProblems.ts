import type {
  Difficulty,
  Firm,
  Problem,
  ProblemFormat,
  RecruitingCycle,
  Role,
  Stage,
  Topic,
} from "../data/problems";

export interface Filters {
  query: string;
  role: Role | "";
  topic: Topic | "";
  stage: Stage | "";
  difficulty: Difficulty | "";
  firm: Firm | "";
  format: ProblemFormat | "";
  cycle: RecruitingCycle | "";
}

export const emptyFilters: Filters = {
  query: "",
  role: "",
  topic: "",
  stage: "",
  difficulty: "",
  firm: "",
  format: "",
  cycle: "",
};

const searchableText = (problem: Problem) =>
  [
    problem.title,
    problem.summary,
    problem.firm,
    problem.format,
    problem.origin,
    ...problem.roles,
    ...problem.topics,
  ]
    .join(" ")
    .toLocaleLowerCase();

export function filterProblems(
  catalogue: readonly Problem[],
  filters: Filters,
): Problem[] {
  const queryTokens = filters.query
    .trim()
    .toLocaleLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return catalogue.filter((problem) => {
    if (
      queryTokens.length > 0 &&
      !queryTokens.every((token) => searchableText(problem).includes(token))
    ) {
      return false;
    }

    return (
      (!filters.role || problem.roles.includes(filters.role)) &&
      (!filters.topic || problem.topics.includes(filters.topic)) &&
      (!filters.stage || problem.stage === filters.stage) &&
      (!filters.difficulty ||
        problem.difficulty === filters.difficulty) &&
      (!filters.firm || problem.firm === filters.firm) &&
      (!filters.format || problem.format === filters.format) &&
      (!filters.cycle || problem.recruitingCycle === filters.cycle)
    );
  });
}

export function countActiveFilters(filters: Filters): number {
  return Object.values(filters).filter((value) => value !== "").length;
}
