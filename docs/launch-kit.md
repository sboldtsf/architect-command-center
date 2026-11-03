# Architect Command Center: launch kit

Everything to launch to all Salesforce architects: verification checklist, install steps, the Slack post and thread, a 2-minute demo script, FAQ, and how to ship updates. Items in [BRACKETS] are yours to fill in. This replaces the older HLS-only share package.

Open link (Claude desktop app): `claude://cowork/shared-artifact?uuid=01a18a60-0ef6-72b0-9de1-b8522787fe2e`
Feedback channel: #architect-command-center (feedback intake and triage template)

---

## 0. The story in one breath

**Headless architecture, for architects.** There is no server, no hosting, no new login. The dashboard is a single page that runs inside Claude Desktop and talks straight to the systems you already use (org62, Tableau, Slack, Google Drive, Calendar, Lucid) through connectors, as you, with your permissions. Reads are read-only. Anything that writes is a draft you review. That is the whole security model, and it is why it can be shared with every architect without a rollout project.

What it replaces: five tabs, three exports, and a Sunday-night spreadsheet.

---

## 1. Before you post (your checklist)

1. **Test as someone else.** Have one architect outside your vertical (for example TMT or Public Sector) open the link first. Confirm "Viewing as" shows their name, the Scoreboard scopes to their vertical, and the first-run Personalize wizard finds their accounts. This is the one thing I could not test from your account.
2. **Run each tab once yourself** (2 minutes): Overview, Activity, Scoreboard (open Tableau insights and click Explain this), Mission Control (run one named-account mission and one free-text mission), My Assets, Travel, Settings. Confirm nothing shows a red error.
3. **Check the Tableau workbook.** Open the published "Architect Command Center Pipeline" workbook once. If it renders blank, use Edit in Tableau to re-point the data source; the in-app Tableau section does not depend on it.
4. **Slack drafts into the feedback channel are off** (the connector is not signed into the salesforce-internal workspace). Feedback uses the form flow, which works. If you reconnect Slack to salesforce-internal later, flip the draft option on.
5. **Pick the channels** for the post (see section 3) and heads-up your leader first if you want "shared with [LEADER]'s support" in the post.
6. **Delete test artifacts**: test Google Slides decks, test Slack drafts in your DMs, and the stale `monday-mission-brief` scheduled task if you do not want it.
7. **Pin the post** and add the link to the channel bookmarks.

---

## 2. Install instructions (copy into the post or thread)

1. Install and sign in to **Claude Desktop** with your work Claude account (the same organization as the person who shared it). If you see "Sharing isn't enabled", see the FAQ.
2. Click the link: `claude://cowork/shared-artifact?uuid=01a18a60-0ef6-72b0-9de1-b8522787fe2e`. It opens in the app.
3. **Connect your tools** when asked. Required: **org62** (read-only). Recommended: **Slack** and **Tableau**. Optional: Google Drive, Google Calendar, Lucid. Missing ones just turn that feature off; nothing breaks.
4. Finish the 1-minute **Personalize** wizard: name, theme, your accounts (searched in org62), hours goal. Redo it any time from Settings.
5. Take the **tour** (Light is one minute) and try **Mission Control**: type an account name or a worry and press Launch.

First open takes a few seconds while it checks your connectors. Mission Control runs take 1 to 3 minutes; the progress bar shows exactly which system is working.

---

## 3. The Slack post (main message)

Post in the architect community channel(s), then pin. Use as written or trim.

> :rocket: **Architect Command Center is live: everything you do on deals, in one place**
>
> A command center for architects that lives *inside Claude Desktop* and pulls straight from org62, Tableau and Slack. No server, no new login, no data copied anywhere. It runs as you, with your permissions. Watch the 30-second tour above, then open it.
>
> **Everything about how you are involved with deals, and what you do on them:** your Deal Contributions, the accounts you cover, the activity you log, your hours vs. target, and how it all rolls up. It spots the gaps (a DC with no activity, activity with no DC, a deal closing with no next step) and gives you a one-click fix.
>
> **Ten tabs, one line each**
> :rocket: **Briefing**: your start-here page. Alerts, how current your logging is, what needs action, and a card for every other tab.
> :house: **Overview**: the big picture. Hours vs. target and pace, weekly rhythm, deals closing soon with Slack updates, and your deal journey by stage.
> :satellite: **Mission Control**: one box, one button. Type an account or a worry and press Launch. I am not saying more. Let it surprise you. :eyes:
> :briefcase: **Deals**: every Deal Contribution you hold, by quarter and stage, with what is flagged and a one-click fix that opens the right org62 form.
> :dart: **Opportunities**: where you belong. Your accounts (found from where you log time), open deals worth a look, and the requests you accepted in Slack.
> :zap: **Activity**: your time and rhythm. Hours, customer share, a daily heatmap, your work style from your calendar, and a "log my time" shortcut.
> :checkered_flag: **Scoreboard**: closed and projected for you, your team or your vertical, with live Tableau insights, Explain this, and an Ask Tableau box.
> :trophy: **Team**: a friendly leaderboard of customer-related hours across architects in your role, plus a names-free summary to paste into Slack.
> :file_folder: **My Assets**: the decks, docs and diagrams you already built, found across Drive, Slack and Lucid so you stop rebuilding them.
> :gear: **Settings**: make it yours. Themes, light/dark, accounts, goals, automations, and a setup check.
>
> Plus a quarter or year-end **slide in one click**, a guided **tour**, **Wrapped** (your year in review), and a few secrets hidden inside.
>
> :lock: **Safe by design**
> • Read-only on org62. It never changes a record.
> • Anything it writes (Slack, calendar, slides) is a **draft you review**. Nothing is sent for you.
> • Every call is traced, so you can see exactly what it touched.
> • Treat screenshots as internal: they can show real deal names and amounts.
>
> :point_right: **Open it:** claude://cowork/shared-artifact?uuid=01a18a60-0ef6-72b0-9de1-b8522787fe2e
> :wrench: **Need:** Claude Desktop, signed in, with the org62 connector (Slack and Tableau recommended). Steps in the thread :thread:
> :speech_balloon: **Feedback, bugs, ideas:** #architect-command-center
>
> Built by Steve Boldt with Claude. Tell me what you want it to do next.

---

## 4. Thread replies (post these under the main message)

**Reply 1: install in 60 seconds**

> 1. Claude Desktop, signed in  2. Click the link  3. Connect org62 (required), plus Slack and Tableau  4. Finish the 1-minute Personalize wizard  5. Try Mission Control. First open takes a few seconds while it checks your connectors.

**Reply 2: what to try first**

> Open **Mission Control**, type an account you own or a worry like "what is most at risk on my deals closing this quarter", and press Launch. No spoilers: it takes 1 to 3 minutes and you can keep exploring other tabs while it works. Then open the **Scoreboard** tab, click **Explore live data**, and press **Explain this**. Finally, hit the **tour** button for a 1-minute walkthrough (the tour keeps Mission Control spoiler-free on purpose).

**Reply 3: how it works (post this one only when someone asks)**

> It is one page running in Claude Desktop. Mission Control calls org62, Tableau and Slack through your own connectors, hands the evidence to Claude, and writes the brief from only that evidence. Every call shows in the Agent trace with timing. No backend, no copy of your data.

**Reply 4: is it safe?**

> Read-only on org62. It acts as you, so you only see what you can already see. Slack, Calendar and Slides output are drafts or files you review. The free-text box does not send your question anywhere except to Claude in your own session. Please keep screenshots in internal channels; deal names and amounts show up.

**Reply 5: it feels heavy on my laptop**

> The 3D scene pauses when you scroll away or switch tabs, and it automatically switches to **Lite visuals** if your machine struggles. You can force it in **Settings > Lite visuals**, or turn off all motion with **Calm mode**.

**Reply 6: feedback and what is next**

> Found a bug or have an idea? Drop it in #architect-command-center using the form pinned there (bug, idea, pain point, praise). Please blur customer names. I read everything. Updates ship to the same link, so you will see improvements without reinstalling (reload the artifact).

---

## 4b. Video: yes, but a teaser with no Mission Control reveal

- **Length:** 20 to 30 seconds, silent with captions.
- **Show:** the Overview header, the Scoreboard and Tableau insights, My Assets, the Travel globe, a theme switch, and the 1-minute tour button. Quick cuts.
- **Mission Control:** show only the closed state, the "One question. Four systems. Zero tabs." intro and the empty box. End on a cursor typing "prep me for" and cut to black with the caption "Press Launch. Don't spoil it."
- **Never show:** a live run, the 3D scene, the brief, the game plan, the cloud transition, the Matrix terminal or the six secrets.
- **Blur** anything with real deal names or amounts.
- The post now refers to "the 30-second tour above", so attach the video to the main message. If you post without it, delete that sentence.

---

## 5. Short version (email, team meeting, or a DM)

> **Architect Command Center**: a Claude Desktop dashboard that pulls org62, Tableau and Slack together. Mission Control has one box and one button; try it and let it surprise you. Read-only, runs as you, drafts only. Open `claude://cowork/shared-artifact?uuid=01a18a60-0ef6-72b0-9de1-b8522787fe2e` in Claude Desktop, connect org62, and press Launch. Feedback: #architect-command-center.

---

## 6. Two-minute demo script (live team meetings only; do not record this)

1. **0:00** "Five tabs and a spreadsheet, or one question." Open Mission Control. Point at the status line: org62, Tableau, Slack.
2. **0:15** Type "prep me for my POV with [your account]" and Launch. Narrate the countdown, then the live scene and the phase chips lighting up.
3. **0:45** While it runs, switch to **Scoreboard**, open Tableau insights, press **Explain this**. Mention it keeps working in the background.
4. **1:15** Return to Mission Control. Show the brief, the risk card, then the **AI game plan** card: thesis, steps, storyline, first move.
5. **1:45** Click **Talk track**, then open **Ask the agent** and ask "what should I do first this week".
6. **2:00** Close with the safe-by-design line: read-only, drafts only, every call traced. Show the feedback channel.

---

## 7. FAQ

**Does it change anything in org62?** No. All org62 access is read-only. Fix and Log links open org62 or Slack; you save there.

**Whose data do I see?** Only what your own org62, Tableau, Slack and Drive permissions already allow. It acts as you.

**Why did Mission Control say it could not find my account?** It searches org62 for open pipeline on accounts matching the name. Check the spelling, or try the parent company. It never silently swaps in a different account.

**The brief says "computed straight from the org62 numbers".** Claude's written summary timed out, so it fell back to the numbers. Run it again for the full version.

**Why does a mission take 1 to 3 minutes?** It makes real calls to four systems and then writes the brief and game plan. The bar shows progress, and you can use other tabs meanwhile.

**Tableau section says no data or Pulse shows nothing.** The Tableau connector may be missing or the viewer lacks access to the Specialist Pipeline view. Pulse metrics without goals are hidden on purpose.

**Slack features are greyed out.** The Slack connector is not connected. Everything else still works.

**"Sharing isn't enabled" when I open the link.** That is an organization setting, not something the viewer can switch on. Sharing only works inside the same Claude organization, so first confirm they are signed in with their work Claude account. Then an admin (Owner) needs **Artifacts** on in Organization settings > Artifacts and **Enable artifact connectors** on in Organization settings > Capabilities (the dashboard needs connectors). On Enterprise plans, the person's custom role also needs the **Artifacts** capability. Until then they cannot open it.

**It says Slack, Tableau or another tool is not connected, but it is connected in Claude.** The dashboard tests each connector with a real call and can miss it if your connector has a different internal ID than the one it was built with. Go to Settings > Connections and press Check again, allowing any permission prompts. If a row still says not connected, open **"Connected in Claude but shows not connected? Fix it here"** under the list: copy the prompt, paste it into a new Claude chat, paste Claude's JSON reply back, and press Save. The dashboard then uses your own tool IDs. If it still fails, press **Copy diagnostics** and send the text to the owner.

**It makes my laptop hot.** Settings > Lite visuals, or Calm mode. Lite turns on by itself when it detects a struggling machine.

**How do I get updates?** Updates are published to the same link. Reload the artifact (or reopen the link) to pick up the latest version.

**Where do I send feedback?** #architect-command-center. Please avoid customer names and screenshots with real amounts.

---

## 8. Shipping updates after launch

- Fixes and features are published to the same artifact; people on the link get them on next open or reload. (I have not confirmed whether already-open sessions refresh automatically, so post "reload to update" in the thread for each release.)
- Keep a one-line "What is new" for each release; the app shows its own What's new note.
- Triage rule: bugs reproduced within a day get a fix and a thread reply; ideas collect in the tracker and go into a monthly "what shipped" post.
- Rollback: a copy of every published version is kept in the backups folder; the previous version can be re-published in one step.

---

## 9. Data handling note

The dashboard shows deal and account names and amounts from org62. Treat screenshots, recordings and generated slides as internal and confidential, and share only in internal channels. Do not paste customer contact details or credentials into Mission Control or the feedback form.
