import { describe, expect, it } from "vitest";
import {
  difficulties,
  firms,
  formats,
  problems,
  roles,
  stages,
  topics,
} from "./problems";

describe("problem catalogue", () => {
  it("has unique IDs and complete metadata", () => {
    expect(new Set(problems.map((problem) => problem.id)).size).toBe(
      problems.length,
    );

    for (const problem of problems) {
      expect(problem.roles.length).toBeGreaterThan(0);
      expect(problem.topics.length).toBeGreaterThan(0);
      expect(problem.timeMinutes).toBeGreaterThan(0);
      expect(problem.recruitingCycle).toBe("2026");
      expect(problem.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(stages).toContain(problem.stage);
      expect(difficulties).toContain(problem.difficulty);
      expect(firms).toContain(problem.firm);
      expect(formats).toContain(problem.format);
      expect(problem.sourceNote.toLocaleLowerCase()).toContain(
        "not an actual firm",
      );
    }
  });

  it("covers every filter dimension with at least one problem", () => {
    for (const role of roles) {
      expect(problems.some((problem) => problem.roles.includes(role))).toBe(true);
    }
    for (const topic of topics) {
      expect(problems.some((problem) => problem.topics.includes(topic))).toBe(
        true,
      );
    }
  });
});
