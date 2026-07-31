#!/usr/bin/env python3
"""Validate, sort, and refresh freshness markers in the README table."""

import argparse
import json
import re
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
COMPANIES = ROOT / "assets" / "company-domains.json"
TABLE_HEADER = "| Firm | OA / Interview Question | Practice | Last seen |"
TABLE_DIVIDER = "| :-- | :-- | :-: | :-- |"
BOTTOM_ANCHOR = '<a id="bottom"></a>'
FIRE_DAYS = 14
NEW_DAYS = 45
MONTHS = {
    month: index + 1
    for index, month in enumerate(
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    )
}
ROW = re.compile(
    r'^\| <img src="https://www\.google\.com/s2/favicons\?domain=(?P<domain>[^&]+)&sz=16"> '
    r'\*\*(?P<company>[^*]+)\*\* \| \[[^]]+\]\((?P<question>https://www\.fastprep\.io/problems/[^)]+)\) '
    r'\| \[Practice\]\((?P<practice>https://www\.fastprep\.io/problems/[^)]+)\) '
    r'\| (?:(?:🔥|🆕) )?(?P<month>[A-Z][a-z]{2}) (?P<day>\d{2}), (?P<year>\d{4}) \|$'
)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true", help="validate without writing")
    args = parser.parse_args()

    companies = json.loads(COMPANIES.read_text(encoding="utf-8"))
    lines = README.read_text(encoding="utf-8").splitlines()
    try:
        header_index = lines.index(TABLE_HEADER)
        bottom_index = lines.index(BOTTOM_ANCHOR, header_index + 2)
    except ValueError as error:
        sys.exit(f"README table boundary is missing: {error}")
    if lines[header_index + 1] != TABLE_DIVIDER:
        sys.exit("README table divider is missing or malformed")

    parsed = []
    links = set()
    for index in range(header_index + 2, bottom_index):
        match = ROW.match(lines[index])
        if not match:
            sys.exit(f"row {index + 1} is malformed: {lines[index][:140]}")
        company = match["company"]
        if company not in companies:
            sys.exit(f"row {index + 1} uses unapproved firm {company!r}")
        if match["domain"] != companies[company]:
            sys.exit(f"row {index + 1} has the wrong domain for {company}")
        if match["question"] != match["practice"]:
            sys.exit(f"row {index + 1} has mismatched question and practice links")
        if match["question"] in links:
            sys.exit(f"row {index + 1} duplicates {match['question']}")
        links.add(match["question"])
        try:
            seen = date(int(match["year"]), MONTHS[match["month"]], int(match["day"]))
        except (KeyError, ValueError) as error:
            sys.exit(f"row {index + 1} has an invalid date: {error}")
        if seen > date.today():
            sys.exit(f"row {index + 1} has a future date: {seen.isoformat()}")
        age = (date.today() - seen).days
        marker = "🔥 " if age <= FIRE_DAYS else ("🆕 " if age <= NEW_DAYS else "")
        prefix = lines[index].rsplit("| ", 1)[0]
        rendered = f"{prefix}| {marker}{match['month']} {match['day']}, {match['year']} |"
        parsed.append((seen, rendered))

    if not parsed:
        sys.exit("question table has no rows")
    rendered_rows = [row for _, row in sorted(parsed, key=lambda item: item[0], reverse=True)]
    updated = lines[: header_index + 2] + rendered_rows + lines[bottom_index:]
    output = "\n".join(updated) + "\n"
    current = README.read_text(encoding="utf-8")
    if args.check:
        if output != current:
            sys.exit("README table is not sorted or freshness markers are stale; run without --check")
        print(f"validated {len(rendered_rows)} question rows across {len(companies)} firms")
        return
    README.write_text(output, encoding="utf-8")
    print(f"refreshed {len(rendered_rows)} question rows across {len(companies)} firms")


if __name__ == "__main__":
    main()
