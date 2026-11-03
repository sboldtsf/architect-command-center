#!/usr/bin/env python3
"""Re-point the Architect Command Center at the installing user's own connectors.

The dashboard calls connector tools by full name: mcp__<server-uuid>__<tool>. The
<server-uuid> is different for every Claude account, so the template ships with the
author's IDs. This script finds the user's UUID for each connector from a list of
their tool names and swaps it in everywhere.

Usage:
  rewrite_ids.py --tools tools.txt --html assets/dashboard.html --out dashboard.out.html [--mcp-out mcp_tools.json]

tools.txt: one full tool name per line (mcp__<uuid>__<tool>), or a JSON list.
Prints a JSON report on stdout.
"""
import argparse, json, re, sys

# connector -> (author uuid in the template, tool names that identify it, required?)
CONNECTORS = {
    "org62":    ("de4a5a83-ad58-4919-9ad7-8d71f35b0672", ["dispatch_readonly"], True),
    "slack":    ("d7f3326f-318e-4f71-a668-caf6a8804ff3", ["slack_search_users", "slack_search_public_and_private"], False),
    "tableau":  ("7000d52a-c498-493c-b039-3887b388ec6b", ["query-datasource", "get-view-data", "search-content"], False),
    "calendar": ("43020d4d-9bed-4fcc-8683-e12b452cd038", ["list_events", "create_event"], False),
    "drive":    ("c665fdc0-dad7-4320-ae15-c0016bbf8b84", ["search_files", "get_file_metadata"], False),
    "gmail":    ("3a223e76-6f88-46aa-83cb-936e00c53f94", ["search_threads"], False),
    "lucid":    ("c9ca0c80-35f1-4e87-805b-6d3e181a0d5c", ["lucid_list_folder_contents"], False),
    "slides":   ("a443376d-0145-4039-ac20-9cb81dc622c7", ["read_presentation", "update_presentation"], False),
}
# Every tool the dashboard calls, by connector. The page builds some names at runtime
# (prefix + short name), so scanning the HTML alone misses them. This list is the source
# of truth for the artifact's tool allowlist; keep it in sync when the dashboard adds a tool.
TOOLS = {
    "org62":    ["dispatch_readonly"],
    "slack":    ["slack_search_users", "slack_search_public_and_private", "slack_search_public", "slack_read_thread",
                 "slack_search_channels", "slack_list_user_channels", "slack_send_message_draft"],
    "tableau":  ["query-datasource", "get-view-data", "get-view-image", "search-content",
                 "list-all-pulse-metric-definitions", "list-pulse-metric-definitions-from-definition-ids"],
    "calendar": ["list_events", "create_event"],
    "drive":    ["create_file", "search_files", "get_file_metadata", "read_file_content", "get_file_permissions"],
    "gmail":    ["search_threads"],
    "lucid":    ["lucid_list_folder_contents", "search", "fetch", "lucid_get_document_metadata"],
    "slides":   ["read_presentation", "update_presentation"],
}
NAME = re.compile(r"mcp__([0-9a-fA-F-]{36})__([A-Za-z0-9_\-]+)")

def load_tools(path):
    raw = open(path, encoding="utf-8").read()
    return NAME.findall(raw)  # works for plain lines or JSON

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tools", required=True)
    ap.add_argument("--html", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--mcp-out")
    a = ap.parse_args()

    have = {}  # tool -> set(uuid)
    for uuid, tool in load_tools(a.tools):
        have.setdefault(tool, set()).add(uuid.lower())

    html = open(a.html, encoding="utf-8").read()
    report = {"mapped": {}, "missing": [], "ambiguous": {}}
    mapping = {}
    for key, (old, sigs, _req) in CONNECTORS.items():
        found = set()
        for s in sigs:
            found |= have.get(s, set())
        if len(found) == 1:
            mapping[old] = next(iter(found)); report["mapped"][key] = mapping[old]
        elif len(found) > 1:
            report["ambiguous"][key] = sorted(found)
        else:
            report["missing"].append(key)

    # Swap only inside full tool names / prefixes so unrelated UUIDs are untouched.
    for old, new in mapping.items():
        html = html.replace("mcp__" + old + "__", "mcp__" + new + "__")

    # Tool allowlist for create_artifact: every tool the dashboard calls that this user's connector offers.
    allow, unavailable = [], []
    for key, uuid in ((k, mapping[v[0]]) for k, v in CONNECTORS.items() if v[0] in mapping):
        for t in TOOLS[key]:
            (allow if uuid in have.get(t, set()) else unavailable).append("mcp__%s__%s" % (uuid, t))
    report["mcp_tools"] = sorted(allow)
    report["tools_not_offered_by_your_connector"] = sorted(unavailable)
    open(a.out, "w", encoding="utf-8").write(html)
    if a.mcp_out:
        json.dump(sorted(allow), open(a.mcp_out, "w"), indent=1)
    json.dump(report, sys.stdout, indent=1)

if __name__ == "__main__":
    main()
