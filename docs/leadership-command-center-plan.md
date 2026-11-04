# Leadership Command Center: architecture review and plan

Nov 4, 2026. Proposal for a simple, separate view for leaders of architect teams, built on what the Architect Command Center already proves works.

## Recommendation

Yes, build it, as a **separate, lean artifact**, not a mode inside the architect page.

- The architect page is 1.6 MB, runs about 100 queries for one person, and is full of personal admin (time logging, DC clean-up, Wrapped, tours). A leader needs about ten numbers for a whole team, fast.
- A separate artifact starts in seconds, stays simple, and can be shared with leaders without them seeing (or being slowed by) architect-only features.
- It reuses the proven pieces: identity, org chain, the vetting score, the shared plan, Tableau product mix, Claude briefs, styles and themes.

## What the leader sees (one page, five blocks)

Mapped to Ahmed's ask:

| Block | Answers | Contents |
|---|---|---|
| **1. Plan and coverage** | "Will we hit target?" | Plan (OU Fin Plan or the leader's own number), booked, remaining, team open pipe this quarter, coverage, days left. One number per tile, with its scope shown. |
| **2. Pipe quality by architect** | "Is the pipe real?" | One row per architect: open pipe this quarter split into Real / Needs vetting / Likely fluff $, deals past due, deals with no activity in 30 days. Sorted by $ needing attention. |
| **3. Deals to help close** | "Where do we step in?" | Top 10 team deals closing this quarter by sell score × amount, with architect, stage, next step and the main risk. Buttons: open in org62, draft a Slack nudge to the architect (draft only). |
| **4. What's selling and white space** | "Are we pushing the right things?" | OU product mix vs the team's open pipe (under-attached products), and pipe the team helped open this quarter per architect. |
| **5. 1:1 prep** | "What do I talk about?" | Pick an architect to get a half-page brief from their numbers (top deals, risks, white space, asks), copyable or saved as a Slack draft to yourself. |

A small header holds the scope picker (my team, my org, or a role filter), quarter, Refresh, and style and theme (Executive by default).

## What it deliberately leaves out

- No time logging, hours targets, heatmaps or logging streaks.
- No DC audit tables (role conflicts, dead dupes and so on). The only hygiene signal is one count per architect ("4 DC gaps"), so the leader can nudge without managing records.
- No tours, Wrapped, mascots or easter eggs.

This is also where architect admin goes down. Leaders get pipe status, quality and talking points automatically, so they stop asking architects for weekly spreadsheets, status emails and pre-1:1 updates. A Monday digest (a scheduled Slack draft to the leader) can replace the weekly roll-call.

## Architecture

### Identity and team

- **Who is viewing:** the connected org62 user, as today. Their direct reports and two levels down come from User.ManagerId, using the same org-chain query the Team leaderboard already runs (it returned 339 users for a large chain).
- **Scope:** filter to the architect roles, then let the leader pick "my direct team", "my org" or a role filter.
- **Testing without being a manager:** a "View as leader of…" picker lets a non-manager like you preview any team your org62 access can read, for example Ashif's.

### Data (aggregate first, about 8 to 12 calls on open)

| Call | Source | Notes |
|---|---|---|
| Team members and roles | org62 User | One query, cached for the day |
| Team deals this quarter | org62 Deal_Contribution__c for the team's user IDs, with the opportunity fields needed for vetting | Chunked about 100 IDs per call. This is the main query. |
| Close-date pushes | org62 OpportunityFieldHistory for those opportunities | Slippage and the "risk" column |
| Last activity | Already on the opportunity (LastActivityDate) | No Event queries needed |
| Plan | Tableau Next (OU Fin Plan) or the leader's own number | Same shared-plan rule as the architect page |
| Product mix | Tableau (same views as Attach plays) | Cached for 24 hours |
| 1:1 brief | Claude, on click | From the numbers already on the page |

Hours are optional. If leaders want them, add a single aggregate per architect as one small column, not a section.

### Shared definitions (so both views agree)

Keep one definitions file in the repo, used by both builds:
- the vetting score and its weights;
- the plan source rule;
- "this quarter" (close date inside the quarter, with earlier-dated open deals flagged separately);
- the customer-related task types;
- the amount basis (full opportunity amount vs split).

A leader's number for an architect then matches what that architect sees.

### Permissions and data handling

- **Visibility:** everything is read-only and runs as the leader. What they can see follows their own org62 sharing. Phase 0 must confirm a leader can read their team's DC records and opportunities.
- **Writes:** none to org62. Slack output is drafts to yourself only, as today.
- **Hours are sensitive:** they're per-person performance data. Keep them off by default and team-level if added.
- **Customer data:** names and amounts appear in AI briefs and Slack drafts, as in the architect page. Keep the same data-handling note.

### Distribution

- **New artifact:** "Leadership Command Center", separate from the architect page.
- **Repo:** a `leadership/` folder in the same repo, sharing the definitions file, styles and themes.
- **Install:** the installer skill gets a "leader" option that installs this artifact instead of, or alongside, the architect one.

## Plan

| Phase | Scope | Size |
|---|---|---|
| **0. Probe** | Confirm leader-scope reads work (DC records and opportunities for a team), measure query counts and timing, and pick a pilot leader (Ahmed or Ashif). | Half a round |
| **1. MVP** | Blocks 1, 2, 3 and 5. Scope picker, quarter, Executive style, "View as leader of…" for testing. | 1 to 2 rounds |
| **2. Selling and white space** | Block 4, the Slack nudge drafts and the Monday digest (scheduled task). | 1 round |
| **3. Polish and roll-out** | Themes and styles, installer option, short guide, feedback from the pilot leader | 1 round |

## Risks

- **Leader sharing gaps:** if a leader can't read some DC records, the numbers under-count. Phase 0 checks this, and the page can show "N architects' data not visible".
- **Large orgs:** a two-level chain can be hundreds of people. Default to direct team, page the DC query, and show "showing N of M".
- **Plan scope:** the Fin Plan is OU-wide (AMER REG). The page should prompt for the leader's own number when the OU plan doesn't match their team.
- **Vetting accuracy:** leaders will act on "Likely fluff", so the backtest from the re-audit should land before or with Phase 1.

## Decisions (Nov 4)

1. **Pilot leaders:** Ashif and Ahmed, then other leaders.
2. **Hours:** leaders see hours and pipe.
3. **My team:** everyone in the reporting tree. Grouped by first-line leader, so Ahmed sees Ashif's and Samantha's teams as groups plus his direct architects.

## Phase 0 probe results (run as Steve, read-only)

- **Ahmed's tree:** 13 active people, 2 architect leaders and 11 architects. **Ashif's tree:** 5 architects.
- **Pipe:** one aggregate query (Deal Contribution grouped by architect, open, won and lost, for this quarter) returned all 11 architects. The team pipe is about $191M open by split amount, with $18M closed won so far.
- **Hours:** one aggregate query (Events grouped by owner, this quarter) returned 9 of 11 architects. The other 2 haven't logged time yet this quarter.
- **Readability:** both queries return the whole tree's data. A leader's own access should be at least as wide, so the page doesn't need special permissions.
- **Cost:** about 2 queries for the summary, plus one detail query when someone opens the deal list or an architect's brief.

## Revised page (no tabs, one scroll)

1. **Team headline:** plan, booked, remaining, coverage, days left, team customer-related hours against pace.
2. **Architects table:** one row each, grouped by leader. Columns: customer hours (vs pace), open pipe this quarter, Real / vetting / fluff split, closed won, deals needing attention, DC gaps. Click a row to see that architect's top deals and their 1:1 brief.
3. **Deals to help close:** the team's top 10 this quarter.
4. **What's selling and white space:** collapsed by default.
