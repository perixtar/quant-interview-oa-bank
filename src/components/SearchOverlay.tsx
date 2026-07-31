import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import type { Problem } from "../data/problems";

interface SearchOverlayProps {
  isOpen: boolean;
  problems: readonly Problem[];
  onClose: () => void;
  onSelect: (problem: Problem) => void;
}

export function SearchOverlay({
  isOpen,
  problems,
  onClose,
  onSelect,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const queryTokens = query
      .trim()
      .toLocaleLowerCase()
      .split(/\s+/)
      .filter(Boolean);
    if (queryTokens.length === 0) return problems.slice(0, 6);

    return problems
      .filter((problem) => {
        const searchable = [
          problem.title,
          problem.summary,
          problem.firm,
          ...problem.roles,
          ...problem.topics,
        ]
          .join(" ")
          .toLocaleLowerCase();
        return queryTokens.every((token) => searchable.includes(token));
      })
      .slice(0, 8);
  }, [problems, query]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setActiveIndex(0);
    window.requestAnimationFrame(() => inputRef.current?.focus());

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "clip";
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onClose();
      return;
    }
    if (results.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (index) => (index - 1 + results.length) % results.length,
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      onSelect(results[activeIndex]);
    }
  };

  const trapFocus = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(
        'input, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay" role="presentation">
      <button
        className="search-overlay__backdrop"
        type="button"
        tabIndex={-1}
        aria-label="Close search"
        onClick={onClose}
      />
      <section
        ref={panelRef}
        className="search-overlay__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Search the problem catalogue"
        onKeyDown={trapFocus}
      >
        <div className="search-overlay__field">
          <span aria-hidden="true">⌕</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search title, skill, role, or firm style…"
            aria-controls="quick-search-results"
          />
          <kbd>Esc</kbd>
          <button
            className="search-overlay__close"
            type="button"
            aria-label="Close quick search"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div
          className="search-overlay__results"
          id="quick-search-results"
          role="listbox"
          aria-label="Problem matches"
        >
          {results.length === 0 ? (
            <p className="search-overlay__empty">No matching problems.</p>
          ) : (
            results.map((problem, index) => (
              <button
                className="search-result"
                data-active={index === activeIndex}
                key={problem.id}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => onSelect(problem)}
              >
                <span>
                  <strong>{problem.title}</strong>
                  <small>
                    {problem.firm} · {problem.format}
                  </small>
                </span>
                <span aria-hidden="true">↵</span>
              </button>
            ))
          )}
        </div>
        <div className="search-overlay__footer" aria-hidden="true">
          <span>↑ ↓ navigate</span>
          <span>↵ select</span>
          <span>esc close</span>
        </div>
      </section>
    </div>
  );
}
