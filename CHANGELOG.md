# Changelog

All notable changes to the Architect Command Center. Newest first.

### v1.3 (Nov 3, 2026)

#### Added
- **Pipeline tab** (new): the health view of the pipeline on your focus accounts, moved out of Opportunities to keep that tab focused. It has three views: Health, Account plans and Whitespace.
- Health view: tiles for open pipeline, new this quarter, pipeline you helped open, closing this quarter, where you hold a DC and where you don't; charts for stage, close timing, coverage, deal health and pipeline age; and a quarter shortlist ranked by sell score (stage, next step, activity, your involvement, date) times amount, with suggested next moves from Claude.
- Account plans: for each focus account, scans the last 60 days of Slack (public and private channels you can see) and the org62 deals, then writes the signals (blockers, asks, competitors, technical needs, momentum), the products worth pitching or using from an architecture perspective with a fit score and the play, and a step by step plan across Now, Next 2 weeks and Before close. Steps are color coded by how an architect adds value (technical validation, solution design, proof, de-risk, align, enable), can be ticked off with saved progress, and the plan can be copied or saved as a Slack draft to yourself. Includes a path-to-close view with a dot per deal by stage, and a Scan all accounts button.
- Whitespace view: which product lines each account has bought in the last 4 years, which are in open deals, and which are open, with an Ideas button for plays on opening new pipeline.
- Pipeline welcome screen: opening the tab no longer loads everything. Choose all your accounts or pick specific ones, then a goal (health check, what can close this quarter, where to get a DC, plan my accounts, where I fit, find whitespace). Only that view is built, behind the loading screen. A Home button returns to the welcome screen.
- Swimlane guide and team model: Where I fit is labelled as the Regulated Industries model, with a popup guide (overview, architect plays, partner lanes, how the dashboard uses it) and an Edit model button so other teams can rename stages, change the plays and hide partner lanes. Saved per user, with reset to default.
- Attach plays view: selling signals now come from Tableau, live for your own OU. It finds your OU from the owner roles on your deals (adjustable), reads closed ACV by APM product for that OU over the last 12 months (Closed Business ACV) and open pipe by APM product for its SVP org (Open Pipeline and ACV), and compares each product's share of the mix (your OU closed, your org closed, your org's open pipe) so different dollar totals compare fairly. Tiers: Selling in your OU, Sells in your org but light in your OU, Pipe building with closes lagging, Barely selling anywhere. Bars and plain-language rules explain each tier. Slack win posts add optional notes. Results are cached for 24 hours.
- Tailor now gives a headline plus three steps, each with who to do it with, the artifact to produce (from your Where I fit plays for the deal's stage) and when, plus a deal-specific risk. It uses the deal stage, next step, days to close, what the account owns, and the OU's APM signals.
- Where I fit view: maps every focus account and deal onto the architecture sales swimlane (Plan, Prove, Commit, Consume across Proof of Vision to Expand & Scale), highlights each account's focus stage, and shows the architecture plays, partner lanes (Solution Engineering, Business Value, Deployment, Customer Success, FDE, Services) and deals at that stage. Starter hints are computed from org62, and a Claude button tailors how to help that account per play. The org62 stage to swimlane stage mapping is an estimate you can change per deal.
- Loading screen for the Pipeline and the Slack scans: animated graphic, progress steps, and rotating quotes, tips and Salesforce product headlines (captured Nov 3, 2026).
- Pipeline I helped open: new opportunities this quarter where you hold a DC or have had meetings.
- Pipeline card on the Briefing jump cards.

#### Improved
- Log my time: suggested hours come from your calendar meetings only (overlaps counted once), and the Slackbot prompt carries just the meetings and their total.

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
