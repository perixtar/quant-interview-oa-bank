import { useEffect, useMemo, useState } from "react";
import { ProblemCard } from "./components/ProblemCard";
import { SearchOverlay } from "./components/SearchOverlay";
import {
  difficulties,
  firms,
  formats,
  problems,
  recruitingCycles,
  roles,
  stages,
  topics,
} from "./data/problems";
import {
  countActiveFilters,
  emptyFilters,
  filterProblems,
  type Filters,
} from "./lib/filterProblems";

type FilterKey = Exclude<keyof Filters, "query">;

interface SelectFilterProps {
  label: string;
  filterKey: FilterKey;
  options: readonly string[];
  value: string;
  onChange: (key: FilterKey, value: string) => void;
}

function SelectFilter({
  label,
  filterKey,
  options,
  value,
  onChange,
}: SelectFilterProps) {
  return (
    <label className="filter-control">
      <span>{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(filterKey, event.target.value)}
      >
        <option value="">All {label.toLocaleLowerCase()}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function App() {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const filteredProblems = useMemo(
    () => filterProblems(problems, filters),
    [filters],
  );
  const activeFilterCount = countActiveFilters(filters);
  const firmCount = new Set(problems.map((problem) => problem.firm)).size;

  useEffect(() => {
    const handleShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }) as Filters);
  };

  const selectQuickResult = (problem: (typeof problems)[number]) => {
    setFilters({ ...emptyFilters, query: problem.title });
    setIsSearchOpen(false);
    window.requestAnimationFrame(() => {
      document
        .getElementById(problem.id)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <>
      <div className="page-shell" inert={isSearchOpen ? true : undefined}>
        <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Quant Interview and OA Bank home">
          <span>Q</span>
          <strong>Interview &amp; OA Bank</strong>
        </a>
        <button
          className="search-pill"
          type="button"
          aria-label="Search the problem bank"
          aria-haspopup="dialog"
          aria-expanded={isSearchOpen}
          onClick={() => setIsSearchOpen(true)}
        >
          <span aria-hidden="true">⌕</span>
          <span className="search-pill__label">Search the index</span>
          <kbd>⌘ K</kbd>
        </button>
        <a className="policy-link" href="#editorial-policy">
          Source policy
        </a>
        </header>

        <main id="top">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro__copy">
            <p className="edition">
              2026 recruiting cycle · reviewed July 30, 2026
            </p>
            <h1 id="page-title">Quant Interview &amp; OA Bank.</h1>
            <p className="intro__lede">
              A source-safe set of original practice archetypes for quant trader,
              researcher, and developer recruiting. Filter for the desk, stage,
              and skill you need next.
            </p>
          </div>
          <dl className="catalogue-stats" aria-label="Catalogue coverage">
            <div>
              <dt>Problems</dt>
              <dd>{problems.length}</dd>
            </div>
            <div>
              <dt>Firm contexts</dt>
              <dd>{firmCount}</dd>
            </div>
            <div>
              <dt>Target roles</dt>
              <dd>{roles.length}</dd>
            </div>
          </dl>
        </section>

        <section className="filter-workbench" aria-label="Problem filters">
          <div className="filter-workbench__top">
            <label className="query-control">
              <span>Search</span>
              <input
                type="search"
                value={filters.query}
                onChange={(event) =>
                  setFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder="Try “market making”, “latency”, or “time series”"
              />
            </label>
            <button
              className="reset-button"
              type="button"
              disabled={activeFilterCount === 0}
              onClick={() => setFilters(emptyFilters)}
            >
              Clear {activeFilterCount > 0 ? activeFilterCount : ""} filters
            </button>
          </div>
          <div className="filter-grid">
            <SelectFilter
              label="Roles"
              filterKey="role"
              options={roles}
              value={filters.role}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Topics"
              filterKey="topic"
              options={topics}
              value={filters.topic}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Stages"
              filterKey="stage"
              options={stages}
              value={filters.stage}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Difficulties"
              filterKey="difficulty"
              options={difficulties}
              value={filters.difficulty}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Firms"
              filterKey="firm"
              options={firms}
              value={filters.firm}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Formats"
              filterKey="format"
              options={formats}
              value={filters.format}
              onChange={updateFilter}
            />
            <SelectFilter
              label="Cycles"
              filterKey="cycle"
              options={recruitingCycles}
              value={filters.cycle}
              onChange={updateFilter}
            />
          </div>
        </section>

        <section className="catalogue" aria-labelledby="results-heading">
          <div className="catalogue__heading">
            <h2 id="results-heading">Problem catalogue</h2>
            <p aria-live="polite">
              Showing <strong>{filteredProblems.length}</strong> of{" "}
              {problems.length}
            </p>
          </div>
          <div className="catalogue__columns" aria-hidden="true">
            <span>Problem</span>
            <span>Context</span>
          </div>
          {filteredProblems.length === 0 ? (
            <div className="empty-state">
              <span className="empty-state__mark" aria-hidden="true">
                ∅
              </span>
              <h2>No exact match.</h2>
              <p>
                Remove a filter or broaden the search. The catalogue is deliberately
                small in this first edition.
              </p>
              <button type="button" onClick={() => setFilters(emptyFilters)}>
                Reset the index
              </button>
            </div>
          ) : (
            <div className="problem-list">
              {filteredProblems.map((problem, index) => (
                <ProblemCard key={problem.id} problem={problem} index={index} />
              ))}
            </div>
          )}
        </section>

        <aside className="policy" id="editorial-policy">
          <div>
            <h2>Firm-style, never firm-claimed.</h2>
          </div>
          <div>
            <p>
              Firm names are navigational context only: they indicate the broad
              competency mix commonly associated with a role or interview style.
              Every entry is an original archetype or a synthesis of public,
              textbook-level skills.
            </p>
            <p>
              This index does not publish leaked assessments, confidential
              screenshots, private recruiter material, candidate-identifying
              details, or copied proprietary statements. It also does not claim
              that any listed firm has used a given prompt.
            </p>
          </div>
        </aside>
        </main>

        <footer className="site-footer">
          <p>
            QUANT INTERVIEW &amp; OA BANK · 2026 RECRUITING CYCLE · REVIEWED
            2026-07-30 · ORIGINAL PRACTICE ARCHETYPES · REACT + TYPESCRIPT ·
            SOURCE-SAFE BY DESIGN · NO FIRM ENDORSEMENT OR AFFILIATION IMPLIED.
          </p>
        </footer>
      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        problems={problems}
        onClose={() => setIsSearchOpen(false)}
        onSelect={selectQuickResult}
      />
    </>
  );
}
