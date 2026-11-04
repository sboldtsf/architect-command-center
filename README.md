# Architect Command Center

A single-page dashboard for Salesforce architects that runs as a Claude Desktop artifact. It reads org62, Tableau, Slack, Google Calendar, Drive and Lucid through the user's own connectors, so there is no server and no separate login. Anything it writes (Slack, calendar, slides) is a draft the user reviews.

Current version: **2.0** (Nov 4, 2026), a major redesign. See [CHANGELOG.md](CHANGELOG.md).

## Layout

| Path | What it is |
|---|---|
| `dashboard.html` | The master source: one self-contained HTML file (CSS, JS and logos inline) |
| `skill/architect-command-center-installer/` | The installer skill (SKILL.md, `scripts/rewrite_ids.py`, and a copy of the dashboard in `assets/`) |
| `dist/` | Built `.skill` packages |
| `docs/` | Release notes with the Slack post, and the launch kit |
| `build.sh` | Syncs `dashboard.html` into the skill and builds the `.skill` package |

## Releasing an update

1. Edit `dashboard.html`. Bump `window.APP_VERSION` and replace the `NEW` list (the footer's "What's new") with only the updates in this version.
2. Update `Skill version` in `skill/architect-command-center-installer/SKILL.md` to match.
3. Add the changes to `CHANGELOG.md`.
4. Run `./build.sh` to refresh the skill's copy and rebuild `dist/architect-command-center-installer-v<version>.skill`.
5. Publish the artifact with the **complete** connector tool list (see the skill's `mcp_tools.json` handling in `rewrite_ids.py`), then commit and tag: `git tag v1.2`.
6. Post the update in #architect-command-center and tell people to reload the artifact.

## Notes

- The dashboard contains org IDs and an owner Slack profile link but no tokens or customer data. Keep the repo private.
- Screenshots and test data can show real deal and account names. Do not commit them.
