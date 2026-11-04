---
name: architect-command-center-installer
description: Installs or updates the Architect Command Center dashboard (the live Cowork artifact with Mission Control, Pulse, Activity, Pipeline and more) and, for leaders of architect teams, the Leadership Command Center (team plan, hours, pipe quality, deals to help close, 1:1 briefs), in the user's own Claude, wired to their own connectors (org62, Slack, Tableau, Calendar, Drive, Gmail, Lucid, Slides). Use whenever the user says install, set up, get, update, repair or reinstall the Architect Command Center, the command center dashboard or the Leadership Command Center / leader view, or reports that it says Slack or Tableau is "not connected" even though Claude is connected.
---

# Architect Command Center installer

**Skill version: 1.3** (Nov 4, 2026). Includes the Leadership Command Center. The same number appears in the dashboard footer.

The dashboard is one self-contained HTML page (`assets/dashboard.html`) that calls connector tools by full name, `mcp__<server-uuid>__<tool>`. The server UUID is unique to each Claude account, so the shipped copy has the author's IDs baked in and a copy made from a share link can't reach the viewer's connectors. This skill fixes that: it reads the tool names available in *this* session, swaps in the user's own IDs, and publishes the page as the user's own artifact.

## Steps

0. **Leader or architect?** Run two read-only org62 queries with the `dispatch_readonly` tool (GET `/services/data/v66.0/chatter/users/me` for the user's id, then GET `/services/data/v66.0/query` with `q` = `SELECT COUNT(Id) n FROM User WHERE IsActive = true AND ManagerId = '<id>'`, and `SELECT UserRole.Name FROM User WHERE Id = '<id>'`). The user is a **leader** if they have at least one active direct report or their role name contains `LDR`. Do not read or repeat anything else from the results.
   - Leader: install the **Leadership Command Center** (steps 1 to 3 with the leader files below). Then ask, in one line, whether they also want the Architect Command Center (player-coaches who carry their own deals do); install it too only if they say yes.
   - Architect: install the **Architect Command Center** as below. If they ask for the leadership view anyway, install it too; it opens as a preview of their manager's team.

1. **Inventory the connectors.** List every connector tool you can call in this session (the `mcp__<uuid>__<tool>` names; use ToolSearch if they are deferred, e.g. query `slack`, `tableau`, `calendar`, `drive`, `gmail`, `lucid`, `presentation`, `dispatch`). Write the full names, one per line, to `/tmp/cc/tools.txt`. Names only, never message or file contents.
2. **Rewrite.** Run:
   `python3 <skill_dir>/scripts/rewrite_ids.py --tools /tmp/cc/tools.txt --html <skill_dir>/assets/dashboard.html --out /tmp/cc/dashboard.html --mcp-out /tmp/cc/mcp_tools.json`
   Read the JSON report. `org62` (the `dispatch_readonly` tool) is the core data source: if it is missing, tell the user which connector to turn on (the Salesforce / org62 one in Settings > Connectors) and stop. The report's `tools_not_offered_by_your_connector` lists dashboard tools the user's connector doesn't provide (for example a Tableau Pulse tool); name them in your summary since those features will be limited. Other missing connectors are fine, since that tab simply shows as not connected; name them so the user can connect them and re-run later. If a connector is `ambiguous`, ask which one to use, then add only that one's tool names to the tools file and re-run.
   For the Leadership Command Center, run the same script on the leader page with `--leader`:
   `python3 <skill_dir>/scripts/rewrite_ids.py --leader --tools /tmp/cc/tools.txt --html <skill_dir>/assets/leadership.html --out /tmp/cc/leadership.html --mcp-out /tmp/cc/mcp_leader.json`
   It needs only org62 (required) and Slack (optional, for saving 1:1 briefs as drafts).
3. **Publish.** Call `create_artifact` with id `architect-command-center`, `html_path` = `/tmp/cc/dashboard.html` (copy it into the working outputs folder first if the tool needs a path it can read), a one-line description, and `mcp_tools` = the **complete** contents of `mcp_tools.json`. Do not trim it to tools you probed or called yourself: the page uses write-type tools (Drive `create_file`, Slack `slack_list_user_channels`, Slack drafts, calendar `create_event`) only when the user clicks something, and any tool left off the list fails silently later. If an artifact with that id already exists (check `list_artifacts`), use `update_artifact` instead with an `update_summary`; that is also the update path when the user installs a newer version of this skill.
   For the leader page: id `leadership-command-center`, `html_path` = `/tmp/cc/leadership.html`, `mcp_tools` = the complete contents of `mcp_leader.json`, and the same create-or-update rule.
4. **Verify without reading content.** Run `verify_artifact` only to check that the page loads and to scan the log for JavaScript errors. The debug log also records connector responses (calendar invites, email, Slack), which can contain other people's names and contact details. Look only at error and warning lines, never summarize or quote connector data, and do not repeat any of it to the user. Then tell the user to open the artifact, go to Personalize, click "Find my Slack ID", and run the Connections check. For the leader page, tell them it opens on their whole reporting tree, that the first load takes about 20 seconds while org62 finds everyone who reports into them, and that they can set their team plan in the Plan tile.
5. **Report in two or three sentences**: the version installed (v1.3, shown in the dashboard footer next to "What's new"), which connectors were wired, which are missing, and the one next step.

## Notes

- Everything runs from the user's own connectors and permissions, so each person sees only the data they can already access. Nothing is sent anywhere by this skill.
- Do not read message, file, calendar or CRM content during install; only tool names are needed. If connector data shows up in a tool result anyway, ignore it.
- If tools are called by a different name pattern than `mcp__<uuid>__<tool>` in this session, say so and stop rather than guessing.
- Share-link installs are unreliable (org sharing settings, and the author's connector IDs), which is why this skill exists. Prefer it.
