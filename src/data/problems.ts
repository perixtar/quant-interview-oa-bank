export const roles = [
  "Quant Trader",
  "Quant Researcher",
  "Quant Developer",
] as const;

export const stages = [
  "Online Assessment",
  "Technical Screen",
  "Onsite",
] as const;

export const difficulties = [
  "Foundation",
  "Intermediate",
  "Advanced",
] as const;

export const formats = [
  "Mental Math",
  "Probability",
  "Coding",
  "Data Analysis",
  "Market Game",
  "Research Case",
  "Systems Design",
] as const;

export const topics = [
  "Algorithms",
  "C++ / Systems",
  "Data Analysis",
  "Game Theory",
  "Machine Learning",
  "Market Making",
  "Mental Math",
  "Numerical Methods",
  "Optimization",
  "Probability",
  "Statistics",
  "Time Series",
] as const;

export const firms = [
  "General / multi-firm",
  "Akuna-style",
  "Citadel Securities-style",
  "HRT-style",
  "IMC-style",
  "Jane Street-style",
  "Optiver-style",
  "Two Sigma-style",
] as const;

export const recruitingCycles = ["2026"] as const;

export type Role = (typeof roles)[number];
export type Stage = (typeof stages)[number];
export type Difficulty = (typeof difficulties)[number];
export type ProblemFormat = (typeof formats)[number];
export type Topic = (typeof topics)[number];
export type Firm = (typeof firms)[number];
export type RecruitingCycle = (typeof recruitingCycles)[number];
export type Origin = "Original archetype" | "Public-skill synthesis";

export interface Problem {
  id: string;
  title: string;
  summary: string;
  roles: readonly Role[];
  topics: readonly Topic[];
  stage: Stage;
  difficulty: Difficulty;
  firm: Firm;
  format: ProblemFormat;
  timeMinutes: number;
  recruitingCycle: RecruitingCycle;
  lastReviewed: `${number}-${number}-${number}`;
  origin: Origin;
  practicePrompt: string;
  signal: string;
  sourceNote: string;
}

const originalNote =
  "Original catalogue archetype. It is not an actual firm question and is not presented as reported, recalled, or proprietary material.";

const synthesisNote =
  "Synthesized from publicly discussed role competencies and standard textbook material; not an actual firm prompt.";

const initialProblems: readonly Omit<
  Problem,
  "recruitingCycle" | "lastReviewed"
>[] = [
  {
    id: "conditional-dice-market",
    title: "Conditional Dice Market",
    summary:
      "Update the fair value of a payoff as partial information about two dice is revealed, then quote a two-sided market.",
    roles: ["Quant Trader"],
    topics: ["Probability", "Market Making"],
    stage: "Technical Screen",
    difficulty: "Foundation",
    firm: "Jane Street-style",
    format: "Market Game",
    timeMinutes: 18,
    origin: "Original archetype",
    practicePrompt:
      "Compute conditional expectations after each reveal, then choose bid/ask widths that reflect remaining uncertainty.",
    signal:
      "Bayesian updating, arithmetic under pressure, and disciplined price formation.",
    sourceNote: originalNote,
  },
  {
    id: "order-book-microprice",
    title: "Order-Book Microprice",
    summary:
      "Estimate a short-horizon fair price from a small limit-order-book snapshot and explain when imbalance is misleading.",
    roles: ["Quant Trader", "Quant Researcher"],
    topics: ["Market Making", "Statistics"],
    stage: "Onsite",
    difficulty: "Intermediate",
    firm: "Citadel Securities-style",
    format: "Data Analysis",
    timeMinutes: 35,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Compare midprice, weighted microprice, and a shrinkage estimate across several synthetic snapshots.",
    signal:
      "Microstructure intuition, robustness, and the ability to separate signal from mechanical correlation.",
    sourceNote: synthesisNote,
  },
  {
    id: "rapid-fraction-ladder",
    title: "Rapid Fraction Ladder",
    summary:
      "Work through chained percentage, fraction, and expected-value calculations without a calculator.",
    roles: ["Quant Trader"],
    topics: ["Mental Math"],
    stage: "Online Assessment",
    difficulty: "Foundation",
    firm: "Optiver-style",
    format: "Mental Math",
    timeMinutes: 12,
    origin: "Original archetype",
    practicePrompt:
      "Answer forty short calculations while tracking accuracy and using approximation only when explicitly allowed.",
    signal: "Numerical fluency, composure, and error control at speed.",
    sourceNote: originalNote,
  },
  {
    id: "adversarial-coin-auction",
    title: "Adversarial Coin Auction",
    summary:
      "Choose a bid for a noisy-value asset when another rational player sees a correlated but different signal.",
    roles: ["Quant Trader", "Quant Researcher"],
    topics: ["Game Theory", "Probability"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "Jane Street-style",
    format: "Market Game",
    timeMinutes: 45,
    origin: "Original archetype",
    practicePrompt:
      "Derive a baseline policy, identify the winner's-curse term, and discuss how repeated play changes the strategy.",
    signal:
      "Strategic reasoning, conditional expectation, and clear assumptions.",
    sourceNote: originalNote,
  },
  {
    id: "inventory-aware-quotes",
    title: "Inventory-Aware Quotes",
    summary:
      "Adjust reservation price and spread as inventory, volatility, and fill probability change.",
    roles: ["Quant Trader", "Quant Researcher"],
    topics: ["Market Making", "Optimization"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "IMC-style",
    format: "Research Case",
    timeMinutes: 50,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Propose a simple quoting rule and reason through its behavior under three synthetic inventory paths.",
    signal:
      "Trade-off awareness, model simplification, and market-making judgment.",
    sourceNote: synthesisNote,
  },
  {
    id: "hidden-regime-returns",
    title: "Hidden-Regime Returns",
    summary:
      "Infer whether a return series has switched volatility regimes and decide how much history to retain.",
    roles: ["Quant Researcher"],
    topics: ["Time Series", "Statistics"],
    stage: "Technical Screen",
    difficulty: "Intermediate",
    firm: "Two Sigma-style",
    format: "Data Analysis",
    timeMinutes: 40,
    origin: "Original archetype",
    practicePrompt:
      "Compare rolling, exponentially weighted, and two-state estimates on a generated return path.",
    signal:
      "Time-series judgment, leakage awareness, and interpretable diagnostics.",
    sourceNote: originalNote,
  },
  {
    id: "cross-validation-under-time",
    title: "Cross-Validation Under Time",
    summary:
      "Design a validation scheme for temporally ordered signals with overlapping labels and changing distributions.",
    roles: ["Quant Researcher"],
    topics: ["Machine Learning", "Time Series"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "Two Sigma-style",
    format: "Research Case",
    timeMinutes: 55,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Specify train/test boundaries, purge rules, metrics, and a process for detecting regime-dependent failure.",
    signal:
      "Experimental design, leakage prevention, and skepticism about backtests.",
    sourceNote: synthesisNote,
  },
  {
    id: "biased-estimator-clinic",
    title: "Biased Estimator Clinic",
    summary:
      "Compare two estimators for a bounded parameter and determine where lower variance outweighs bias.",
    roles: ["Quant Researcher"],
    topics: ["Statistics"],
    stage: "Technical Screen",
    difficulty: "Intermediate",
    firm: "General / multi-firm",
    format: "Probability",
    timeMinutes: 30,
    origin: "Original archetype",
    practicePrompt:
      "Derive bias, variance, and mean-squared error, then explain the result without relying on asymptotics.",
    signal:
      "Statistical fundamentals and the ability to translate derivation into judgment.",
    sourceNote: originalNote,
  },
  {
    id: "rare-event-importance-sampling",
    title: "Rare-Event Importance Sampling",
    summary:
      "Estimate a very small tail probability efficiently and diagnose a proposal distribution with unstable weights.",
    roles: ["Quant Researcher", "Quant Developer"],
    topics: ["Probability", "Numerical Methods"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "HRT-style",
    format: "Research Case",
    timeMinutes: 60,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Construct an importance sampler, justify the likelihood ratio, and propose variance diagnostics.",
    signal:
      "Monte Carlo depth, numerical caution, and estimator diagnostics.",
    sourceNote: synthesisNote,
  },
  {
    id: "regularized-factor-model",
    title: "Regularized Factor Model",
    summary:
      "Fit a noisy cross-sectional factor model when features are correlated and the sample is small.",
    roles: ["Quant Researcher"],
    topics: ["Machine Learning", "Statistics"],
    stage: "Online Assessment",
    difficulty: "Intermediate",
    firm: "Citadel Securities-style",
    format: "Data Analysis",
    timeMinutes: 45,
    origin: "Original archetype",
    practicePrompt:
      "Choose preprocessing, regularization, and evaluation steps for a supplied synthetic panel.",
    signal:
      "Practical modeling, feature discipline, and out-of-sample thinking.",
    sourceNote: originalNote,
  },
  {
    id: "streaming-vwap",
    title: "Streaming VWAP with Corrections",
    summary:
      "Maintain volume-weighted price statistics while trades arrive, cancel, and correct out of order.",
    roles: ["Quant Developer"],
    topics: ["Algorithms", "C++ / Systems"],
    stage: "Online Assessment",
    difficulty: "Intermediate",
    firm: "HRT-style",
    format: "Coding",
    timeMinutes: 50,
    origin: "Original archetype",
    practicePrompt:
      "Design the state representation and implement insert, cancel, correct, and query operations.",
    signal:
      "Data structures, invariants, and careful event semantics.",
    sourceNote: originalNote,
  },
  {
    id: "lock-free-price-cache",
    title: "Read-Heavy Price Cache",
    summary:
      "Design an in-memory price cache with one writer, many readers, and strict latency requirements.",
    roles: ["Quant Developer"],
    topics: ["C++ / Systems"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "HRT-style",
    format: "Systems Design",
    timeMinutes: 55,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Compare snapshot copying, seqlocks, atomics, and mutexes; state the consistency contract for readers.",
    signal:
      "Concurrency reasoning, memory-model literacy, and explicit trade-offs.",
    sourceNote: synthesisNote,
  },
  {
    id: "exchange-sequence-gaps",
    title: "Exchange Sequence Gaps",
    summary:
      "Recover a complete ordered feed from packet batches that may be duplicated, delayed, or missing.",
    roles: ["Quant Developer"],
    topics: ["Algorithms", "C++ / Systems"],
    stage: "Technical Screen",
    difficulty: "Intermediate",
    firm: "IMC-style",
    format: "Coding",
    timeMinutes: 45,
    origin: "Original archetype",
    practicePrompt:
      "Implement buffering and replay rules while bounding memory and detecting unrecoverable gaps.",
    signal:
      "Ordered-stream invariants, edge cases, and production-minded failure handling.",
    sourceNote: originalNote,
  },
  {
    id: "latency-histogram",
    title: "Tail-Latency Histogram",
    summary:
      "Build a bounded-memory structure for approximate latency percentiles over a moving interval.",
    roles: ["Quant Developer", "Quant Researcher"],
    topics: ["Algorithms", "Statistics"],
    stage: "Online Assessment",
    difficulty: "Intermediate",
    firm: "Akuna-style",
    format: "Coding",
    timeMinutes: 50,
    origin: "Original archetype",
    practicePrompt:
      "Choose bucket boundaries and expiration semantics, then implement updates and percentile queries.",
    signal:
      "Approximation trade-offs, streaming algorithms, and testable contracts.",
    sourceNote: originalNote,
  },
  {
    id: "fixed-point-pnl",
    title: "Fixed-Point P&L Ledger",
    summary:
      "Represent prices, fees, and realized P&L without binary floating-point drift across multiple tick sizes.",
    roles: ["Quant Developer"],
    topics: ["C++ / Systems", "Numerical Methods"],
    stage: "Technical Screen",
    difficulty: "Foundation",
    firm: "General / multi-firm",
    format: "Coding",
    timeMinutes: 35,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Define numeric types and rounding rules, then process a short trade ledger exactly.",
    signal:
      "Numeric representation, domain modeling, and boundary-case discipline.",
    sourceNote: synthesisNote,
  },
  {
    id: "matching-engine-priority",
    title: "Price–Time Priority Book",
    summary:
      "Implement a small matching engine with limit orders, cancels, partial fills, and deterministic output.",
    roles: ["Quant Developer", "Quant Trader"],
    topics: ["Algorithms", "Market Making"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "Optiver-style",
    format: "Coding",
    timeMinutes: 75,
    origin: "Original archetype",
    practicePrompt:
      "Define order-book invariants before implementing the event loop and an adversarial test set.",
    signal:
      "Core data structures, exchange mechanics, and specification clarity.",
    sourceNote: originalNote,
  },
  {
    id: "correlated-defaults",
    title: "Correlated Defaults",
    summary:
      "Compute and bound a portfolio loss probability when pairwise default dependence is only partially known.",
    roles: ["Quant Researcher", "Quant Trader"],
    topics: ["Probability", "Statistics"],
    stage: "Online Assessment",
    difficulty: "Advanced",
    firm: "General / multi-firm",
    format: "Probability",
    timeMinutes: 35,
    origin: "Original archetype",
    practicePrompt:
      "Solve independent and common-factor cases, then explain what cannot be identified from correlation alone.",
    signal:
      "Dependence modeling, honest uncertainty, and probabilistic bounds.",
    sourceNote: originalNote,
  },
  {
    id: "optimal-stopping-cards",
    title: "Optimal Stopping with Cards",
    summary:
      "Choose when to stop drawing from a finite deck when each draw changes both expected value and risk.",
    roles: ["Quant Trader", "Quant Researcher"],
    topics: ["Probability", "Optimization"],
    stage: "Technical Screen",
    difficulty: "Intermediate",
    firm: "Jane Street-style",
    format: "Probability",
    timeMinutes: 30,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Work backward on a small state space, then describe how the policy changes with a risk penalty.",
    signal:
      "Dynamic reasoning, state compression, and decision-making under uncertainty.",
    sourceNote: synthesisNote,
  },
  {
    id: "cointegration-or-coincidence",
    title: "Cointegration or Coincidence?",
    summary:
      "Evaluate a visually compelling pairs signal and decide whether its apparent stability survives basic diagnostics.",
    roles: ["Quant Researcher"],
    topics: ["Time Series", "Data Analysis"],
    stage: "Onsite",
    difficulty: "Intermediate",
    firm: "Two Sigma-style",
    format: "Research Case",
    timeMinutes: 50,
    origin: "Original archetype",
    practicePrompt:
      "Inspect a synthetic price pair, propose diagnostics, and identify costs and leakage omitted from the chart.",
    signal:
      "Research skepticism, time-series diagnostics, and backtest hygiene.",
    sourceNote: originalNote,
  },
  {
    id: "volatility-surface-sanity",
    title: "Volatility Surface Sanity Checks",
    summary:
      "Identify monotonicity and convexity violations in a synthetic option-price grid before interpolation.",
    roles: ["Quant Researcher", "Quant Developer"],
    topics: ["Numerical Methods", "Optimization"],
    stage: "Technical Screen",
    difficulty: "Advanced",
    firm: "Citadel Securities-style",
    format: "Data Analysis",
    timeMinutes: 45,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Flag static-arbitrage violations and outline a constrained repair procedure.",
    signal:
      "Numerical finance fundamentals, constraints, and reliable preprocessing.",
    sourceNote: synthesisNote,
  },
  {
    id: "queue-position-value",
    title: "Value of Queue Position",
    summary:
      "Decide whether to join, improve, or cross a spread given uncertain fills and short-horizon adverse selection.",
    roles: ["Quant Trader"],
    topics: ["Market Making", "Probability"],
    stage: "Onsite",
    difficulty: "Intermediate",
    firm: "Optiver-style",
    format: "Market Game",
    timeMinutes: 30,
    origin: "Original archetype",
    practicePrompt:
      "Estimate expected value under several fill and price-move scenarios, then defend a policy.",
    signal:
      "Microstructure intuition, expected value, and fast scenario comparison.",
    sourceNote: originalNote,
  },
  {
    id: "portfolio-with-turnover",
    title: "Portfolio with Turnover Costs",
    summary:
      "Allocate across noisy alpha signals while limiting gross exposure, concentration, and trading cost.",
    roles: ["Quant Researcher"],
    topics: ["Optimization", "Statistics"],
    stage: "Online Assessment",
    difficulty: "Advanced",
    firm: "General / multi-firm",
    format: "Coding",
    timeMinutes: 65,
    origin: "Original archetype",
    practicePrompt:
      "Formulate the objective and constraints, then solve a small convex instance and interpret binding limits.",
    signal:
      "Optimization formulation, implementation, and economic interpretation.",
    sourceNote: originalNote,
  },
  {
    id: "branch-predictor-loop",
    title: "Branch-Predictor Hot Loop",
    summary:
      "Explain and improve a market-data loop whose latency changes sharply with the input distribution.",
    roles: ["Quant Developer"],
    topics: ["C++ / Systems"],
    stage: "Onsite",
    difficulty: "Advanced",
    firm: "HRT-style",
    format: "Systems Design",
    timeMinutes: 45,
    origin: "Public-skill synthesis",
    practicePrompt:
      "Reason from generated benchmark data, propose code changes, and design a measurement plan that avoids false wins.",
    signal:
      "Performance mechanics, benchmarking discipline, and evidence-driven optimization.",
    sourceNote: synthesisNote,
  },
  {
    id: "market-maker-scorecard",
    title: "Market-Maker Scorecard",
    summary:
      "Compare two simulated quoting strategies using P&L, inventory, spread capture, and adverse-selection metrics.",
    roles: ["Quant Trader", "Quant Researcher"],
    topics: ["Market Making", "Data Analysis"],
    stage: "Online Assessment",
    difficulty: "Foundation",
    firm: "Akuna-style",
    format: "Data Analysis",
    timeMinutes: 35,
    origin: "Original archetype",
    practicePrompt:
      "Compute a compact scorecard and recommend which strategy to deploy under two market regimes.",
    signal:
      "Metric selection, trading intuition, and concise communication.",
    sourceNote: originalNote,
  },
];

export const problems: readonly Problem[] = initialProblems.map((problem) => ({
  ...problem,
  recruitingCycle: "2026",
  lastReviewed: "2026-07-30",
}));
