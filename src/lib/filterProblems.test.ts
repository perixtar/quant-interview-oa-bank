import { describe, expect, it } from "vitest";
import { problems } from "../data/problems";
import {
  countActiveFilters,
  emptyFilters,
  filterProblems,
  type Filters,
} from "./filterProblems";

describe("filterProblems", () => {
  it("returns the full catalogue when no filters are active", () => {
    expect(filterProblems(problems, emptyFilters)).toHaveLength(problems.length);
  });

  it("combines role, stage, and topic filters", () => {
    const filters: Filters = {
      ...emptyFilters,
      role: "Quant Researcher",
      stage: "Onsite",
      topic: "Time Series",
    };

    const result = filterProblems(problems, filters);

    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every(
        (problem) =>
          problem.roles.includes("Quant Researcher") &&
          problem.stage === "Onsite" &&
          problem.topics.includes("Time Series"),
      ),
    ).toBe(true);
  });

  it("matches every token in free-text search", () => {
    const result = filterProblems(problems, {
      ...emptyFilters,
      query: "streaming corrections",
    });

    expect(result.map((problem) => problem.id)).toEqual([
      "streaming-vwap",
    ]);
  });

  it("counts search and structured filters consistently", () => {
    expect(
      countActiveFilters({
        ...emptyFilters,
        query: "latency",
        role: "Quant Developer",
      }),
    ).toBe(2);
  });

  it("retains recruiting cycle as an archive dimension", () => {
    const result = filterProblems(problems, {
      ...emptyFilters,
      cycle: "2026",
    });

    expect(result).toHaveLength(problems.length);
    expect(result.every((problem) => problem.recruitingCycle === "2026")).toBe(
      true,
    );
  });
});
