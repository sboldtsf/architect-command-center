# Changelog

All notable changes to the Architect Command Center. Newest first.

### v1.2 (Nov 2, 2026)

#### Added

**Briefing tab**
- Today's meetings: customer vs internal tags, account match with a Prep button (opens Mission Control), "happening now" and "in 25m" cues, a done marker on finished meetings, and Zoom and Teams badges.
- Finished-meeting summaries: reads the Gemini notes (or transcript) attached to the calendar event and shows a short summary plus the next steps that involve you. Calls with no transcript captured are labeled as such.
- End-of-day wrap-up: meeting count and hours, customer calls and accounts, highlights, your consolidated next steps, with Copy and Log my time. Opens on its own after 4pm.
- This week's capacity strip: free hours per day, load badge, next week and the best week for new work.
- Unlogged-time nudge with a one-click review of suggested hours.

**Team tab**
- Team wins: closed-won deals with the architects credited, quarter and 60-day views, and a congrats Slack draft per teammate written about the account win, with no titles or amounts.
- Team buzz: interesting public Slack posts teammates shared that others reacted to.
- Cover for me: a handoff note for a peer, optionally enriched with recent Slack context per deal. Saved as a draft only.

**Deals and Opportunities**
- Dead dupes: your DCs on Dead - Duplicate deals, flagged where the replacement opportunity has no DC from you.
- Additional DC: accounts where you hold a DC on some deals but not all, collapsible by account with filters and Add DC links.
- Product-line tags on opportunity names (SO, SLK, INFA, MS, TAB, MC, CC, otherwise Core) with hover names, shown across the Deals and Opportunities tabs.

**Overview and Activity**
- Capacity card for the next 4 weeks from meetings, travel and deals closing.
- Time spent, last 30 days: hours by account, deal and activity type with a copyable summary.
- Time suggestions in Log my time: estimated hours per day from meetings, doc edits and Slack.

**My Assets**
- Preview panel, ask about an asset, smart search with best matches, account packs, pins, a sharing helper and a duplicate finder. Lucid diagrams are summarized from their content.

**Platform**
- Connections status pill in the header with per-connector status and automatic rechecks.
- Loading screen with a readiness checklist.
- Installer skill to install or update the dashboard wired to your own connectors.
- Slide builder can pick any fiscal quarter; Year-end review uses fiscal-year-to-date hours, mix and target.

#### Improved
- DC role conflicts now catch any two architects at 100% on a deal and show one card per opportunity listing everyone involved. FINS is locked to one role (Enterprise Architect), and the role setting is locked by vertical.
- Closing soon is collapsible with an alert badge and compact rows.
- Setup check explains when the Tableau pipeline view is not shared with you; pre-meeting brief test lets you pick the account; Slackbot actions show a copy-prompt panel.
- Performance: Today re-renders once instead of per query, the time formatter only scans what changed, old cached queries are cleaned up, background timers pause when the tab is hidden, and about 110 KB of duplicate images were removed.
- Team tab loads faster: wins are cached for 30 minutes and load alongside Cover for me.
- Look and feel: refreshed header, cards, chips, tooltips and spacing throughout.

#### Fixed
- Capacity numbers: overlapping meetings are counted once, only the remaining hours of today count, other people's PTO no longer counts, and your own solo blocks count half.
- "Artifact MCP rate limit exceeded" on Team: calls now share a throttle with backoff, and there is a Try again button.
- Additional DC was long and hard to tell apart; it is now grouped and collapsible.
- Smart search showed "Nothing here" under Best matches.
- Settings cards stay put, and removed accounts disappear right away.

#### Known limits
- Zoom and Teams meetings usually have no automatic notes, so they get a badge instead of a summary.
- Meeting summaries need Gemini notes or a transcript attached to the event, plus the Google Drive connector.
- Lucid image previews are not available inside the artifact, so diagrams are summarized from text instead.

### v1.0 (Oct 30, 2026)
- Initial launch: Briefing, Overview, Mission Control, Deals, Opportunities, Activity, Scoreboard, Team, My Assets and Settings.
