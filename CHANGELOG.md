# Changelog

All notable changes to the Architect Command Center. Newest first.

### v2.1 (Nov 6, 2026)

**Look and feel**
- The Matrix theme (still hidden until you find it) now looks like a terminal: monospace green-on-black text everywhere, square corners, a prompt and blinking cursor on the title, `$` headings, bracketed tabs, outlined buttons, green icons and faint scanlines. Cards and the header are see-through, so the falling code shows behind the whole page.

**Fixes**
- Every pop-up (tour, What's new, Setup check, Personalize, Log my time, message composer, asset preview, Slack and automation dialogs, pre-meeting brief) fits the window and scrolls inside instead of running off screen.
- Setup check lists Tableau Next alongside the other connections.
- Sections that load in the background (Scoreboard, Team, Time spent, Deals I may belong on) no longer fail if the Command Center is hidden when they start. They wait and finish when you come back.
- Team shows a friendly "nobody has logged customer hours yet" message for an empty scope instead of "Team comparison failed".
- Fixed a duplicate element ID between Mission Control's Launch button and the message composer's Create draft button.
- Weekly hours chart: bars have screen-reader labels, and a bad date can no longer break the chart.
- The DC role picker on Today no longer shows a loading message as its value.
- Setup check points to Deals > Deals I may belong on for adding accounts; What's new lists the v2.1 changes. The cursor stops blinking when animations are off.

### v2.0 (Nov 4, 2026): major redesign

**Layout and navigation**
- Seven tabs: Today, Pipeline, Deals, Performance, Team, Assets, Settings. Overview, Mission Control, Opportunities and Activity live behind a small switch under their tab, and the Classic layout is retired.
- Long tabs are split into labelled sections (Scoreboard, Deals, Hours and activity), with a compact header and tab bar.
- One-level Pipeline navigation: pick your accounts once, then it opens on the view you used last.

**Pipeline (leadership's Q4 asks)**
- Health first: Plan for the quarter, then pipe quality, with every deal tagged Real, Needs vetting or Likely fluff and a last-quarter check of how often each tag closed.
- Q4 priorities pulled from Slack and Drive (sources you approve), attach plays from live Tableau product mix, architect-led white space, account plans and Where I fit.
- Prep my 1:1 brief on Today and Pipeline.

**Numbers you can trust**
- One plan shared by Pipeline and the Scoreboard (OU Fin Plan from Tableau Next, or your own number), with scope and basis shown on every number.
- Same customer-related activity types everywhere, quarter-only pipe with earlier-dated deals flagged, split credit shown, "showing N of M" when a list is capped, and dates in your local time.

**Look and feel**
- Five design styles (Futuristic, Simple, Executive, Compact, High contrast) and 16 colour themes in Architect, Salesforce and Industry groups, with your team's theme recommended.
- A one-time setup screen for style, theme, animations, header and landing tab.
- Readable buttons in every theme, plus a design clean-up: one type and corner scale, lighter effects, smaller images, accessibility basics.

**Speed and reliability**
- Lazy loading and fewer, shared org62 queries, so startup hits the rate limit far less.
- The Connections check covers every connector, including Tableau Next (Org62) and access to the Fin Plan model.
- Animations are off by default, and loading messages say what's being read.
- Plain-language errors, a query cache that can't wipe your settings, and Reset my view.

**Tour, help and tooling**
- Tour, hover cards and help rewritten for the new layout; the Light tour has 10 stops.
- Smoke tests (`npm test`), a minified build, and a release kit with the Slack post.

<details><summary>Full list of changes</summary>

v2.0 is a redesign of the whole Command Center: new seven-tab layout, Pipeline built around leadership's Q4 asks, one shared plan, design styles and colour themes, a one-time setup screen, faster and calmer loading, and the audit fixes. It includes everything that was in progress as v1.3.

#### Changed (v2.0 finishing pass)
- Stale wording fixed: Settings "Open on" and the Personalize landing step list the new tabs; help and setup checklist point to the right places.
- Deals pipeline numbers say their scope (your DC split, this and next quarter); "Closing soon" on Deals is now "Closing in the next 30 days".
- Gap to plan asks for your own number when the plan is the whole OU.
- Prep my 1:1 on Today, next to Update my manager (copy or save as a Slack draft to yourself).
- One overlay at a time on first load: the setup screen hides the loading screen, the tour waits for both, and "Still loading in the background" is a line under the tabs instead of a floating toast.
- "Refresh all data" in the header and "Refresh pipeline" on the Pipeline card.
- Pipeline › Health › Pipe quality: "Check against last quarter" rebuilds last quarter's deals as they looked at mid-quarter from org62 history, tags them with the same rules, and shows how many Real, Needs vetting and Likely fluff deals actually closed won.
- Faster start: duplicate identical org62 queries now share one request, and Activity's totals come from the by-type query (one fewer query at startup).
- Light tour cut to 10 stops; the rest moved to Medium.
- Simple, Executive and High contrast now also restyle the Scoreboard Arena lanes, the loading spinners, the Mission Control strip and the 3D visual.
- Repo: `npm test` runs smoke tests in jsdom (tabs, sections, loading text, themes, setup screen), and `./build.sh` minifies the dashboard for the skill and runs the tests first. Release kit in `docs/release-v2.0.md`.

#### Added (colour themes)
- Sixteen colour themes in four groups, one list everywhere (Settings > Appearance, Personalize and the setup screen): House (Command); Architect (Blueprint with a faint grid header, Whiteboard, Graphite); Salesforce family (Salesforce re-tuned to Lightning blue, Agentforce, Slack, Tableau, Data 360); Industry (Clinical for HLS, Ledger for FINS, Maple for Canada, Signal for TMT, Ember for PACE, Horizon for TTH, Market for CBS). The Matrix stays hidden until found.
- Your team's theme is marked "recommended" based on your org62 role, and is offered on the setup screen. New users start on their team's theme.
- Maple moved from bright red to burgundy, Forest became Market (indigo-led), Sunset became Ember (copper), Violet became Signal (violet and cyan), so accents no longer look like the at-risk, warning or on-track colours.
- Button text on accent colours picks black or white automatically, whichever is readable (dark-mode buttons failed contrast before).
- My color nudges the chosen hue until text and buttons are readable, and says so in Settings when it does.
- The Personalize "scenes" (Aurora, Ocean and so on) are replaced by the same named themes as Settings.

#### Added (design styles)
- Five design styles, switchable any time: Futuristic (the current look), Simple (flat, calm, one accent), Executive (numbers first, navy and grey, larger headline figures, helper subtitles, the Mission strip and Year in review hidden), Compact (tighter spacing, more rows on screen) and High contrast (stronger text and borders, bigger focus rings, underlined links). Styles sit on top of the colour themes and Dark/Light.
- The style question is on the one-time setup screen (with live preview; the screen shows once more for this build), in Personalize (the look step) and in Settings > Appearance. Charts pick up a new style's colours on the next load.

#### Added (loading and first-run)
- One-time setup screen (compact: six one-line settings with dropdowns and toggles, a tour checkbox, Skip and Save) for people updating to this build: animations, dark or light, compact or full header, which tab to open on, and an optional tour. It appears once over the loading screen while data loads; new users get the full Personalize setup instead.
- Loading clarity: spinners keep moving even with animations off (they were frozen, which made loading look stuck); every plain "Loading…" placeholder now says what it is reading; a spinner running over 40 seconds explains that org62 is busy and requests are retried, and after 2.5 minutes offers Refresh; raw connector errors ("Artifact is not currently shown", "rate limit exceeded") are shown in plain language.

#### Changed (design and performance pass)
- Design tokens: font sizes snapped to one scale (36 sizes down to 16 plus a few tiny chart labels, nothing under 11px in text), corners snapped to 4 / 8 / 12 / 16 / pill (was 24 values), one card header style, lighter card shadows, no backdrop blur on large panels.
- Header: subtitle, heartbeat line and the theme/mode row removed (theme and mode live in Settings > Appearance); header buttons share one corner style.
- Asset diet: embedded logos resized to the size they are shown at (about 110 KB smaller); about 130 unused CSS rules removed; the hidden deal-count chart, Account concentration and Landing simulator removed with their queries (Landing simulator kept its own target).
- Startup: the 13-week activity history (weekly stack, heatmap) waits for Performance > Hours and activity.
- Motion: animations are off by default (turn them on with the Animations button, now in the footer instead of floating over content); animation loops slow to one frame a second when the window is in the background.
- Long tabs: Hours and activity has three sections (Hours against target, Rhythm and capacity, Detail) that open one at a time; Deals has Closing and pipeline, My DC records and Clean-up. Today's needs-action links open the right section. The tour shows every section while it runs.
- Fixed: Pipeline's welcome screen waited up to 90 seconds for your focus accounts (they were deferred with Deals I may belong on). Accounts load at startup again, the screen shows a spinner while they load, Open is disabled until they arrive, and returning users go straight to their last view once they do.
- Fixed: deferring the 13-week activity history paused the rest of the page's startup (header stuck on "Loading from org62…", Pipeline waiting for accounts). It now runs on its own.
- Query cache moved to sessionStorage with oldest-first eviction, so it can no longer wipe your saved settings.

#### Changed (audit, round 2)
- Classic 11-tab layout retired; the 7-tab layout is the only one.
- Lazy loading: Scoreboard, Team leaderboard, Deals I may belong on, Time spent and the Settings connection test wait until their tab is opened (or about a minute after the page opens), so Today loads without competing for the connector rate limit.
- Pipeline has one level of navigation: the welcome screen only picks accounts (first visit), then Pipeline opens on the view you used last. The goal grid is gone; the view bar is the only view picker.
- Consolidated: Overview is gone. Closing soon, pipeline KPIs and Deal journey moved to Deals; hours against target, time mix, weekly rhythm and capacity moved to Performance > Hours and activity. Deals I may belong on moved from Pipeline to the Deals switch, so every DC-gap view lives under Deals. Today is Briefing plus Mission Control.
- Scoreboard trimmed: hid Deals closed by quarter (count), Account concentration and the Landing simulator (it had its own separate target); the projected close table shows instead. My 100% TA deals vs support moved to Deals.
- Deals clean-up audits are ranked by open items, with the top two that have work opened and an open-items count on each.
- Settings: Reset my view (sections, header, Pipeline view, shared quarter) keeps your profile, accounts, targets and plan.

#### Fixed (audit, round 2)
- Dates sent to org62 use your local date, not UTC (evening "today" and quarter boundaries were off by a day in some time zones).

#### Fixed (audit, round 1)
- One plan for the whole page: Pipeline publishes its plan, booked and remaining numbers, and the Scoreboard's Quarter outlook shows the same numbers with their source, basis and scope. The Scoreboard no longer computes its own "still to close"; it compares Commit and Best case only with your own number, and says why when the plan is the whole-OU Fin Plan.
- Pipeline "this quarter" now counts only close dates inside the quarter. Open deals still dated in an earlier quarter are listed separately as a clean-up note instead of inflating the quarter.
- Pipeline shows its scope (accounts, $100K+ deals, full opportunity amount) and says when it is showing only the top 250 deals.
- Team leaderboard uses the same 23 customer-related task types as Overview and Activity (was 11), and notes if it hit the 2,000-row limit.
- Scoreboard: the arena tag shows scope and basis instead of a second "live from org62" badge; "Me" shows your split credit and an empty-state line instead of a bare $0; days left matches the header everywhere.
- Scoreboard says when Pipeline is set to a quarter outside this fiscal year.
- Pipeline is now the second tab (Today, Pipeline, Deals, Performance, Team, Assets, Settings).
- Collapsed header also hides Personalize and Year in review.
- Pipeline text is readable in Light mode.
- REG Q4 planning deck is only pinned for REG roles. Wording fixes: data-handling note lists what the page writes (Slack drafts, Calendar holds, Slides), Attach plays says Tableau data refreshes daily, vetting labels are described as estimates, no unmeasured load times.
- Accessibility: visible keyboard focus, and icon-only buttons get screen-reader labels from their tooltips.

#### Changed (cleanup pass)
- Today: removed the redundant "Jump into" cards; the Mission Control strip now shows only on Today.
- Tab wording and the guided tour updated to the 7-tab names.
- Performance > Scoreboard: cards grouped into labelled, collapsible sections (Results, Outlook, My contribution); score cards open by default.
- Attach plays: vetting, where-to-push and the product mix are collapsible sections (mix closed by default).
- Where I fit: "who else is in the lane" is collapsible and closed by default; shorter stage-dropdown note.
- Present button stays visible when the header is collapsed.
- Guided tour and tab hover cards updated for the 7-tab layout: removed stale jump-card and every-page Mission strip wording, added a Pipeline hover card, reworded Today and Performance, and the "Ten tabs" step now shows only on the Classic layout ("Seven tabs" only on the new one).
- Tour rework: Pipeline steps now open the right view (welcome screen, Health, shortlist, charts, Attach plays, White space, Account plans, Where I fit, 1:1 brief) with accurate text; steps follow the new tab order (Today, Pipeline, Deals, Performance, Team, Assets, Settings); the header expands during the tour; if a target is still loading the spotlight waits for it; Scoreboard is in the Light tour.
- Scoreboard sections now act as an accordion (only Results open by default; opening one closes the others). Win rate and Slippage cards start collapsed.

#### Added
- **New 7-tab layout** (Phase 2 of the declutter): Today (Briefing, Overview, Mission Control), Pipeline (health and plan, Opportunities), Deals, Performance (Scoreboard, Activity), Team, My Assets, Settings. Related pages sit behind a small switch under the tabs. Settings > Layout switches back to the Classic 11 tabs at any time.
- **Q4 priorities card** (Pipeline Health): searches Slack (public and private you can see) and Google Drive/Slides for the OU's Q4 priorities, pins the REG Q4 planning deck, lets you approve which sources count (and add your own Slides/Drive links), and extracts the priorities with where each came from. Priorities are tagged as chips on matching deals, counted against open deals, and fed into Tailor steps and the 1:1 brief.
- **Real OU plan from Tableau Next (Org62)**: Gap to plan now reads the OU's Fin Plan target, booked ACV and open pipe from the Tableau Next sales model (via the Tableau Next - Org62 connector, optional). The model has no HLS/HC split, so it shows the whole OU (for example AMER REG) and keeps the manual override for your slice. Falls back to last year +30% when the connector isn't connected.
- **Pipeline tab** (new): the health view of the pipeline on your focus accounts, moved out of Opportunities to keep that tab focused. It has three views: Health, Account plans and Whitespace.
- Health view: tiles for open pipeline, new this quarter, pipeline you helped open, closing this quarter, where you hold a DC and where you don't; charts for stage, close timing, coverage, deal health and pipeline age; and a quarter shortlist ranked by sell score (stage, next step, activity, your involvement, date) times amount, with suggested next moves from Claude.
- Account plans: for each focus account, scans the last 60 days of Slack (public and private channels you can see) and the org62 deals, then writes the signals (blockers, asks, competitors, technical needs, momentum), the products worth pitching or using from an architecture perspective with a fit score and the play, and a step by step plan across Now, Next 2 weeks and Before close. Steps are color coded by how an architect adds value (technical validation, solution design, proof, de-risk, align, enable), can be ticked off with saved progress, and the plan can be copied or saved as a Slack draft to yourself. Includes a path-to-close view with a dot per deal by stage, and a Scan all accounts button.
- Whitespace view: which product lines each account has bought in the last 4 years, which are in open deals, and which are open, with an Ideas button for plays on opening new pipeline.
- Pipeline welcome screen: opening the tab no longer loads everything. Choose all your accounts or pick specific ones, then a goal (health check, what can close this quarter, where to get a DC, plan my accounts, where I fit, find whitespace). Only that view is built, behind the loading screen. A Home button returns to the welcome screen.
- Swimlane guide and team model: Where I fit is labelled as the Regulated Industries model, with a popup guide (overview, architect plays, partner lanes, how the dashboard uses it) and an Edit model button so other teams can rename stages, change the plays and hide partner lanes. Saved per user, with reset to default.
- Attach plays view: selling signals now come from Tableau, live for your own OU. It finds your OU from the owner roles on your deals (adjustable), reads closed ACV by APM product for that OU over the last 12 months (Closed Business ACV) and open pipe by APM product for its SVP org (Open Pipeline and ACV), and compares each product's share of the mix (your OU closed, your org closed, your org's open pipe) so different dollar totals compare fairly. Tiers: Selling in your OU, Sells in your org but light in your OU, Pipe building with closes lagging, Barely selling anywhere. Bars and plain-language rules explain each tier. Slack win posts add optional notes. Results are cached for 24 hours.
- Attach plays: a Where to push this quarter section ranks the products that lag in your OU (peers sell them, pipe is not converting, or barely sold anywhere) and says how many of your deals fit and where to originate; products already landing are only listed as a footnote. It previously ranked, using how far your OU trails peers and pipe plus how many of your deals fit. The product list now includes any APM product that sells in your OU or org, not just the named ones. The mix is a compact table (top 8, rest expandable) with plain colored tier tags.
- Attach plays: Vet the Q4 pipe first. Every deal closing this quarter is scored on close date vs stage runway, activity, next step, DC and size, then tagged Real, Needs vetting or Likely fluff with the reasons. Filter chips (default Worth working, which hides fluff) drive the deal list, the summary and the plays, with dollars per bucket.
- Pipeline quarter selector: pick the previous, current or next two fiscal quarters (saved). Vetting, deals, new-this-quarter and helped-open all follow the chosen quarter, so nothing is tied to Q4.
- Attach plays: Originate section lists, per focus account, up to three products your OU sells that the account doesn't own and has no open deal for, with the first move, so architects can open new pipeline where sellers don't know to look.
- Pipeline navigation: the five views are now a grid of cards (icon, name, one-line purpose) that wraps instead of scrolling, with Attach plays first. Home and the quarter selector sit on their own row above.
- Vetting now applies across the Pipeline tab: a Hide likely fluff toggle filters the shortlist, account plans, Where I fit and the deal list, and every deal closing in the quarter carries a Real, Needs vetting or Likely fluff tag.
- Vetting evidence and tuning: a Check Slack button searches the last 30 days of Slack for real movement on a deal and adjusts its score; the stage runway and quiet-days cutoffs are editable under Tune the rules.
- Attach plays open pipe now comes from org62 line items for your OU (renewals, spiff and SOW excluded), falling back to Tableau at the SVP org level when org62 returns too little. A Bookings selector switches between ACV-flagged only and all bookings, so products with few ACV-flagged lines (MuleSoft, Informatica) can be seen.
- Product primers: for each product, a short what it is, sell it when, and discovery questions, shown on the push cards, Originate rows and each deal's plays. Starter content to confirm with enablement.
- Loading graphic: the orbiting emojis are replaced with the real Slack, Salesforce (org62), Tableau, MuleSoft and Agentforce logos, with the Claude mark at the center.
- Main menu: compact one-row bar that wraps instead of scrolling. Short labels (Mission for Mission Control), icon-only Assets and Settings pinned right, tooltips on every tab, and labels collapse to icons plus the active name in narrow windows. The Agentforce logo no longer has a white square.
- Pipeline health leads with a Leadership view for the chosen quarter: a one-line read of how much of the closing pipe is real vs needs vetting vs fluff, a stacked bar by dollars, four action buttons (deals to vet, real deals with no DC, real deals closing in 30 days, products to push or originate) that jump to the right filtered view, and a check of whether the real pipe carries the products that sell in your OU.
- Gap to plan: the Leadership view builds a quarter plan the way leadership's AFCC OU report does (same quarter last year's ACV +30%, from Tableau closed ACV for your unit), subtracts what is booked so far, and shows coverage of the remainder by open stage 2+ pipe, with the Tableau Day-1 pipe target noted and a field for your own plan number. Fixed open pipe queries to use open rows (Is ACV = false) instead of ACV-flagged closed rows.
- Architect-led white space: a dedicated view (second tab) ranks focus accounts by the products your OU sells that they lack and have no open deal for, with the first move, a product primer and a Copy ask for the AE button. Originate moved here from Attach plays.
- 1:1 brief: one button copies, or saves to Slack drafts, a half-page brief with pipe quality, target gap, deals to vet, real deals without a DC, products to push and white space accounts.
- Tailor now gives a headline plus three steps, each with who to do it with, the artifact to produce (from your Where I fit plays for the deal's stage) and when, plus a deal-specific risk. It uses the deal stage, next step, days to close, what the account owns, and the OU's APM signals.
- Where I fit view: maps every focus account and deal onto the architecture sales swimlane (Plan, Prove, Commit, Consume across Proof of Vision to Expand & Scale), highlights each account's focus stage, and shows the architecture plays, partner lanes (Solution Engineering, Business Value, Deployment, Customer Success, FDE, Services) and deals at that stage. Starter hints are computed from org62, and a Claude button tailors how to help that account per play. The org62 stage to swimlane stage mapping is an estimate you can change per deal.
- Loading screen for the Pipeline and the Slack scans: animated graphic, progress steps, and rotating quotes, tips and Salesforce product headlines (captured Nov 3, 2026).
- Pipeline I helped open: new opportunities this quarter where you hold a DC or have had meetings.
- Pipeline card on the Briefing jump cards.

#### Improved
- Log my time: suggested hours come from your calendar meetings only (overlaps counted once), and the Slackbot prompt carries just the meetings and their total.

#### Fixed
- Header is collapsible (collapsed by default: title, connections, Refresh and Log my time; Show all restores personalize, tour and theme). Removed the Tableau badge from the Performance tab.
- Tab bar redesigned for the 7-tab layout: one compact row with text labels on every tab (no more icon-only tabs or wrapping), a slim second-level switch, and a slimmer Mission Control strip. Classic layout keeps the old look.
- One plan number: the plan you enter in Pipeline ("Use my own plan") now also drives the Scoreboard outlook and Landing simulator (Payer view), so the two no longer disagree. Existing saved numbers are still picked up.
- One quarter: the quarter picked in Pipeline and the Scoreboard landing simulator stay in sync.
- Pipeline "More" menu did nothing (its button name clashed with the Show all buttons); fixed.
- Deals, Scoreboard and Activity: cards without charts are now collapsible, with only the first open by default. Your choices are remembered.
- Pipeline declutter (Phase 1): Health is first in the nav; the Leadership card is split into three collapsible sections (Plan, Pipe quality, Does the pipe carry what sells) with the last one closed by default; charts sit behind a "See charts" toggle; the shortlist and Attach plays deals show the top 5 with a Show all; the header keeps quarter, scope and fluff toggle, with the brief and Slack draft under "More".
- The Under-attached / Covered tag in "Does the real pipe carry what sells?" ran off the right edge; the row grid now fits.
- Q4 priorities sources: broader Slack and Drive search, then an AI relevance check keeps only sources that state Q4 priorities for your OU (excludes media budget, events, other regions), with plain-English titles and a tidy card grid.
- Stage bars in Pipeline Health overlapped after the nav rework (CSS class clash); fixed. OU plan from Tableau Next now loads in the background instead of blocking the card. Q4 priorities card is a compact grid and only offers sources that mention your OU.
- Buttons inside a card header (such as Refresh on Pipeline health) no longer also collapse the card.

</details>

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
