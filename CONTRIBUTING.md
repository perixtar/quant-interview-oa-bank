# Contributing

Thanks for helping keep the Quant OA & Interview tracker accurate. This repository is a public-safe index of problems that are already published in FastPrep's production question bank; it is not a place to author or infer new questions.

## Good corrections

- A broken FastPrep practice link.
- A title, company, or latest-seen date that no longer matches the public question bank.
- A duplicate or unpublished row that should be removed.
- A published FastPrep problem whose canonical company is already in the tracked-firm allowlist but is missing from the table.

Please link the affected README row and the corresponding public FastPrep problem page.

## What not to submit here

- New, recalled, synthesized, or invented questions.
- Confidential screenshots, private recruiter messages, or account-only assessment pages.
- Answers, solutions, hidden test cases, evaluator material, or proprietary problem statements.
- A claim that a question targeted a quant trader or researcher role unless FastPrep has added explicit, reviewed role metadata for that claim.

New source reports belong in FastPrep's normal reviewed ingestion pipeline. Once a problem is published in the public question bank with canonical metadata, it can become eligible for this list.

## Selection changes

The tracked-firm allowlist lives in `assets/company-domains.json`. A firm should be added only when quantitative/systematic/proprietary trading or investment management is its core business, and the exact canonical FastPrep company value is known. Broad banks, fintech companies, and asset managers are intentionally excluded unless the question bank gains reliable role-level quant metadata.

Run the checks before opening a pull request:

```bash
python3 scripts/refresh-freshness.py --check
```
