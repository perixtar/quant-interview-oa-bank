# Contributing

Thanks for helping keep the Quant OA & Interview tracker accurate. This repository is a public-safe index of problems that are already published in FastPrep's production question bank; it is not a place to author or infer new questions.

## Firm and coverage requests

Use the [firm request form](https://github.com/perixtar/quant-interview-oa-bank/issues/new?template=company-request.yml) to request:

- A quantitative trading or investment firm that is not tracked yet.
- More OA or interview coverage for a firm already on the list.

Include the company name and any public FastPrep problem links you already know. You may add source context such as role, location, recruiting season, and a short source-safe summary, but never paste a proprietary question statement. A request helps maintainers prioritize verified FastPrep coverage; it does not make an unverified question eligible for the tracker.

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
