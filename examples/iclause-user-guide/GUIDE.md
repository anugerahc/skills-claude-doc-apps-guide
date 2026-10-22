i-Clause User Guide
How to operate every step of the Post-Launch Evaluation — buttons, rules and what happens next

Start here

Quick start
Overview
Who can do what
Document life cycle

Tasklist & Setup

The Tasklist
Opening a document
Step 1 · Setup

Evaluation (PIC)

Step 2 · Evaluation screen
Editing & edit lock
Standard Spec
Actual Data
Issue Log & Evidence
Save vs Submit
Submit Stage checklist
Spec Validation stage

Review & Approval

PSD Review
Returned documents
Approval & Sign-off
Completed & Full Detail

Reference

Email notifications
Master Process Parameter
Button index (A–Z)
FAQ

## Quick start

Pick what you do. You get a step-by-step with the real screen for each step. Click the orange outlined item (or the button under it) and you see exactly what the system does next: the dialog, the message, and what changes.

I set up documentsPDV · PSD · Admin — Setup, Submit Setup
PIC · Process PerformanceSpec · Generate · readings · issues · submit
PIC · Spec Inline ProcessOracle spec · results · issues · submit
PIC · Spec Finished GoodsOracle spec · results · issues · submit
PIC · Spec ValidationMetadata · Analysis No. · decisions
I review for PSDOK / NOT OK · Return · Approve · Reject
I am a Superior (SPV)Read · Sign · Reject

Choose a role above to start.

#### 1 · Create or find the document
Documents come only from i2ms. Press Sync i2ms to pull in every project that is ready, or click the PENDING SETUP card to see the documents that are waiting for you.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhen projects are found3 new document(s) created from i2ms.
- Each new document starts as Pending Setup with project data, FPA date, brand, a suggested category and the Reviewer PSD already filled in from i2ms.
- Numbering is ICL-YYYY-00001. One document per project × plant × variant/SKU, and only for variants whose own FPA task is DONE.
- In i2ms the project’s “Project Closure” task is marked in progress.When nothing is eligibleNo new eligible i2ms projects.
Pressing Sync again never creates a duplicate of a document that is still alive (only a Rejected one gets a fresh document).
Read more: The Tasklist

#### 2 · Open the document
Click the Doc No (or the green pencil). Everyone opens the same screen; what you may change depends on your role and the status.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe document screen opens
- It opens on the step that matches the status — for a new document that is Setup.
- Save Draft and Submit Setup are only visible during Setup, and only to Admin / PDV / PSD.
- Earlier steps stay clickable; later steps are greyed until they apply.
Read more: Opening a document

#### 3 · Monitoring Window and Item Code
Set the Start / End Date for which Oracle data is pulled (Start defaults to the FPA date). Type at least 3 characters of the Item Code and press Enter, then click the right row in the list. Pick the Category and tick the Production Line(s).Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- Item Code: a list from Oracle opens. Clicking a row fills the code and the Item Description by itself. If the list stays empty, the system could not match this manufacturer in Oracle, or Oracle did not respond — try later or ask IT.
- Production Line: the Process Standard Spec is generated only for the lines you tick. “LINE B (saved)” means the line was chosen earlier but is no longer in the current list.
- End Date cannot be earlier than Start Date. Everything in “Project Description” is greyed out: it mirrors i2ms.
Read more: Step 1 · Setup

#### 4 · Reviewer PSD and the PICs
Choose the Reviewer PSD, then a PIC for every stage. Department and Superior fill in by themselves. Validation needs two different people: QA from QFS and ProDev from PDV.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- The Superior shown is the person who will later sign that stage’s approval slot.
- “—” under Superior after you picked a PIC = this person has no Superior in the user master. The document could then never be completed: ask an administrator to fix the user master first.
- A wrong department for a Validation PIC is refused: “The QA PIC of Specification Validation Review must be from the QFS department”.
Read more: Step 1 · Setup · Who can do what

#### 5 · Not finished? Save Draft
Save Draft keeps whatever you filled. Come back later — nothing is checked and nobody is emailed.Click the orange outlined item above — or here — to see what happensWhat happens when you click itResult

**Good job!**Draft saved successfully.OK
- Status stays Pending Setup. No required-field check, no email.If somebody saved after you opened the document

**Error!**The document was changed by someone else after you opened it. Please reload the page first.OK
Reload, then redo your changes.
Read more: Step 1 · Setup

#### 6 · Submit Setup
When everything is filled press Submit Setup. This is the real start of the evaluation.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Submit the setup? The assigned PICs will be notified and the evaluation will start.Yes, do it!Cancel2a · If something is missing

**Error!**Complete the following before submitting: Item Code, Production Line, PIC Spec Validation Review (2 people).OK
- Nothing is saved when this list appears. Fix the items and press Submit Setup again, or use Save Draft to keep what you typed.2b · If everything is filled

**Good job!**Setup submitted successfully. The evaluation can now begin.OK
- Status becomes Evaluation In Progress; the four stages start as “not submitted”.
- Every assigned PIC gets an “Evaluation Started” email.
- The Process Standard Spec is filled from Master Process Parameter for the manufacturer and the chosen lines.
- If the Monitoring Start is today or earlier, the first data pull from Oracle starts in the background.
- The Setup fields are now locked for everyone (a wrong PIC or Item Code can only be changed when the document is Returned). PSD and Admin can still move the Monitoring Window.Careful The Submit Setup button is also visible on a Returned document. Do not use it to resubmit: it resets all four stages and re-emails every PIC.
Read more: Step 1 · Setup · Document life cycle 
#### 1 · Open your stage
Open the document from the email link or the Tasklist (IN PROGRESS / RETURNED). It lands on the first stage where you are the PIC. Click your stage card: the card with the green outline is the one shown below.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe stage loads
- A skeleton shows for a moment, then the workspace: filters and statistics on the left, chart and reading table, then Input & Log (Standard Spec, Actual Data, Issue Log).
- You get the edit lock: only one person edits a stage at a time. If somebody else already has it you see a yellow ribbon and everything is read-only.How to read the stage card
| On the card | Means | 
| not started | No Standard Spec and no issue yet. | 
| clean | A Standard Spec exists but no issue has been logged. It does not mean there is no OOS: if “n OOS” in red is shown beside it, the stage still needs an Issue Log before it can be submitted. | 
| ⚠ n open | n issues are still Need Follow Up or In Progress. | 
| n issue · closed | All its issues are Closed or Close With Notification. | 
| round icon | Green tick = submitted; red alert = at least one issue open; grey dotted = everything else. | 
| n data · n OOS | Number of readings in the stage and how many are out of spec (ignores the filters). | 
Read more: Step 2 · Evaluation screen · Editing & edit lock

#### 2 · Standard Spec (Process)
The list of parameters comes from the Master Process Parameter. You only fill Min, Max and Target: Numeric parameters need all three, Value parameters need a Target. A required box that is still empty is red.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- Parameter, UOM, Machine and Line are fixed by the master. If the panel is empty press Pull from Master Process Parameter (disabled once any row exists).
- A row turns red when Max is smaller than Min or Target is outside Min–Max; Save will refuse it. Empty boxes are fine for a draft Save and only enforced at Submit.
- The trash icon asks “Delete this parameter row from the Standard Spec?”; the row is removed for real when you press Save.
- A Value or Text parameter on Process is judged only when its Min / Max and your reading are both numbers (e.g. a Weight Check); text such as “Pass” is never flagged.
- Changing the spec recalculates the OOS marks of the existing readings.If the pull fails
“Manufacturer is not set in Setup…”, “No Master Process Parameter exists for this manufacturer.” or “… for the selected Production Line(s)…”. Ask PSD to complete the master.
Read more: Standard Spec · Master Process Parameter

#### 3 · Generate the Actual Data rows
Press Generate from Batch-Lot (Oracle). It creates the rows for the lots produced in the Monitoring Window; the Actual column stays empty — you type the machine readings.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Generate rows from Oracle batch-lot data (entire Monitoring Window)?Yes, do it!Cancel2 · It runs in the backgroundGenerate is being processed in the background. Reloading shortly…
While it runs the Generate button is disabled and shows a spinner.Generate completed, reloading data…
- One row per Standard Spec row (parameter, machine, line) for each lot made on that same line in the Monitoring Window. Example: 2 spec rows on LINE A × 3 lots on LINE A = 6 rows.
- Press Generate again later and only new lots add rows; nothing is duplicated. Rows you deleted are not recreated by the automatic pulls.
- Where the scheduled job is switched on, the system also pulls new data by itself at 08:00, 16:00 and 24:00 (Jakarta) while the document is Evaluation In Progress and today is inside the Monitoring Window; each run re-checks the last 2 days.
- If you have unsaved edits it will not reload over them: Save first, then press Refresh.If it refuses
“Fill in Min & Max in the Standard Spec first for parameter: …” · “Pull or fill in the Standard Spec before generating Actual data.” · “A generate/pull process is still running for this document. Wait for it to finish, then try again.”
Read more: Actual Data

#### 4 · Type the readings (or use Excel)
Type the machine reading in the Actual column of each generated row. Prefer a spreadsheet? Use Excel Template (blank rows to add) or Download Data (existing rows to fill) and then Upload Excel.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens as you type
- A reading outside Min–Max turns the row red immediately, with a warning triangle.
- A yellow bar “n unsaved Actual change(s) — click Save.” counts your edits, new rows and deletions. If you leave the page the browser warns “Actual changes have not been saved.”
- Blank row adds a row to “New rows [not saved yet]”: choose a Parameter first (rows without a Parameter are not saved and keep Submit blocked), then Machine and Line, then the Actual.
- The red trash strikes the row through with Undo delete; the deletion is final only after Save.Excel upload
- Upload Excel opens a preview: rows read, ready, updates, new rows and rows with problems (red, with the reason). If any row has a problem the whole upload is blocked — fix the file and upload again.
- Add to Table only puts the rows on screen. Press Save to store them. Maximum 100 rows with data per file; use a dot as the decimal separator.
Read more: Actual Data

#### 5 · Read the chart and find the OOS
Tick one parameter on the left to get its statistics and run chart. A red banner offers Jump to first OOS.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens
- The page scrolls to the first bad reading and makes it flash.
- Limits are inclusive: a reading exactly equal to Min or Max is OK. Only strictly lower or higher is OOS. The system compares the exact number you typed, not the 2-decimal number shown.
- The banner suffix “no issue logged yet” means the whole stage has no issue; it disappears after the first issue.
- Statistics: Avg, Std Dev (÷ n), Cpk (red below 1), Target, Spec, “OOS n / total”. “–” = cannot be calculated.
- Two or more parameters ticked → one combined chart (0% = Min, 100% = Max) without statistics.
Read more: Step 2 · Evaluation screen

#### 6 · Fill the Issue Log
Every OOS parameter needs a complete issue: Category, Status, Issue Detail and Follow-up (plus a Cause for every Impact you tick; Close Remarks for Close With Notification). Press Add issue, or use the shortcuts: the red triangle on an OOS row, or All OOS → Issue Log.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe issue form opens
- The form’s Save writes the whole Issue Log immediately (with the evidence files). Cancel closes without saving.
- The top part is “PIC Reviewer” (yours); the bottom “Reviewer PSD” part is read-only for you — PSD fills it during review.
- Evidence is optional: images, PDF, Word or Excel, 5 MB combined. Click a thumbnail later to open the evidence viewer.
- The red OOS chip on a card is re-checked at every save: it means the issue’s parameter currently has an out-of-spec reading.The shortcutsAll OOS parameters already have an issue.
- Triangle on an OOS row: adds a pre-filled issue (“… is out of spec (OOS) …”, status Need Follow Up), saves it and scrolls to the log. Complete the cause and follow-up afterwards.
- All OOS → Issue Log: one issue per OOS parameter that has none. “There are no OOS rows in the Actual Data at the moment.” if nothing is OOS.The panel header
- “3 total · 2 not yet Closed”: the red number counts issues that are Need Follow Up or In Progress. Closed and Close With Notification both count as finished.
- The panel glows while any issue is open, or while the stage has OOS readings and not one issue. The real check is at Submit.
Read more: Issue Log & Evidence

#### 7 · Save your work
Nothing is stored until you press Save. It is only a draft: the stage stays open and nobody is emailed. A yellow bar counts your unsaved changes.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Save all changes in stage Process Performance?Yes, do it!Cancel2 · While it saves
A blocking message shows the progress, in this order: Standard Spec → Actual Data changes → Issue Log.Saving Process Performance… (1/3)3 · DoneAll stage changes saved.
- The stage reloads and History gets a new entry.
- The stage is still open: Save is only a draft. Nobody is emailed.
- Nothing was checked except sanity (Max ≥ Min, Target between Min and Max).If it goes wrong
- “n row(s) you edited no longer exist … Please reload the page and redo your changes.” — a row was regenerated meanwhile.
- “Name is editing this stage; your changes cannot be saved.” — somebody else holds the edit lock.
Read more: Save vs Submit

#### 8 · Submit Stage
When the stage is finished press Submit Stage. It needs at least 3 filled Actual rows and a complete issue for every OOS parameter.Click the orange outlined item above — or here — to see what happensWhat happens when you click itIf something is missing

**Error!**First complete the Issue Log for the following OOS parameters (Category, Issue Detail, Follow-up, plus Cause if an Impact is ticked and Close Remarks for Close With Notification): MoistureOK
or “At least 3 filled Actual rows are required before submitting (currently 2).”
- Order of the checks (the first problem stops it): nobody else holds the lock → no unsaved Analysis No. (Validation) → no unsaved Actual changes → Standard Spec complete (Process) → every OOS parameter has a complete issue → (server) at least 3 filled Actual rows.If everything is fine · 1 · Confirmation!

**Are you sure?**Submit stage Process Performance? It cannot be changed after submission.Yes, do it!CancelIf everything is fine · 2 · Done

**Good job!**Stage submitted.OK
- The stage card shows 🔒 Locked · submitted and the whole stage becomes read-only.
- Only PSD can reopen it later, by returning it.
- When this was the last open stage (all four submitted) the document becomes Pending PSD Review and the Reviewer PSD gets an “Awaiting PSD Review” email.
Read more: Submit Stage checklist · Returned documents 
#### 1 · Open your stage
Open the document from the email link or the Tasklist (IN PROGRESS / RETURNED). It lands on the first stage where you are the PIC. Click your stage card: the card with the green outline is the one shown below.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe stage loads
- A skeleton shows for a moment, then the workspace: filters and statistics on the left, chart and reading table, then Input & Log (Standard Spec, Actual Data, Issue Log).
- You get the edit lock: only one person edits a stage at a time. If somebody else already has it you see a yellow ribbon and everything is read-only.How to read the stage card
| On the card | Means | 
| not started | No Standard Spec and no issue yet. | 
| clean | A Standard Spec exists but no issue has been logged. It does not mean there is no OOS: if “n OOS” in red is shown beside it, the stage still needs an Issue Log before it can be submitted. | 
| ⚠ n open | n issues are still Need Follow Up or In Progress. | 
| n issue · closed | All its issues are Closed or Close With Notification. | 
| round icon | Green tick = submitted; red alert = at least one issue open; grey dotted = everything else. | 
| n data · n OOS | Number of readings in the stage and how many are out of spec (ignores the filters). | 
Read more: Step 2 · Evaluation screen · Editing & edit lock

#### 2 · Select & Generate the Standard Spec (Oracle)
There is no master here: the spec comes from Oracle. Press Select & Generate Spec (Oracle). Inline specs are the ones whose name starts with “SI-”.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · The “Select Spec (Oracle)” window opens
- Choose one spec (name, version, number of tests). A new version is a different spec. If you press the button with nothing chosen: “Select a spec first.”
- No spec at all? “No Oracle Inline spec (prefix “SI-”) spec exists for this item.” — the item may have none, or the plant’s specs are not in Oracle.2 · Confirmation!

**Are you sure?**Generate Standard Spec from SI-ABC Inline Spec (v3)? After this the spec selection is locked.Yes, do it!Cancel3 · The spec appears
- All tests of that spec become Standard Spec rows. A summary lists any test that was skipped (no Oracle test id) or whose Oracle master is incomplete.
- The grid is read-only. Types: N numeric (Min/Max/Target), V value (an expected text), T scale (position = letter). A dash “—” means that column does not apply to the type.
- Once a spec exists the Select button is disabled. Delete Spec lets you choose another one — but only until analysis results have been pulled; after that the spec is locked (contact IT support).
Read more: Standard Spec

#### 3 · Generate the Actual Data from Oracle
Press Generate from Evaluation Data (Oracle). The rows arrive with the real lab results; you cannot type or edit them.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Generate rows from Oracle evaluation / sample results data (entire Monitoring Window)?Yes, do it!Cancel2 · It runs in the backgroundGenerate is being processed in the background. Reloading shortly…Generate completed, reloading data…
- A row appears only for tests that already have a result in Oracle and that exist in the selected spec. A missing row usually means “not evaluated in Oracle yet” — try again later.
- Where the scheduled job is switched on, the automatic pull (08:00, 16:00, 24:00 Jakarta) fills new results while the document is Evaluation In Progress.
- Empty means Oracle has no result yet. There is no Excel and no Blank row on this stage.If it refuses
“No Standard Spec exists yet. Click “Select & Generate Spec (Oracle)” before generating Actual data.” · “No Oracle lot exists within the Monitoring Window.”
Read more: Actual Data

#### 4 · How OOS is decided
The system judges each reading against the spec for you; you only read the result.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe rules
- N (numeric): OOS when below Min or above Max (inclusive limits). A spec with only Min or only Max checks that side only.
- V (value): the result must equal the expected text (capital letters do not matter); anything else is OOS.
- T (scale): compared by position on the scale. Example: 1 = A, 2 = B, 3 = C, spec Min 1 Max 2 → B is OK, C is OOS, a letter not on the scale is OOS.
- An empty result is never OOS. The red row has a warning triangle that creates a pre-filled issue.
Read more: Step 2 · Evaluation screen

#### 5 · Chart, statistics and OOS
Tick a parameter on the left: statistics, run chart (text results show as a status strip) and the red Jump to first OOS.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- The chart’s x-axis is the order of the readings (oldest left), evenly spaced: “Sample 7” means the 7th reading.
- For text results each dot is one reading with its text underneath (only when 12 or fewer).
- The reading table below rounds Actual to 2 decimals; OOS uses the exact value.
Read more: Step 2 · Evaluation screen

#### 6 · Fill the Issue Log
Every OOS parameter needs a complete issue: Category, Status, Issue Detail and Follow-up (plus a Cause for every Impact you tick; Close Remarks for Close With Notification). Press Add issue, or use the shortcuts: the red triangle on an OOS row, or All OOS → Issue Log.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe issue form opens
- The form’s Save writes the whole Issue Log immediately (with the evidence files). Cancel closes without saving.
- The top part is “PIC Reviewer” (yours); the bottom “Reviewer PSD” part is read-only for you — PSD fills it during review.
- Evidence is optional: images, PDF, Word or Excel, 5 MB combined. Click a thumbnail later to open the evidence viewer.
- The red OOS chip on a card is re-checked at every save: it means the issue’s parameter currently has an out-of-spec reading.The shortcutsAll OOS parameters already have an issue.
- Triangle on an OOS row: adds a pre-filled issue (“… is out of spec (OOS) …”, status Need Follow Up), saves it and scrolls to the log. Complete the cause and follow-up afterwards.
- All OOS → Issue Log: one issue per OOS parameter that has none. “There are no OOS rows in the Actual Data at the moment.” if nothing is OOS.The panel header
- “3 total · 2 not yet Closed”: the red number counts issues that are Need Follow Up or In Progress. Closed and Close With Notification both count as finished.
- The panel glows while any issue is open, or while the stage has OOS readings and not one issue. The real check is at Submit.
Read more: Issue Log & Evidence

#### 7 · Save your work
Nothing is stored until you press Save. It is only a draft: the stage stays open and nobody is emailed. A yellow bar counts your unsaved changes.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Save all changes in stage Spec Inline Process?Yes, do it!Cancel2 · While it saves
A blocking message shows the progress, in this order: Standard Spec → Actual Data changes → Issue Log.Saving Spec Inline Process… (1/3)3 · DoneAll stage changes saved.
- The stage reloads and History gets a new entry.
- The stage is still open: Save is only a draft. Nobody is emailed.
- Nothing was checked except sanity (Max ≥ Min, Target between Min and Max).If it goes wrong
- “n row(s) you edited no longer exist … Please reload the page and redo your changes.” — a row was regenerated meanwhile.
- “Name is editing this stage; your changes cannot be saved.” — somebody else holds the edit lock.
Read more: Save vs Submit

#### 8 · Submit Stage
When the stage is finished press Submit Stage. It needs at least 3 filled Actual rows and a complete issue for every OOS parameter.Click the orange outlined item above — or here — to see what happensWhat happens when you click itIf something is missing

**Error!**First complete the Issue Log for the following OOS parameters (Category, Issue Detail, Follow-up, plus Cause if an Impact is ticked and Close Remarks for Close With Notification): MoistureOK
or “At least 3 filled Actual rows are required before submitting (currently 2).”
- Order of the checks (the first problem stops it): nobody else holds the lock → no unsaved Analysis No. (Validation) → no unsaved Actual changes → every OOS parameter has a complete issue → (server) at least 3 filled Actual rows.If everything is fine · 1 · Confirmation!

**Are you sure?**Submit stage Spec Inline Process? It cannot be changed after submission.Yes, do it!CancelIf everything is fine · 2 · Done

**Good job!**Stage submitted.OK
- The stage card shows 🔒 Locked · submitted and the whole stage becomes read-only.
- Only PSD can reopen it later, by returning it.
- When this was the last open stage (all four submitted) the document becomes Pending PSD Review and the Reviewer PSD gets an “Awaiting PSD Review” email.
Read more: Submit Stage checklist · Returned documents 
#### 1 · Open your stage
Open the document from the email link or the Tasklist (IN PROGRESS / RETURNED). It lands on the first stage where you are the PIC. Click your stage card: the card with the green outline is the one shown below.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe stage loads
- A skeleton shows for a moment, then the workspace: filters and statistics on the left, chart and reading table, then Input & Log (Standard Spec, Actual Data, Issue Log).
- You get the edit lock: only one person edits a stage at a time. If somebody else already has it you see a yellow ribbon and everything is read-only.How to read the stage card
| On the card | Means | 
| not started | No Standard Spec and no issue yet. | 
| clean | A Standard Spec exists but no issue has been logged. It does not mean there is no OOS: if “n OOS” in red is shown beside it, the stage still needs an Issue Log before it can be submitted. | 
| ⚠ n open | n issues are still Need Follow Up or In Progress. | 
| n issue · closed | All its issues are Closed or Close With Notification. | 
| round icon | Green tick = submitted; red alert = at least one issue open; grey dotted = everything else. | 
| n data · n OOS | Number of readings in the stage and how many are out of spec (ignores the filters). | 
Read more: Step 2 · Evaluation screen · Editing & edit lock

#### 2 · Select & Generate the Standard Spec (Oracle)
There is no master here: the spec comes from Oracle. Press Select & Generate Spec (Oracle). FG specs are every spec whose name does not start with “SI-”.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · The “Select Spec (Oracle)” window opens
- Choose one spec (name, version, number of tests). A new version is a different spec. If you press the button with nothing chosen: “Select a spec first.”
- No spec at all? “No Oracle FG spec spec exists for this item.” — the item may have none, or the plant’s specs are not in Oracle.2 · Confirmation!

**Are you sure?**Generate Standard Spec from FG-ABC Spec (v2)? After this the spec selection is locked.Yes, do it!Cancel3 · The spec appears
- All tests of that spec become Standard Spec rows. A summary lists any test that was skipped (no Oracle test id) or whose Oracle master is incomplete.
- The grid is read-only. Types: N numeric (Min/Max/Target), V value (an expected text), T scale (position = letter). A dash “—” means that column does not apply to the type.
- Once a spec exists the Select button is disabled. Delete Spec lets you choose another one — but only until analysis results have been pulled; after that the spec is locked (contact IT support).
Read more: Standard Spec

#### 3 · Generate the Actual Data from Oracle
Press Generate from Evaluation Data (Oracle). The rows arrive with the real lab results; you cannot type or edit them.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Generate rows from Oracle evaluation / sample results data (entire Monitoring Window)?Yes, do it!Cancel2 · It runs in the backgroundGenerate is being processed in the background. Reloading shortly…Generate completed, reloading data…
- A row appears only for tests that already have a result in Oracle and that exist in the selected spec. A missing row usually means “not evaluated in Oracle yet” — try again later.
- Where the scheduled job is switched on, the automatic pull (08:00, 16:00, 24:00 Jakarta) fills new results while the document is Evaluation In Progress.
- Empty means Oracle has no result yet. There is no Excel and no Blank row on this stage.If it refuses
“No Standard Spec exists yet. Click “Select & Generate Spec (Oracle)” before generating Actual data.” · “No Oracle lot exists within the Monitoring Window.”
Read more: Actual Data

#### 4 · How OOS is decided
The system judges each reading against the spec for you; you only read the result.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe rules
- N (numeric): OOS when below Min or above Max (inclusive limits). A spec with only Min or only Max checks that side only.
- V (value): the result must equal the expected text (capital letters do not matter); anything else is OOS.
- T (scale): compared by position on the scale. Example: 1 = A, 2 = B, 3 = C, spec Min 1 Max 2 → B is OK, C is OOS, a letter not on the scale is OOS.
- An empty result is never OOS. The red row has a warning triangle that creates a pre-filled issue.
Read more: Step 2 · Evaluation screen

#### 5 · Chart, statistics and OOS
Tick a parameter on the left: statistics, run chart (text results show as a status strip) and the red Jump to first OOS.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- The chart’s x-axis is the order of the readings (oldest left), evenly spaced: “Sample 7” means the 7th reading.
- For text results each dot is one reading with its text underneath (only when 12 or fewer).
- The reading table below rounds Actual to 2 decimals; OOS uses the exact value.
Read more: Step 2 · Evaluation screen

#### 6 · Fill the Issue Log
Every OOS parameter needs a complete issue: Category, Status, Issue Detail and Follow-up (plus a Cause for every Impact you tick; Close Remarks for Close With Notification). Press Add issue, or use the shortcuts: the red triangle on an OOS row, or All OOS → Issue Log.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe issue form opens
- The form’s Save writes the whole Issue Log immediately (with the evidence files). Cancel closes without saving.
- The top part is “PIC Reviewer” (yours); the bottom “Reviewer PSD” part is read-only for you — PSD fills it during review.
- Evidence is optional: images, PDF, Word or Excel, 5 MB combined. Click a thumbnail later to open the evidence viewer.
- The red OOS chip on a card is re-checked at every save: it means the issue’s parameter currently has an out-of-spec reading.The shortcutsAll OOS parameters already have an issue.
- Triangle on an OOS row: adds a pre-filled issue (“… is out of spec (OOS) …”, status Need Follow Up), saves it and scrolls to the log. Complete the cause and follow-up afterwards.
- All OOS → Issue Log: one issue per OOS parameter that has none. “There are no OOS rows in the Actual Data at the moment.” if nothing is OOS.The panel header
- “3 total · 2 not yet Closed”: the red number counts issues that are Need Follow Up or In Progress. Closed and Close With Notification both count as finished.
- The panel glows while any issue is open, or while the stage has OOS readings and not one issue. The real check is at Submit.
Read more: Issue Log & Evidence

#### 7 · Save your work
Nothing is stored until you press Save. It is only a draft: the stage stays open and nobody is emailed. A yellow bar counts your unsaved changes.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Save all changes in stage Spec Finished Goods?Yes, do it!Cancel2 · While it saves
A blocking message shows the progress, in this order: Standard Spec → Actual Data changes → Issue Log.Saving Spec Finished Goods… (1/3)3 · DoneAll stage changes saved.
- The stage reloads and History gets a new entry.
- The stage is still open: Save is only a draft. Nobody is emailed.
- Nothing was checked except sanity (Max ≥ Min, Target between Min and Max).If it goes wrong
- “n row(s) you edited no longer exist … Please reload the page and redo your changes.” — a row was regenerated meanwhile.
- “Name is editing this stage; your changes cannot be saved.” — somebody else holds the edit lock.
Read more: Save vs Submit

#### 8 · Submit Stage
When the stage is finished press Submit Stage. It needs at least 3 filled Actual rows and a complete issue for every OOS parameter.Click the orange outlined item above — or here — to see what happensWhat happens when you click itIf something is missing

**Error!**First complete the Issue Log for the following OOS parameters (Category, Issue Detail, Follow-up, plus Cause if an Impact is ticked and Close Remarks for Close With Notification): MoistureOK
or “At least 3 filled Actual rows are required before submitting (currently 2).”
- Order of the checks (the first problem stops it): nobody else holds the lock → no unsaved Analysis No. (Validation) → no unsaved Actual changes → every OOS parameter has a complete issue → (server) at least 3 filled Actual rows.If everything is fine · 1 · Confirmation!

**Are you sure?**Submit stage Spec Finished Goods? It cannot be changed after submission.Yes, do it!CancelIf everything is fine · 2 · Done

**Good job!**Stage submitted.OK
- The stage card shows 🔒 Locked · submitted and the whole stage becomes read-only.
- Only PSD can reopen it later, by returning it.
- When this was the last open stage (all four submitted) the document becomes Pending PSD Review and the Reviewer PSD gets an “Awaiting PSD Review” email.
Read more: Submit Stage checklist · Returned documents 
#### 1 · Open the Validation stage
Validation has two PICs: QA (from QFS) and ProDev (from PDV); everyone in PDV and QFS can edit it. It has no Oracle pull of its own: it re-reads the FG stage.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you see
- The card shows both PICs as “QA / ProDev”. Its “n data” counts readings (rows × the Analysis Nos. you choose), not rows.
- If the FG stage has no spec yet: “No FG Standard Spec yet. Generate the spec in the FG tab first.”
Read more: Spec Validation stage

#### 2 · Product Formulation & Metadata
Fill Food Category, Target Energy, Serving Size + unit, Serving Suggestion and Label Claims. Or press Pull from i2ms to fill what i2ms already knows.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation (only if something is already filled)!

**Are you sure?**Existing entries will be overwritten with i2ms data (fields that are empty in i2ms are left unchanged). Continue?Yes, do it!Cancel2 · ResultData pulled from i2ms. Click Save to save it.
- It only fills the form — press Save afterwards. Target Energy is never touched: type it yourself (up to 100 characters, e.g. “430 kcal/100g”).
- Fields i2ms does not have are listed: “Not available in i2ms, fill in manually: …”. A document not linked to an i2ms project says so.
- Serving Size and Serving Suggestion must be positive numbers. The stars are enforced only at Submit.
Read more: Spec Validation stage

#### 3 · Choose the Analysis No.
Pick one or more samples (shown as “sample no — Lot — date”) from the FG results. The grid gets one Actual column per sample.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens
- If the grid is still empty, choosing the first one pulls the FG spec automatically. Pull from FG Spec rebuilds the rows on screen (nothing saved; your Label / Decision / Remark are kept): “FG spec pulled onto the screen. Click Save to save it.”
- Result is per row across all chosen samples: OOS if any chosen reading is out of spec (example: 4.2 and 5.4 with Max 5.0 → OOS), OK if there are readings and none is OOS, “—” if no chosen sample has a reading.
Until you press that Save, Label / Decision / Remark, Export Excel and Upload Excel are disabled.
Read more: Spec Validation stage

#### 4 · Label, Decision and Remark
For each row fill Label (max 200), Decision (drop-down) and Remark (max 1000). Spec columns and readings are read-only.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you get
- The Decision list is configured by the administrator (OK / Follow up 1 / Follow up 2). It is your own call per row and does not change the Result.
- Every row that has a Label needs a Decision before Submit (rows without a Label may stay undecided). “Not set” in the filter finds rows without one.
- Export Excel / Upload Excel: only Label, Decision and Remark are unlocked; do not add or delete rows or touch the hidden Key column. Upload asks “Apply Excel contents?” (up to 8 problems listed) → Apply or Cancel, then Save.
Read more: Spec Validation stage

#### 5 · Charts and Generate Issue Log
The left panel shows “Validation Analytics” with a bar chart per numeric parameter. Generate Issue Log creates one issue for every OOS parameter.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens
- One issue per OOS parameter among the saved Analysis Nos., skipping those that already have one. Issues created from OOS whose parameter is no longer OOS are removed after you confirm. Then the Issue Log is saved. (Needs a saved state and at least one Analysis No.)
- Charts: a bar per Analysis No.; green band = Min–Max, red dashed lines = Min / Max, green dashed = Target; an OOS bar has a red outline. 6 charts per page; text/scale parameters are listed in a note instead.
- Passed = rows with readings and no OOS; Failed = rows with at least one OOS reading; Total = rows currently shown.
Read more: Spec Validation stage

#### 6 · Save your work
Nothing is stored until you press Save. It is only a draft: the stage stays open and nobody is emailed. A yellow bar counts your unsaved changes.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Save all changes in stage Spec Validation?Yes, do it!Cancel2 · While it saves
A blocking message shows the progress, in this order: Standard Spec → Actual Data changes → Issue Log (Validation: Validation Spec and Product Formulation & Metadata → Issue Log).Saving Spec Validation… (1/3)3 · DoneAll stage changes saved.
- The stage reloads and History gets a new entry.
- The stage is still open: Save is only a draft. Nobody is emailed.
- Nothing was checked except sanity (Max ≥ Min, Target between Min and Max).If it goes wrong
- “n row(s) you edited no longer exist … Please reload the page and redo your changes.” — a row was regenerated meanwhile.
- “Name is editing this stage; your changes cannot be saved.” — somebody else holds the edit lock.
Read more: Save vs Submit

#### 7 · Submit Stage (Validation)
Validation has extra checks. Press Submit Stage.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe checks, in order
- No unsaved Analysis No. change: “The Analysis No. has changed and is not saved. Click Save before Submit.”
- At least 1 Analysis No. is selected.
- “Complete Product Formulation & Metadata and Save first: …”
- “Fill in the Decision for every row that has a Label first (n rows pending): …”
- At least 3 filled readings (rows × selected Analysis Nos.).
- Every OOS parameter has a complete issue.Then!

**Are you sure?**Submit stage Spec Validation? It cannot be changed after submission.Yes, do it!CancelDone

**Good job!**Stage submitted.OK
- The stage locks. Both Validation PICs’ Superiors sign separately later.
Read more: Spec Validation stage · Submit Stage checklist 
#### 1 · Open a document waiting for you
Click the PSD REVIEW card and open a document. The PSD Review panel appears at the top of the Evaluation step — only for the PSD department, only while the document is Pending PSD Review. Admin has no shortcut here.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you see
- Tiles: Total issue · From OOS · OK · NOT OK · Undecided. They update as you click; OK + NOT OK + Undecided always add up to Total issue.
- The thin bar shows how many issues you have decided (OK or NOT OK), not how many are OK. It reaches 100% when none is undecided — even if some are NOT OK.
- One section per stage with its PIC, issue count, OOS count (readings, not issues) and a Return to PIC switch.
Read more: PSD Review

#### 2 · Decide every issue
Read each issue card (detail, causes, follow-up, action plan, evidence) and press OK or NOT OK. Click the active one again to clear it. A PSD remark is optional.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens
- The card edge turns green (OK) or red (NOT OK); the tiles update.
- Marking an issue NOT OK automatically switches on “Return to PIC” for that stage, and it cannot be switched off while a NOT OK issue is in it.
- The line next to the buttons tells you why Approve is greyed: red = NOT OK issues exist, amber = some undecided, green = ready.
- The grey line on a card is the PIC who last edited the issue, not PSD.
Read more: PSD Review

#### 3 · Return to PIC
For a NOT OK: write the Remark for PIC (required), check the ticked stages and press Return to PIC.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Return the selected stage(s) to the PIC?Yes, do it!CancelIf it refuses
“Select the stage(s) to return.” · “Remark is required when returning.”2 · Result

**Good job!**Returned to PIC.OK
- Status becomes Returned / Revision. Only the returned stages reopen (not submitted, your remark shown in a yellow note); the others stay locked.
- The PICs of those stages get a “Stage Returned for Revision” email.
- One remark is sent to all returned stages. A stage with a NOT OK issue is always included.
Read more: Returned documents

#### 4 · Review again
When all four stages are submitted again the document comes back to you as Pending PSD Review.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat to know
- Your earlier OK / NOT OK conclusions are kept. An issue still marked NOT OK blocks approval until you change it to OK after checking the revision.
- One undecided or NOT OK issue anywhere blocks Approve — closed issues and general issues count too.
Read more: Returned documents

#### 5 · Approve → Management
When every issue is OK press Approve → Management. A document with no issues can be approved straight away.Click the orange outlined item above — or here — to see what happensWhat happens when you click it1 · Confirmation!

**Are you sure?**Approve the document to Management?Yes, do it!CancelIf it is blocked

**Error!**Approval blocked: all issues must have an OK conclusion. 1 NOT OK issue(s) (Process Performance). Return them to the PIC. 1 issue(s) have no conclusion yet.OK2 · Result

**Good job!**Approved to Management.OK
- Status becomes Pending Management Approval and the Approval step opens.
- Each Superior gets one “Awaiting Your Sign-off” email listing the slot(s) they hold. An optional remark is kept in History.
Read more: PSD Review · Approval & Sign-off

#### 6 · Or Reject (final)
Reject document ends the document for good. Only while Pending PSD Review, PSD department only, with a required Reason.Click the orange outlined item above — or here — to see what happensWhat happens when you click itResult!

**Reject document (final)?**Reason (required)RejectCancel

**Good job!**Document rejected.OK
- Status becomes Rejected — final and locked; nobody can reopen it.
- PICs, Reviewer PSD and PIC Project get an email with the reason. The reason is kept in History and the email (not shown on screen).
- Use Return to PIC instead if the work can still be corrected.
Read more: PSD Review 
#### 1 · Open the document
You get an “Awaiting Your Sign-off” email with a Sign Off button, or use the MANAGEMENT card. The document opens on the Approval step.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat you see
- A banner “Your turn: n slot(s) waiting for your signature” and a progress bar “signed / total sign-off”.
- You sign for the PIC(s) you supervise. If you supervise several PICs you hold several slots and sign each one separately. There is no signing order.
- Slot card colours: green border = signed, blue glow = your slot, dashed red = that PIC has no Superior set (the slot can never be signed).
Read more: Approval & Sign-off

#### 2 · Read before you sign
Above the slots, Items to approve shows each stage with its “% within spec” and PSD’s verdict. Findings & PSD decisions lists the issues.Click the orange outlined item above — or here — to see what happensWhat happens when you click itHow to read it
- % = (readings − OOS) ÷ readings. Green = nothing out of spec; amber = there were OOS readings but PSD OK’d every issue; red = some issue is not OK’d by PSD yet.
- Findings are listed with out-of-spec ones first. “PSD: —” means PSD has not decided. Here you see the short card; the full card with status, causes and evidence is in Full Detail after completion.
Read more: Approval & Sign-off

#### 3 · Sign now
Press Sign now on your slot, draw your signature with the mouse or your finger and press Save Signature.Click the orange outlined item above — or here — to see what happensWhat happens when you click itThe window opens
- Clear wipes the drawing; Cancel closes without signing. A blank box is refused: “Please draw your signature first.”After Save Signature

**Good job!**Sign-off saved.OK
- Your slot turns green with your name, the date and your signature. Under it a short fingerprint (SHA-256) of the stored image.
- When the last required slot is signed the system completes the document by itself — see step 5.If it refuses
“This slot can only be signed by name.” · “Sign-off is only allowed when the status is Pending Management Approval.” · “No SPV found for this slot. Make sure the stage PIC and their Superior are set in the user master.”
Read more: Approval & Sign-off

#### 4 · Or reject
Something wrong? Press Reject (return to PSD Review) and give a reason.Click the orange outlined item above — or here — to see what happensWhat happens when you click itResult!

**Reject approval?**Reason (required)RejectCancel

**Good job!**Returned to PSD Review.OK
- The document goes back to Pending PSD Review — not to the PICs. All signatures collected so far are cleared.
- The Reviewer PSD gets a “Sign-off Rejected” email with your reason. After PSD approves again, every Superior must sign again.
- In History this shows as “Rejected” too, but the document itself is not Rejected.
Read more: Approval & Sign-off · Document life cycle

#### 5 · Completion and Full Detail
When the last required slot is signed (6 slots; 5 on older documents with one Validation PIC) the document completes automatically.Click the orange outlined item above — or here — to see what happensWhat happens when you click itWhat happens
- Status becomes Completed (Handover); the document is locked for good. An integrity hash is stored and the i2ms Project Closure task is set to DONE.
- An “Evaluation Completed” email goes to all PICs, the Reviewer PSD and the PIC Project.
- Full Detail unlocks: PDF and Excel downloads. Key figures add up the four stage cards; because Validation re-reads FG results, a reading chosen in Validation is counted in both FG and Validation.
- In the PDF window pick the content, the Actual table mode (OOS only is fast) and up to 24 charts; “Generating PDF…” then downloads DocNo.pdf.
Read more: Completed & Full Detail 
Example All names and numbers in the pictures are made up. The pictures are copies of the real screen pieces with example data, so a position or a colour can differ slightly from your page.

## Overview

i-Clause is the Post-Launch Evaluation portal. After a product has passed First Production Approval (FPA), the team checks how it really performs in production, records any out-of-spec result, and gets the findings reviewed and signed off.
In short
- i-Clause checks how a product really performs after launch: record out-of-spec results, get them reviewed, get them signed.
- Four steps: Setup → Evaluation → Approval → Full Detail. Four evaluation stages run in parallel, one PIC each.
- Every out-of-spec (OOS) parameter needs an Issue Log entry before its stage can be submitted.
Show full detailsHide details

### The big picture

Document appears
from i2ms→
1 · Setup
item, PICs, window→
2 · Evaluation
4 stages in parallel→
PSD Review
OK / NOT OK per issue→
3 · Approval
Superiors sign→
4 · Full Detail
Completed · PDF / Excel

Inside a document you always see a stepper with four steps: Setup, Evaluation Monitoring, Approval and Full Detail. Steps that are not open yet are greyed out; they unlock as the document moves forward.

### The four evaluation stages

| Stage (as shown) | Short name | What is evaluated | Where the numbers come from | 

| Process Performance Review | Process | Machine readings during production, per batch / lot | Standard Spec from Master Process Parameter; the lots come from Oracle, the PIC types the readings | 

| Specification Inline Process Review | Inline | Inline (in-process) quality results | Spec and results both pulled from Oracle (read-only) | 

| Specification Finished Goods Review | FG | Finished-goods quality results | Spec and results both pulled from Oracle (read-only) | 

| Specification Validation Review | Validation | Validation of the final specification against FG readings, plus product metadata | Built from the FG stage; two PICs (QA and ProDev) | 

### Words you will see

All names, numbers and dates in the examples of this guide are made up, only to show how it works.

| Term | Meaning | Example | 

| i2ms | The project and task system of the company. i-Clause documents are created from its projects. | NPD project “Product A” has a task “First Production”. When that task is DONE, the project can become an i-Clause document. | 

| FPA | First Production Approval. The “Date of FPA” comes from i2ms and starts the evaluation. | FPA approved on 15 Sep 2026 → evaluation starts from 15 Sep 2026. | 

| Monitoring Window | The date range (Start – End) for which production and test data is pulled from Oracle. | 15 Sep 2026 – 15 Dec 2026 = every lot produced in these three months is evaluated. | 

| Oracle | The company’s production and laboratory system. i-Clause reads batches, lots and test results from it; it never writes to it. | The lots produced on 20 Sep and their moisture test results are read from Oracle. | 

| Standard Spec | The accepted limits per parameter: Min, Max and Target. Results are judged against it. | Moisture: Min 3.0, Max 5.0, Target 4.0 (%). | 

| Actual Data | The measured results (readings). | A moisture reading of 4.2 %. | 

| OOS | Out Of Spec — a reading outside the Standard Spec. Every OOS parameter needs an Issue Log entry before its stage can be submitted. | Max is 5.0 and the reading is 5.4 → OOS. A reading of 4.2 is fine. | 

| Issue Log | The record of problems: what happened, cause, follow-up, status, evidence. Reviewed by PSD. | “Moisture 5.4 % on lot L-001. Cause: dryer temperature was low. Follow-up: re-test the lot.” | 

| PIC | Person In Charge of a stage. | Budi is the PIC of the Process Performance Review stage. | 

| Reviewer PSD / PSD | The reviewing department. PSD decides OK / NOT OK on each issue. | Rina (PSD) marks Budi’s issue “OK” because the cause and follow-up are clear. | 

| SPV / Superior | The superior of a PIC, taken from the user master (the user list kept by the administrators: name, department, Superior). Signs the approval. | Budi reports to Sari, so Sari is Budi’s Superior and signs “SPV — Process Performance Review”. | 

| Analysis No. | A sample number from the FG results, used by the Validation stage. | Sample “S-0153 — Lot L-001 — 12 Oct 2026”. | 

| Grid | A table of rows on screen that you can filter, sort and page through. | The Tasklist is a grid of documents. | 

| Badge / chip | A small coloured label that shows a state. | The orange badge “Pending Setup” next to a document number. | 

| Drop-down / multi-select | A box where you pick from a list. A multi-select lets you pick more than one. | “Production Line” is a multi-select: you may pick LINE A and LINE B. | 

| Background process | Work the system does on its own while you keep using the page, like a download that runs in the browser. You are told when it is done. | Generate from Batch-Lot: you press it, carry on, and the new rows appear a few seconds later. | 

## Who can do what

What you see on screen depends on your role, your department and the document’s status. A button that is missing or greyed out almost always means “not your turn” or “not your role”.
In short
- Everybody with menu access can read every document.
- Only a stage’s PIC (or someone from the same department) edits it; PSD reviews; each PIC’s Superior signs.
- Admin is a role, not a shortcut. A missing button means “not your turn” or “not your role”.
Show full detailsHide details

| Who | Can | Cannot | 

| Anyone with access to the i-Clause menu | See the Tasklist and open any document to read it (all stages, charts, issues, history). | Change anything unless one of the rows below applies to them. | 

| PDV or PSD department | Run Sync i2ms; fill the Setup step (Save Draft, Submit Setup). | Change the Monitoring Window once Setup is submitted (only PSD and Admin can). | 

| Admin (role: Super User / Administrator / Admin IDC) | Sync i2ms, Setup, change the Monitoring Window, maintain Master Process Parameter, Force Unlock a stage. | Admin is a role, not a shortcut. Admin cannot edit stage data, cannot do the PSD review or reject, and cannot sign off — unless the person is also the assigned PIC / PSD / Superior. | 

| Stage PIC and anyone in the same department as a PIC of that stage | Edit that stage (Standard Spec, Actual Data, Issue Log, Save, Submit Stage) while it is open. The Validation stage is also open to everyone in the PDV and QFS departments. | Edit other stages, or a stage that is already submitted. | 

| PSD department (any PSD user — not only the named Reviewer PSD) | PSD Review (OK / NOT OK, Return to PIC, Approve → Management, Reject document); fill the PSD part of the Issue Log; change the Monitoring Window; Force Unlock; maintain Master Process Parameter. | — | 

| SPV / Superior of a PIC (or of the Reviewer PSD) | Sign the approval slot(s) that belong to them, or Reject (return to PSD Review) the approval. | Sign a slot that belongs to another Superior. | 

Tip If you cannot find a button, check three things: (1) the document’s status, (2) whether you are the PIC / PSD / Superior concerned, (3) whether someone else is editing the stage right now (see Editing & edit lock).
Example Rina works in PSD. She can run Sync i2ms, review issues and press Approve. But she cannot edit the Process stage — that belongs to Budi (its PIC) and his department colleagues — and she cannot sign the Process slot either, because only Budi’s Superior (Sari) can.

## Document life cycle

Every document is in exactly one status. The status decides who can act next. It is shown as a coloured badge in the Tasklist and next to the document number.
In short
- Main road: Pending Setup → Evaluation In Progress → Pending PSD Review → Pending Management Approval → Completed.
- PSD can Return stages to the PICs, or Reject the document (final). A Superior’s rejection goes back to PSD, not to the PICs.
- Completed and Rejected documents are locked for good.

Pending Setup
Evaluation In Progress
Pending PSD Review
Pending Management Approval
Completed (Handover)
Rejected
Returned / Revision

Submit Setupall 4 stages submittedPSD: Approve (all issues OK)all required slots signed
↓ PSD: Return to PIC &#160;&#160; ↑ all 4 stages submitted again
PSD: Reject document (final)
a Superior rejects (signatures cleared)
Submit Setup again: resets all 4 stages (avoid)

Show full detailsHide details

| Status | Meaning | Who acts | 

| Pending Setup | Document just created from i2ms. Item, PICs and window still to be filled. | PDV / PSD / Admin (Setup) | 

| Evaluation In Progress | The four stages run in parallel, one PIC each. | Stage PICs | 

| Pending PSD Review | All four stages are submitted. PSD reviews every issue. | PSD department | 

| Returned / Revision | PSD sent one or more stages back. Only those stages reopen. | PICs of the returned stages | 

| Pending Management Approval | PSD approved. Each Superior must sign their slot. | Superiors (SPV) | 

| Completed (Handover) | All slots signed. The document is locked for good; PDF becomes available. | — (read-only) | 

| Rejected | PSD ended the document (possible only while Pending PSD Review). Final and locked. | — (read-only) | 

### Every way a status can change

| From | What happens | Condition | To | 

| (new) | Document is created from i2ms (Sync i2ms or the automatic creation) | Project meets the eligibility rules | Pending Setup | 

| Pending Setup | Submit Setup | Every required Setup field is filled (otherwise nothing is saved and the missing items are listed) | Evaluation In Progress | 

| Evaluation In Progress | A PIC presses Submit Stage | It is the last stage that was still open, so all four stages are submitted | Pending PSD Review | 

| Pending PSD Review | PSD presses Return to PIC | At least one stage ticked and a remark written; a stage with a NOT OK issue is always included | Returned / Revision | 

| Returned / Revision | The PICs press Submit Stage again | All four stages are submitted again | Pending PSD Review | 

| Returned / Revision | Someone presses Submit Setup (not the normal way) | Setup is complete; all four stages are reset to “not submitted” | Evaluation In Progress | 

| Pending PSD Review | PSD presses Approve → Management | Every issue is marked OK (a document with no issues can be approved straight away) | Pending Management Approval | 

| Pending PSD Review | PSD presses Reject document | PSD department only; a reason is required; final | Rejected | 

| Pending Management Approval | A Superior presses Reject (return to PSD Review) | The person must be the Superior of a slot; a reason is required; all signatures are cleared | Pending PSD Review | 

| Pending Management Approval | The last required slot is signed | Every required slot has a signature (6 slots; 5 on older documents that have only one Validation PIC) | Completed (Handover) | 

No other change is possible: Completed and Rejected are final, and nobody can move a document back to Pending Setup.
Good to know If a Superior rejects during approval, the document does not go back to the PICs — it goes back to Pending PSD Review and all signatures collected so far are cleared. PSD then decides again.
Example One document, ICL-2026-00012, from start to finish:
- Sync i2ms creates it → Pending Setup.
- PDV fills Setup and presses Submit Setup → Evaluation In Progress.
- The four PICs submit their stages → Pending PSD Review.
- PSD marks one issue NOT OK and returns the Process stage → Returned / Revision.
- Budi fixes it and submits again → Pending PSD Review.
- PSD approves → Pending Management Approval.
- The last Superior signs → Completed.

## The Tasklist

The first screen of i-Clause. It lists all documents (everyone with menu access sees all of them) with status cards on top.
In short
- Documents come only from i2ms (Sync i2ms or the automatic creation). There is no “New document” button.
- Click a status card to filter the grid. Column filters need Enter.
- Click the Doc No (or Open) to open a document.
Show full detailsHide details

### Status cards

The eight cards at the top show how many documents are in each status. Click a card to filter the grid to that status; the active card shows a “Filtered” badge. Click TOTAL TASKLIST to see everything again. Card counts always cover all documents — they do not change when you type in a column filter.

#### What the cards look like — with example numbers

48TOTAL TASKLIST
Filtered6PENDING SETUP
14IN PROGRESS
5PSD REVIEW
3RETURNED
4MANAGEMENT
15COMPLETED
1REJECTED

How to read it 
- PENDING SETUP = 6 means 6 documents are waiting for someone to do Setup. The coloured card with the “Filtered” badge is the one that was clicked: the grid below now lists only those 6 documents.
- TOTAL TASKLIST = 48 is simply all the others added up (6 + 14 + 5 + 3 + 4 + 15 + 1).
- Click TOTAL TASKLIST again and the grid shows all 48.
- If you now type “Powder” in the Category filter box and press Enter, the grid shrinks further, but the card numbers stay 6 / 14 / 5 … — cards always count everything.

#### Which card should I look at?

| If you are… | Look at the card… | Because… | 

| In the Setup team (PDV / PSD / Admin) | PENDING SETUP | These documents wait for you to fill Setup. | 

| A stage PIC | IN PROGRESS and RETURNED | Your stage is being worked on, or PSD sent it back to you. | 

| PSD | PSD REVIEW | All four stages are in; the issues wait for your OK / NOT OK. | 

| A Superior (SPV) | MANAGEMENT | These documents wait for your signature. | 

| Anyone looking for a finished or ended document | COMPLETED / REJECTED | Locked documents; open them to read, export PDF / Excel (Completed only). | 

The table below lists each card and what it counts.

| Card | Shows documents that are… | 

| TOTAL TASKLIST | all of them | 

| PENDING SETUP | waiting for Setup | 

| IN PROGRESS | in Evaluation In Progress | 

| PSD REVIEW | waiting for PSD review | 

| RETURNED | sent back to PICs | 

| MANAGEMENT | waiting for Superior sign-off | 

| COMPLETED | completed | 

| REJECTED | rejected by PSD | 

### Buttons

| Button | Who sees it | What it does | 

| Refresh | Everyone | Reloads the card counts and the grid. It keeps your card filter and column filters. | 

| User Guide | Everyone | Opens this guide. The same button is in the header of every document. | 

| Sync i2ms | Admin role, PDV or PSD department only (other users do not see it) | Looks in i2ms for projects that are ready for evaluation and creates a new document for each (see below). The button shows “Sync…” while it runs. Result message: “n new document(s) created from i2ms.” or “No new eligible i2ms projects.” | 

| Open (green pencil) or the blue Doc No link | Everyone | Both do the same thing: open the document. There is one screen for everybody; what you may change depends on your role and the status. | 

### Filtering and sorting the grid

- Under the column titles there are filter boxes for Doc No, i2ms Project, Project Name, Item Code, Category, Variant, SKU and Plant. Type your text and press Enter — typing alone does not filter. The match is “contains”.

- Click a column title to sort. The default order is the newest Doc No first.

- Use the page-size selector (10 / 20 / 50 / 100 rows) above the grid.

- There is no “New document” button: documents only come from i2ms (Sync i2ms, or the automatic creation).

Example You want document ICL-2026-00012: click the filter box under Doc No, type 00012 and press Enter — only that row stays. To bring all rows back, empty the box and press Enter again. Typing “Powder” in Category and pressing Enter shows only Powder products. “Contains” means the text can be anywhere in the cell: 0001 also finds ICL-2026-00012.

### Columns

Doc No · i2ms Project · Project Name · Item Code · Category · Variant · SKU · Plant · Date of FPA · Status · Reviewer PSD · Updated (last change) · Action. Empty values show “-”.

### When does a project become a document?

Sync i2ms (and the scheduled automatic creation, where it is switched on) creates a document for a project only when all of these are true:

- The i2ms project type is NPD or REVIT.

- The FPA task is DONE with an Actual Date — “First Production” for NPD, “Production Readiness” for REVIT. Each variant/SKU needs its own FPA task DONE; a variant still waiting gets its document on a later Sync.

- The project has a “Project Closure” task that is not yet DONE (each variant/SKU is judged by its own Project Closure task).

One document is created per project × plant × variant/SKU. Pressing Sync again never duplicates a document that is still alive; if a document was Rejected, the next Sync creates a fresh one for the same project, plant and variant. The new document starts as Pending Setup with project data, FPA date, brand, a suggested category and the Reviewer PSD already filled in from i2ms. Numbering is ICL-YYYY-00001 (year + running number).
Example NPD project “Product A” is made in 2 plants with 3 variants/SKUs. Its FPA task is DONE and the Project Closure task is not. Sync i2ms creates up to 6 documents (2 plants × 3 variants, each with its own FPA task DONE), for example ICL-2026-00012 to ICL-2026-00017. Press Sync again tomorrow and nothing is created twice. If the project’s Project Closure task was already DONE, no document is created.
Note Sync also marks the project’s “Project Closure” task in i2ms as in progress, and it fills blank Brand / Sub Brand on existing documents. When a document is Completed, the same task is set to DONE in i2ms automatically.

### Reading the grid in detail
- Status is a pale label with a small icon. Returned and Rejected are both red: read the word or the icon (arrow = sent back, cross = final). Only the REJECTED card turns purple when it is selected.
- Plant is the manufacturer taken from i2ms (Setup calls the same value “Manufacturer”); the Plant filter searches it. Variant shows the name, or the short code when there is no name. SKU includes the unit, for example “123456 PCS”. Reviewer PSD is the PSD person chosen in Setup (the “PIC Project”).
- A “…” at the end of a Project Name or Variant means the text was shortened: hover to read all of it.
- Sorting: every column except Action sorts; click again to flip the order. Rows with equal values stay newest-first.
- Footer “Showing x to y of z entries (filtered from n total entries)”: the card and column filters hide the other rows. “No data available in table”: nothing matches the card plus your filters — empty the filter boxes (press Enter) and click TOTAL TASKLIST. “Processing…” shows while the list loads.

## Opening a document

Click Open or the Doc No. The list is replaced by the document screen. A document can also be opened straight from an email link.
In short
- The header has Back, the status and User Guide. Save Draft and Submit Setup show only during Setup.
- The stepper (Setup, Evaluation Monitoring, Approval, Full Detail) opens on the step that matches the status; later steps stay greyed.
- History shows the latest actions; View All opens the full timeline.
Show full detailsHide details

### The header bar

| Control | When it shows | What it does | 

| ← Back | Always | Asks “Unsaved changes will be lost. Are you sure you want to leave?” (it asks even if you changed nothing). If you confirm, it releases your edit lock, returns to the Tasklist and refreshes the counts. | 

| Doc No, status badge, “project no · project name” | Always | Information only. | 

| User Guide | Always | Opens this guide without leaving the document. | 

| Save Draft | Only while Pending Setup or Returned, and only for Admin / PDV / PSD | Saves the Setup form as it is — no required-field check, no email. See Step 1 · Setup. | 

| Submit Setup | Same as Save Draft | Validates the Setup form and starts the evaluation. See Step 1 · Setup. | 

Once the evaluation has started, Save Draft and Submit Setup disappear. From then on you work inside each stage (Step 2).

### The stepper

Four steps: Setup, Evaluation Monitoring, Approval, Full Detail. The document opens on the step that matches its status. Earlier steps stay clickable so you can look back; later steps are greyed until they apply. Full Detail opens only when the document is Completed. A Rejected document opens on step 3 (Approval), marked with a cross; Full Detail stays greyed. A one-line caption under the stepper tells you what is expected at the current status.
Example A document that is Pending PSD Review opens on step 2 (Evaluation Monitoring). Steps 3 (Approval) and 4 (Full Detail) are greyed out — they unlock later. You can still click step 1 (Setup) to look at what was filled.

### History

A collapsible History strip shows the 5 latest actions (who, when, what changed). Click its header to expand. View All (or clicking a card in the strip) opens the full timeline, which you can filter by department and by tab. Each entry shows the action, the person and department, the date and, for edits, “old → new” values.

Actions you will see: Document Created · Updated · Submit Setup · Submit Stage · PSD Return · PSD Approve · Sign Off · Completed · Rejected. (“Rejected” is also shown when a Superior rejects the approval — then the document goes back to Pending PSD Review and is not Rejected.) History is read-only. Changes to the PIC assignment are not recorded in History.
Example A History card reads: “Updated · 2 minutes ago · Item Code, Category · Budi (PDV)”. Open View All and you see the detail: “Category: Liquid → Powder”, with the date and the person.

### The stepper, circle by circle
| You see | Means | 
| Green tick | That step is done. | 
| Ringed number | Where the document is now (decided by its status). | 
| Underlined step name | The step on your screen. It can differ from the ringed one when you clicked back to look at an earlier step. | 
| Faded, not clickable | Not open yet. | 
| Red cross on Approval | The document was Rejected: it opens on step 3 with a cross, steps 1–3 stay clickable and Full Detail stays greyed. | 

### The sentence under the stepper
- “Reviewer” means the Reviewer PSD. “Superior PIC” means the Superior (SPV) of that stage’s PIC.
- When the document is Evaluation In Progress the sentence says Approval opens once all 4 stages are done. In fact the four stages go to PSD first: Approval (step 3) opens only after PSD presses Approve → Management.
- “Recap + print” and “PDF / Excel / PNG”: you read the summary on the Approval step; the printable PDF and the Excel are in Full Detail after the document is Completed. The PNG link is on the Evaluation chart, not on Full Detail.

### History in detail
- The number beside “History” counts only the cards shown (maximum 5), not all events: use View All for everything.
- One card = one save. Its line lists the first two fields that changed; “+3” means three more. Click a card for the old → new values and the exact time (the card itself shows “2 minutes ago”).
- For a stage, the right-hand side is a summary, not data: “+3 ~1 -0 rows” = 3 rows added, 1 edited, 0 removed; “6 parameters” = how many exist after the save; “Generate Actual Data: 12 rows from 4 batches”. A “-” on the left means there was nothing before.
- “Integrity hash” is the fingerprint stored when the document was completed.
- In the full timeline, “All Tabs” lists the four evaluation stages. Entries that belong to no stage (Setup edits, sign-offs) show only under All Tabs.
- Empty strip: “No history yet. It will appear after the document is saved.” “No history for this filter.” means the department / tab filter excludes everything: set both back to All.

## Step 1 · Setup

Done by Admin / PDV / PSD while the document is Pending Setup (or Returned). Everyone else sees the form read-only.
In short
- Done by Admin / PDV / PSD while the document is Pending Setup.
- Fill the Monitoring Window, Item Code, Category, Production Line, Reviewer PSD and a PIC for every stage.
- Save Draft keeps your work without checks. Submit Setup checks everything, starts the evaluation and emails the PICs.
Show full detailsHide details

### Fields

| Group | Field | Notes | 

| Project Description
read-only, from i2ms | i2ms Project, Doc No, Project Name, Project Type, Project Desc, Manufacturer, Variant, SKU, Brand, Sub Brand | Greyed out. Cannot be edited here. | 

| Date of FPA * | Comes from the i2ms FPA task. You cannot type it. If it is missing, Submit Setup fails. | 

| Monitoring Window | Start Date *, End Date * | The period for which batch/lot and test data is pulled from Oracle (agree it with Production). Start defaults to the Date of FPA. End cannot be earlier than Start. | 

| Item Configuration | Item Code * | Searchable list from Oracle. Type at least 3 characters and press Enter to search; pick the row you want. It needs the document’s manufacturer to be known. If the list stays empty, the system could not match this manufacturer in Oracle, or Oracle did not respond. Try again later or contact IT support. | 

| Item Description | Filled automatically from the Item Code. | 

| Category * | Product type (Powder, Liquid, Bar, …). Pre-filled from i2ms; you may change it. | 

| Production Line * | Multi-select of the lines of this manufacturer. The Process Standard Spec is generated only for the lines you select. | 

| PIC & Reviewers | Reviewer PSD * | Only PSD-department users are listed. Pre-filled from the i2ms Project Closure task. The “PIC Project” always mirrors the Reviewer PSD. | 

#### The PIC table

One row per stage with columns Evaluation Stage · Assigned PIC · Department · Superior · Submitted. Click a row’s picker to choose a person from the grid (Username · Full Name · Department · Superior). Department and Superior fill in by themselves. The Superior is the person who will later sign that stage’s approval slot — if a PIC has no Superior in the user master, the document can never be completed, so check it now. The Submitted column shows “Pending” or “Submitted” per stage.

- Process, Inline, FG: one PIC each.

- Specification Validation Review: two PICs — PIC 1 “QA” must be from the QFS department, PIC 2 “ProDev” must be from PDV, and they must be two different people.

Example — a completed Setup A filled Setup: Monitoring Window 15 Sep 2026 – 15 Dec 2026; Item Code: you type the first 3 characters of the code, press Enter, and click the right row in the result list; Category Powder; Production Line LINE A and LINE B (multi-select: tick both); Reviewer PSD Rina; Process PIC Budi (his Superior Sari appears automatically); Validation PIC 1 (QA) from QFS and PIC 2 (ProDev) from PDV.

### Buttons

| Button | What happens | 

| Save Draft | Stores whatever is filled — Item Code, Category, Production Line, Monitoring dates, Reviewer PSD and the PICs. No required-field check, no email, status unchanged. A wrong department for a Validation PIC is refused (e.g. “The QA PIC of Specification Validation Review must be from the QFS department”). Success: “Draft saved successfully.” If somebody else saved the document after you opened it you get “The document was changed by someone else after you opened it. Please reload the page first.” | 

| Submit Setup | Asks “Submit the setup? The assigned PICs will be notified and the evaluation will start.” After you confirm it checks that nothing is missing. If something is, nothing is saved and it lists what is missing: “Complete the following before submitting: …” (Date of FPA, Monitoring Start/End Date, Item Code, Category, Production Line, Reviewer PSD, each stage PIC, and the two different Validation PICs). Fix them and press Submit Setup again (or use Save Draft to keep what you typed). When all is good: “Setup submitted successfully. The evaluation can now begin.” | 

Example Save Draft is like saving a Word document you are not finished with — you can come back and nothing is sent. Submit Setup is like pressing Send: the system checks everything, starts the evaluation and emails the PICs.

#### What Submit Setup triggers

- Status becomes Evaluation In Progress; all four stages start as “not submitted”.

- An “Evaluation Started” email goes to every assigned PIC.

- The Process Standard Spec is filled from Master Process Parameter for the manufacturer and the chosen lines (skipped quietly if there is no master configuration).

- If the Monitoring Start is today or earlier, the first data pull from Oracle starts in the background.

Careful The Submit Setup button is also visible when a document is Returned. Do not use it to resubmit after a return: it resets all four stages to “not submitted” and re-emails every PIC. PICs resubmit with Submit Stage (see Returned documents).

### Changing the Monitoring Window later

On the Evaluation step, a bar “Monitoring Window: From … To …” shows the dates. PSD department and Admin can edit them there and press Save Window (warnings: “Enter the Start and End Date first.” / “End Date must not be earlier than Start Date.”). Changing the window queues a new data pull. Everyone else sees the dates as plain text, and it is read-only once a document is Completed or Rejected.

### Smaller things on the Setup screen
- Click a section header (Project Description, Monitoring Window, Item Configuration, PIC & Reviewers) to fold or open it. Folding only hides the fields.
- Project Description mirrors i2ms. Project Type is NPD or REVIT. “— from i2ms —” means i2ms has no value for it; fix it in i2ms and press Sync again.
- Category is prefilled from i2ms. An unusual value may not be in the standard list; pick the right one if unsure.
- A Production Line shown as “LINE B (saved)” was chosen earlier but is no longer in the current list of the manufacturer’s lines. Keep it if it is still right, remove it if it should not be used.
- PIC Project is simply the Reviewer PSD: you choose one person and the system uses them for both (they get the project-level emails).
- In the PIC table a “—” under Department means no PIC is chosen yet. A “—” under Superior with a PIC chosen means that person has no Superior in the user master.
- After Submit Setup the fields are locked for everyone. A wrong Item Code or PIC can only be changed while the document is Returned. PSD and Admin can still change the Monitoring Window on the Evaluation step.

### Save Window, precisely
- Save Window saves only the two dates, but it does it through the Setup save, so the confirmation says “Draft saved successfully.” and the whole document reloads. Press Save on your stage first: unsaved Actual edits can be lost.
- If “The document was changed by someone else after you opened it. Please reload the page first.” appears, reload and try again.

## Step 2 · Evaluation screen

The workspace where the four stages are analysed. It has a stage selector, an analysis area (chart and table) and an “Input & Log” area where the PIC works.
In short
- Pick a stage card, narrow the data with the left filters, read the statistics and the chart.
- With one parameter ticked, a red banner and Jump to first OOS help you find bad readings.
- The PIC works below, in “Input & Log”: Standard Spec, Actual Data, Issue Log.
Show full detailsHide details

### Stage cards

Four cards: Process Performance, Spec Inline Process, Spec Finished Goods, Spec Validation. Each card shows the stage state, the PIC’s name, the number of data rows, the number of OOS and a flag about issues (“not started”, “clean”, “⚠ n open”, “n issue · closed”).

| State on the card | Meaning | 

| Spec not pulled yet | No Standard Spec in this stage yet. | 

| Under analysis | Work in progress. | 

| ⚠ Returned / Revision | PSD sent it back. A yellow note “Returned by PSD: …” shows the remark. | 

| 🔒 Locked · submitted | The PIC has submitted it. Read-only; only PSD can reopen it (by returning it). | 

#### What the flags and numbers on a card mean
| On the card | What it really means | 
| not started | No Standard Spec and no issue yet. | 
| clean | A Standard Spec exists but no issue has been logged. It does not mean “no OOS”: if a red “n OOS” is shown beside it, the stage still needs an Issue Log before it can be submitted. | 
| ⚠ n open | n issues are still Need Follow Up or In Progress (an issue without a status counts as open). General issues without a parameter count too. | 
| n issue · closed | The stage has issues and all of them are Closed or Close With Notification. | 
| Icon, top right | Green tick = submitted. Red alert circle = at least one issue is still open. Grey dotted circle = everything else (not started, being worked on, or returned): read the text under the stage name for the exact state. | 
| n data · n OOS | Number of readings (rows) in the whole stage, and how many are out of spec. Both ignore the filters. Rows still waiting for a reading count as data. On Spec Validation they count the readings of the chosen Analysis Nos. (rows × samples). | 
| Round badge and name | Initials of the PIC. Spec Validation shows both PICs as “QA / ProDev”. “—” means no PIC is assigned. | 
| Green outline | The stage shown in the workspace below. The four cards are the stage tabs. | Example Stage FG: Standard Spec pulled, 8 readings, one reading is OOS, nobody has opened the Issue Log. The card says 8 data · 1 OOS · clean. “clean” only says “no issue written yet”. The stage cannot be submitted until the OOS parameter has a complete issue.

Click a card to load that stage. When you open a document it lands on the first stage where you are the PIC. If you have unsaved changes, you are asked before switching.

### Left filter panel (Process / Inline / FG)

- Filter Batch (Process) or Filter Sample / Lot (Inline, FG): multi-select boxes — All Machines, All Lines, All BO, All Lots (Process) or All Sample No, All Lots (Inline/FG). Pick several; the filter applies when the drop-down closes and also drives the statistics, chart and table.

- Parameter list with All and Clear links. Tick the parameter(s) to show. A red “n OOS” tag marks parameters that have OOS readings. If a stage has more than 3 parameters none is pre-selected — tick one (or click All for a combined view).

- Statistics (when exactly one parameter is ticked): Avg, Std Dev, Cpk, Target, Spec (min–max) and OOS “n / total”. Cpk appears only when Min and Max are set and the spread is above zero; it turns red under 1.

Example — Cpk and filters Moisture limits are Min 3.0 and Max 5.0, the readings average 4.9 and the Std Dev (how spread out the readings are — small = close together) is 0.2. Cpk (how comfortably the process sits inside the limits) = the smaller of (5.0 − 4.9) ÷ (3 × 0.2) = 0.17 and (4.9 − 3.0) ÷ (3 × 0.2) = 3.17 → 0.17, shown in red. The average is almost touching the Max, so a process change is worth looking at even before any reading is OOS. Another example of the filter: tick Machine Mixer-01 and Lot L-001 and the statistics, chart and table show only that machine and that lot.

### Chart and reading table

- When exactly one parameter is ticked, a red banner appears if there is OOS: “n of N readings out of spec (x%)”, with Jump to first OOS to scroll to and flash the first bad row.

- Run chart: Min/Max as grey dashed lines, Target dark dashed, OOS dots larger and red. Hover a dot for machine / batch / sample / lot / line / actual. In the Process stage each machine has its own coloured line; click a machine chip in the legend to hide or show it. A PNG link in the chart header downloads the chart as an image.

- Text or scale results are shown as a status strip (one dot per reading, red when OOS). With 2+ parameters ticked you get one combined chart where 0% = Min and 100% = Max; parameters without a full Min/Max are listed but not plotted.

- Under the chart a read-only table lists the readings, OOS rows first and in red. Very large data sets are truncated to 20,000 readings with a warning — narrow it with the Batch/Lot filter.

### Below the analysis

The “Input & Log” area holds the Save / Submit Stage toolbar, the Standard Spec and Actual Data panels (click a panel header to open or close it; a panel stays as you left it while you remain on this page) and the Issue Log. These are explained in the next topics. The Issue Log panel pulses when there are open issues, or when there is OOS but no issue yet.

Refresh (the blue button at the top right of the Actual Data panel) reloads the stage; if you have unsaved Actual changes it first asks “There are unsaved Actual changes that will be lost. Continue reloading?”. It stays usable even when the stage is locked by someone else.

### Left panel and statistics
- The red “3 OOS” tag next to a parameter counts OOS readings under the current Machine / Line / Batch / Lot filter, so it changes when you filter. The stage card and the Actual Data panel title always count the whole stage.
- Statistics appear only with exactly one parameter ticked. Avg and Std Dev show 2 decimals; Std Dev is the population standard deviation (divided by n), so Cpk can differ slightly from a spreadsheet’s STDEV.S. The Target in this box is shown as a whole number; the exact limits are in the Standard Spec panel.
- “–” means it cannot be calculated: Spec needs both Min and Max; Avg, Std Dev and Cpk need numeric readings. “OOS x / n”: n counts numeric readings only.
- The red banner’s suffix “— no issue logged yet” means the whole stage has no issue at all. It disappears after the first issue, even if this parameter still has none: use the Issue Log’s parameter filter to check each OOS parameter.
- Tick one parameter for statistics + run chart; two or more switch to the combined chart (no statistics); Clear removes the chart (“Select a parameter to display the chart”).

### The chart in detail
- Header: the unit and how many readings are plotted (“· 20 batch” or “· 20 sample”). It is the number of readings, not of distinct batches.
- Horizontal axis = the order of the readings (oldest on the left), evenly spaced and not time-scaled. “Batch 7” means the 7th reading, not batch number 7.
- Min / Max are grey dashed lines, Target a dark dashed line, each with its value at the right edge. An OOS dot is red and larger; in Process it keeps a ring in its machine’s colour. The number in a machine chip = the readings of that machine; a faded, struck-through chip is hidden (click to show).
- For Value / Scale parameters each dot is one reading (blue OK, red OOS) with its text underneath, only when there are 12 readings or fewer.
- Combined chart: the shaded band is “inside spec” (0% = Min, 100% = Max); a dot outside it is red. The axis stretches for extreme readings. Each parameter is plotted along its own reading order, so the lines are not time-aligned; colours are per parameter.
- The reading table rounds Actual to 2 decimals (the Actual Data grid keeps up to 4); its Status pill is the system’s verdict for each reading.
- Empty chart messages: “Select a parameter to display the chart” = tick one; “Standard Spec not pulled yet” = create the spec first; “Not evaluated in Oracle yet; no analysis result for this parameter.” = no lab result yet, check later; “Stage locked …” = submitted and empty.

### Panel headers and Refresh
- “Standard Spec — 12 parameter” counts spec rows (parameter × machine × line): one parameter on two machines is 2. “Actual Data Entry — 250 rows · 3 OOS” counts all rows of the stage, not just the filtered or visible page.
- Refresh is inside the Actual Data panel, which is closed by default: open the panel (click its header) first. When a message says “Click Refresh”, this is the button.

## Editing & edit lock

A stage can be edited only by its PIC (or someone from the same department), only while the document is Evaluation In Progress or Returned, and only until the stage is submitted. And only one person at a time.
In short
- One person edits a stage at a time (the edit lock). Everybody else sees it read-only, with a ribbon naming the editor.
- The lock is released when you leave, or after 30 minutes without activity.
- PSD and Admin can Force Unlock.
Show full detailsHide details

### Why a stage may be read-only

| You see… | Reason | 

| “Stage has been submitted; read-only.” | The PIC already submitted it. | 

| “Read-only: only the PIC of this stage or a PIC from the same department can make changes.” | You are not one of the people allowed to edit this stage. Admin is not exempt. | 

| Yellow ribbon “Name is editing this stage. You are in read-only mode.” | Someone else holds the edit lock right now. (A person who could not edit this stage anyway sees the ribbon without the “read-only mode” sentence.) | 

### The edit lock

- The first allowed person to open a stage tab gets the lock. Everybody else sees the ribbon above; all their inputs and buttons are disabled except the Refresh button of the Actual Data panel.

- The lock is released when you leave the stage, press Back, close the tab or the browser. If a browser crashes, the lock frees itself within seconds.

- After 30 minutes of no activity (no mouse, keyboard, click or scroll) you lose the lock: “The lock on this stage was released because you were inactive for 30 minutes. Click Refresh to edit again.”

- When the previous editor leaves, a waiting person gets the lock automatically and sees “The previous editor has left. You can now edit; loading the latest data…”.

- Saving or submitting while someone else holds the lock is blocked. Save says “Name is editing this stage; your changes cannot be saved.”; Submit says “Name is editing this stage; you cannot submit.” (The server also refuses with “This stage is currently being edited by Name. Your changes were not saved; please wait until they have finished.”)

- The Setup step has no lock. Instead, Save Draft refuses if somebody saved after you opened the document.

Example Budi opens the Process stage and gets the lock. A minute later his colleague Sari (same department) opens Process: she sees the ribbon “Budi is editing this stage. You are in read-only mode.” and can only press Refresh. Budi clicks Back; Sari sees “The previous editor has left. You can now edit; loading the latest data…” and can edit. If Budi went to lunch with the page open, after 30 minutes without any mouse or keyboard activity the lock is released automatically.

#### Force Unlock

A Force Unlock link appears in the ribbon for PSD department users and Admin only. It asks “Force unlock this stage?” (“Only PSD can do this. The current editor will lose the lock and any unsaved changes cannot be saved.”), then Yes, Force Unlock. Afterwards: “Lock released. Reload the stage to edit.”

### Which message you get
- Save blocked by someone else’s lock: “Name is editing this stage; your changes cannot be saved.” Submit: “Name is editing this stage; you cannot submit.” As a last line of defence the server says “This stage is currently being edited by Name. Your changes were not saved; please wait until they have finished.”
- An eligible editor who is waiting for the lock sees the ribbon with “You are in read-only mode.”; someone who could not edit this stage anyway sees only “Name is editing this stage.”
- Edit rights are also checked on the server: a stage can only be edited while the document is Evaluation In Progress or Returned, and only until the stage is submitted.

## Standard Spec

The limits against which results are judged. The way you get it differs by stage. (The Validation stage works differently — see Spec Validation stage.)
In short
- Process: rows come from Master Process Parameter; you type Min, Max, Target.
- Inline / FG: choose one spec from Oracle and Generate it. The grid is read-only.
- Delete Spec is possible only until analysis results have been pulled.
Show full detailsHide details

### Process stage — from Master Process Parameter

- The list of parameters (with UOM, machine, line, type) comes from the Master Process Parameter, only for the lines chosen in Setup. It is normally filled automatically when Setup is submitted. If the panel is empty, click Pull from Master Process Parameter. It is disabled once any row exists (delete the rows and Save first if you must re-pull).

- You only fill Min, Max and Target. Parameter, UOM, Machine and Line are fixed by the master.

- Numeric parameters need Min, Max and Target (digits and decimal point, up to 4 decimals).

- Value parameters need a Target (free text, or a drop-down when the master defines a value list).

- Other types (Scale, Text) need nothing.

A required box that is still empty is red.

- A row turns red when Max is smaller than Min or Target is outside Min–Max. Save will refuse it (“Max (x) must not be smaller than Min (y)” / “Target (t) must be between Min (a) and Max (b)”). Empty boxes are fine for a draft Save — they are only enforced at Submit.

- Trash on a row: “Delete this parameter row from the Standard Spec?” The row disappears on screen and is removed for real when you press Save.

- Changing the spec recalculates the OOS marks of the stage’s existing readings.

Example — Standard Spec rows 
| Parameter | Machine | Line | Type | Min | Max | Target | 
| Moisture (%) | Dryer-01 | LINE A | Numeric | 3.0 | 5.0 | 4.0 | 
| Colour | — | LINE A | Value | — | — | Cream | The PIC types 3.0 / 5.0 / 4.0 for Moisture (all three are required for a Numeric parameter) and Cream for Colour (a Value parameter only needs its Target). A reading of 5.4 is then OOS; Max 3.0 with Min 5.0 would turn the row red because Max is smaller than Min.

If the pull fails you may see: “Manufacturer is not set in Setup…”, “No Master Process Parameter exists for this manufacturer.” or “No Master Process Parameter exists for the selected Production Line(s)…”. Ask PSD to complete the master.

### Inline and FG stages — from Oracle

- Click Select & Generate Spec (Oracle). It fetches the specs registered in Oracle for the Item Code (Inline = names starting with “SI-”, FG = the others).

- In the “Select Spec (Oracle)” window choose one spec (name, version, number of tests) → Generate Standard Spec. If you chose nothing: “Select a spec first.” You are asked to confirm: “…After this the spec selection is locked.”

- All tests of that spec become Standard Spec rows. A summary lists any test that was skipped because it has no Oracle test id, or whose Oracle master data is incomplete (the screen may still word this as “parameter not found in RMPM”). If the list is long, tell IT support.

- The grid is read-only. Types: N (numeric, Min/Max/Target), V (value — an expected text, the “Target Value”) and T (scale — shown as “position = letter”, e.g. “1 = A”). A banner shows “Spec: name (vX)”.

- Once a spec exists, Select & Generate Spec is disabled.

- Delete Spec lets you choose another spec (“Delete the generated Standard Spec? All its rows will be deleted and you can select another spec.”). It is only available until analysis results have been pulled; after that the spec is locked (badge “Locked: analysis results have already been pulled”). If you really need a different spec after that, contact IT support.

Example — the three types N (numeric) — “Moisture, Min 3.0, Max 5.0, Target 4.0”. V (value) — “Colour, expected: Cream”; a reading of “Yellow” is OOS. T (scale) — a graded result, for example Taste A to E where each letter has a position (1 = A, 2 = B …); the spec says which positions are acceptable, and a letter that is not on the scale is OOS.

### Things worth knowing
- A dash “—” in the grid means the column does not apply to the type: Value (V) tests only have a Target Value; N and T tests have no Target Value. Process shows the type as “Numeric / Value”, Inline and FG as N / V / T.
- Process Value or Text parameters are judged in only one case: when the spec’s Min / Max and the reading you typed are both numbers (for example a Weight Check), the same Min–Max check applies. Qualitative text such as “Pass” / “Fail” is never flagged: if a bad value matters, log an issue by hand.
- Inline and FG specs from Oracle are listed with their version; a new version is a different spec. Inline = a name starting with “SI-” (capitals and leading spaces do not matter); FG = every other name. One spec (name + version) is generated at a time; a test without an Oracle test id is skipped and listed.
- Errors you may meet: “No Oracle Inline spec (prefix “SI-”) exists for this item.” · “No Oracle FG spec exists for this item.” · “Item Code is not set. Complete Setup before pulling the spec.” · “The Standard Spec has already been generated. Delete all its rows and Save before generating again.” · “This spec has no tests registered in Oracle, so there is nothing to save.” · “The spec cannot be deleted / changed because analysis results have already been pulled. Contact IT support…”
- Which spec row judges a reading: the row with the same parameter, machine and line; if there is none, the nearest row of that parameter. If a parameter has different limits per line, fill Machine and Line on both the spec row and the reading.

## Actual Data

The panel “Data Performance Evaluation — Actual Data Entry”. A standard spec must exist first, otherwise Generate says “No Standard Spec yet…”.
In short
- Process: Generate creates the rows and you type the machine readings (or use Excel). Inline / FG: rows arrive read-only from Oracle.
- A reading outside Min–Max turns red immediately (OOS).
- Nothing is stored until you press Save.
Show full detailsHide details

### How the data arrives

|  | Process | Inline / FG | 

| Generate button | Generate from Batch-Lot (Oracle) | Generate from Evaluation Data (Oracle) | 

| What it creates | One row per Standard Spec row (parameter, machine, line) for each lot made on that same line in the Monitoring Window; spec rows of another line are skipped. Each row shows machine, BO No, lot, production date and line. Actual is left empty — the PIC types the machine reading. | Rows with the real analysis results (sample no., lot, actual). Only tests that already have a result in Oracle appear. | 

| Can you type/edit? | Yes: the Actual column of generated rows; manually added rows are fully editable. | No. Read-only — taken straight from Oracle. Empty means Oracle has no result yet. | 

| Excel / Blank row | Yes | No | 

Generate runs in the background. After you confirm you see “Generate is being processed in the background. Reloading shortly…” and the stage reloads by itself after a few seconds. While a pull is running the Generate button is disabled and shows a spinner; when it finishes you get “Generate completed, reloading data…”. If you have unsaved changes, it will not reload over them — Save first, then press Refresh. Rows you delete are not recreated by the automatic pulls, but a manual Generate can bring them back. If nothing new is found, the job ends quietly.

Before generating, the Process stage needs Min and Max for every numeric parameter: “Fill in Min & Max in the Standard Spec first for parameter: …”. While a Generate or data pull is running for this stage (or an automatic pull for the document), Generate is disabled until it finishes. The system also pulls new Oracle data automatically, regularly, while the document is Evaluation In Progress and today is inside the Monitoring Window — so new rows may appear without you pressing Generate.

Example Monitoring Window 15 Sep – 15 Dec, and the Standard Spec has 2 rows (both on LINE A). Oracle reports 3 lots produced on LINE A in that period. Generate from Batch-Lot creates 6 rows (2 spec rows × 3 lots) with the Actual empty. Budi types the readings from the machine logs. Press Generate again later and only new lots add rows — nothing is duplicated. In Inline/FG the rows arrive already filled with the lab results; you only read them.

### Working in the grid

- The grid is paged (10 / 20 / 50 / 100 rows; “Rows x–y of N”). Use the filter row under the titles (applied after a short pause) and the left panel filters.

- Process columns: Parameter · Machine · BO No · Lot No · Production Date · Line · Actual. Inline/FG: Parameter · UOM · Sample No. · Lot No · Actual.

- A numeric reading outside Min–Max turns the row red immediately. Value-list parameters use a drop-down.

- A yellow bar “n unsaved Actual change(s) — click Save.” counts your pending edits, new rows and deletions. Nothing is stored until you press Save. If you leave the page with unsaved edits the browser warns “Actual changes have not been saved.”

### Toolbar buttons (PIC only)

| Button | Stage | What it does | 

| Generate from … | All three | Confirms “Generate rows from Oracle … (entire Monitoring Window)?” then starts the background pull. | 

| Excel Template | Process | Downloads a blank workbook (sheet “ActualData”) with 100 blank rows for each Standard Spec row (Parameter, Machine and Line already filled in), for adding rows. | 

| Download Data (fill in Actual) | Process | Downloads the existing rows (with a hidden “ActualId” — do not change it) so you can fill the Actual column and upload to update them. | 

| Upload Excel | Process | Choose an .xlsx. It is read and shown in the Excel Upload Preview (below). Max 100 rows with data per file. | 

| Blank row | Process | Adds an empty row to the “New rows [not saved yet]” table. Choose Parameter, then Machine and Line (limited to those in the Standard Spec), then the Actual. | 

| All OOS → Issue Log | Inline, FG, Process | Adds one issue for each OOS parameter that has none yet, then saves the Issue Log. See Issue Log. | 

| Refresh | All | Reloads the stage (asks first if you have unsaved edits). | 

| Red warning triangle on an OOS row | All | Creates a pre-filled issue for that parameter and scrolls to the Issue Log (saved immediately). | 

| Red trash on a row | Process | “Delete this row?” In the main grid the row is struck through with an Undo delete button; the deletion is final only after Save. In the “New rows” table it deletes immediately. | 

#### Excel Upload Preview

- The window summarises: rows read, ready, updates to existing rows, new rows, and rows with problems. Problem rows are red with a reason: “not found”, Actual “x” is not a number, Machine “m” is not in the Standard Spec for this parameter, Line “l” is not in the Standard Spec….

- If any row has a problem, the whole upload is blocked: fix the file and upload it again. Add to Table is disabled until every row is good.

- Add to Table only puts the rows on screen (updates to existing rows, or new rows in the “New rows” table). A small message at the corner reports the counts. Press Save to store them.

- A file that is not a real .xlsx or exceeds 100 rows is rejected with a message.

Example You press Download Data, open the file in Excel, type the readings in the Actual column and save. You press Upload Excel: the preview says “20 rows read — 19 ready, 1 with problems. Delete or fix the red rows in the file, then upload again.” One row shows Actual “4,2x” in red (not a number). You fix that cell in Excel, upload again, then press Add to Table and finally Save. Nothing is stored before that last Save.

### How OOS is decided
| Type | Rule | 
| N numeric | OOS when below Min or above Max. The limits are inclusive: a reading exactly equal to Min or Max is OK. A spec with only Min or only Max checks that side only. | 
| V value (Inline / FG) | The result must equal the expected text (capital letters do not matter); anything else is OOS. A spec without an expected text is never OOS. | 
| T scale (Inline / FG) | Compared by position on the scale, not by letter, with inclusive limits. A letter that is not on the scale is OOS. | 
| Empty result | Never OOS. | Example Scale 1 = A, 2 = B, 3 = C and a spec with Min 1, Max 2: B is OK, C is OOS, “Z” (not on the scale) is OOS. Numeric: Max 5.0, reading 5.0 is OK, 5.01 is OOS.Good to know Screens round for display only: readings show 2 decimals in the table and the statistics, Target in the statistics box shows 0. OOS uses the exact stored number: a row showing 5.00 can still be red against Max 5.0 because the real value is 5.004.

### Where the rows come from
- The Monitoring Window decides what is fetched: for Process, the lots by production date; for Inline / FG, the samples by sample date. Lots outside the window are never fetched; a batch still in production does not appear.
- Process rows and lines: the line is matched by its “LINE A / B …” part, ignoring a plant prefix (“SHP_LINE A”, “LINE A” and “line a” match). If the lot or the spec row has no line at all, rows are still created — check them.
- Inline / FG rows appear only for tests that already have a result in Oracle and exist in the chosen spec. A missing row usually means “not evaluated in Oracle yet”; it appears on a later run.
- Automatic pull (where the scheduled job is switched on): at 08:00, 16:00 and 24:00 (Jakarta time), only for documents that are Evaluation In Progress with today inside the Monitoring Window. Each run re-checks the last 2 days. After the End Date nothing is fetched by itself: press Generate to pull the whole window. Saving the window or Submit Setup queues an immediate pull from Start to today. Validation is never pulled automatically.

### What counts as “data”
- The “n data” on a stage card and the Within spec % count every row, including generated rows still waiting for a reading. Percentage = (rows − OOS rows) ÷ rows. Until the PIC fills the rows the number looks better than it is.
- A row counts as filled for the 3-row minimum (rule BR-03) only when it has a reading; blank generated rows do not count. The rule applies per stage.

### More on the grid and Excel
- Blank row: choose a Parameter in every new row. A row without a Parameter is not saved, but it still counts in the yellow “unsaved” bar and keeps Submit blocked: delete it with the trash icon.
- Excel preview: the first column “Row” is the Excel row number. Update rows with an empty Actual are skipped; new rows with an empty Actual are still added and must be filled before Save.
- Footer “Rows 1–10 of 250” and “(filtered from N rows)” (column filters are active). After a background pull the stage may refresh once by itself when you open the panel, unless you have unsaved edits.
- Errors you may meet: “This file carries n rows with data; at most 100 rows can be uploaded at a time. Split it…” · “The file is not a valid Excel (.xlsx) file. Use a file from the Template Excel or Download Data button.” · “The file is too large (maximum 5 MB).” · in the Excel cells: “Actual must be a number (use a decimal point).”, “Pick one of the values in the dropdown.”, “Text only, at most 200 characters.” · “Select a Standard Spec before generating Actual data.” · “No Oracle lot exists within the Monitoring Window.”

## Issue Log & Evidence

The Issue Log records why a result is out of spec and what is being done. Every OOS parameter must have at least one complete issue before the stage can be submitted. The panel is always open at the bottom of each stage.
In short
- Every OOS parameter needs a complete issue (Category, Status, Issue Detail, Follow-up) before you can submit.
- Quick start: the triangle button on an OOS row, or All OOS → Issue Log.
- Evidence is optional: images, PDF, Word or Excel, 5 MB combined.
Show full detailsHide details

### The panel

- Header: “n total · n not yet Closed”. Once there is at least one issue, a filter bar appears: search box, All parameters, All categories, All statuses, Clear and an “x of y” count.

- Each issue is a card: status chip, category, parameter (“(general)” if none), evidence, issue detail, Impact chips (RM / PM / Process / FG), cause, close remarks, follow-up, action plan, last editor and date. Pencil = edit, trash = delete (shown only to people who can edit this stage: its PIC or a PIC from the same department).

- Add issue opens the issue form.

### The issue form (Add Issue / Edit Issue)

| Field | Required for an OOS issue? | Notes | 

| Parameter | Yes | Pick the parameter, or “(general / no parameter)”. A general issue does not satisfy an OOS parameter. | 

| Issue Category | Yes | From a fixed list. | 

| Status | Yes | Four cards: Need Follow Up (default), In Progress, Closed, Close With Notification. Close With Notification reveals Close Remarks (required). | 

| Issue Detail | Yes | What happened. | 

| Impact RM / PM / Process / FG | No | Tick the areas affected. Each ticked area makes its “Cause” box required. | 

| Follow-up | Yes | What is being done. | 

| Action Plan | No |  | 

| Evidence | No | Optional (since 12 Oct 2026). See below. | 

| PSD Conclusion / Remarks | — | The “Reviewer PSD” section is filled by PSD only; for a PIC it is read-only (“Only the PSD Reviewer can fill in this section”). It is set during PSD Review. | 

Each text box takes up to 3,000 characters (spaces are not counted); a warning appears when you get close to the limit. A yellow summary lists the required boxes still empty — you can still Save a draft. At Submit these boxes are checked only for issues linked to an OOS parameter; other issues (including general ones) are not checked. If the stage is not editable the form opens read-only with no Save button.
Two ways it is saved The form’s Save button writes the whole Issue Log of the stage at once and immediately (together with evidence). The OOS shortcuts (triangle button, All OOS → Issue Log) also save immediately. But deleting a card only removes it from the screen (“Delete this issue?” asks first); the deletion is stored the next time the Issue Log is saved — by the toolbar Save, but also by the form’s Save or an OOS shortcut.

#### What the four statuses mean

| Status | Meaning | Example | 

| Need Follow Up | Raised, waiting for someone to act (default). | OOS just found; nobody has looked yet. | 

| In Progress | Being handled. | The lot was sent for a re-test. | 

| Closed | Solved. | The re-test passed. | 

| Close With Notification | Fully resolved and verified, but the stakeholders must be informed for documentation or awareness; no corrective action. Close Remarks are required. | The deviation was verified and accepted; the line manager is told for the record. | 

Example — a complete issue An issue card: Parameter Moisture · Category Process · Status In Progress · Issue Detail “Moisture 5.4 % on lot L-001 (Max 5.0)” · Impact ticked: Process → Cause (Process) “Dryer temperature was 5 °C below set point” · Follow-up “Re-test the lot and recalibrate the dryer sensor” · Evidence: a photo of the dryer panel and the lab report (PDF). Because Impact Process is ticked, the Cause (Process) box had to be filled; Impact RM / PM / FG were not ticked, so their Cause boxes are not needed.

### Evidence files

- Attach several files at once. Allowed: images (jpg, jpeg, png, gif, webp), PDF, Word (doc, docx), Excel (xls, xlsx). The combined size must be 5 MB or less. Otherwise: “Total evidence file size must not exceed 5 MB…” and the selection is cleared.

- New files are previewed as “New files (not uploaded yet; Save first)”. Already saved files appear under “Saved evidence”, each with Open in new tab and a red Delete (takes effect on Save).

- Clicking a thumbnail or file chip anywhere (even read-only) opens the Evidence viewer: a file list on the left, a preview on the right (images zoom on click; PDF, Word, Excel and text are rendered), Previous / Next (or the ← → keys), Open in new tab and Download. Files that cannot be previewed offer Download file.

- If a file is missing on the server the viewer says “File not found on this server …”. This is normal when evidence was uploaded on another environment (for example DEV) and you are viewing it on a different one.

### Shortcuts from OOS

- Triangle button on an OOS row: adds a pre-filled issue (“… is out of spec (OOS) …”) with status Need Follow Up, saves it, and scrolls to the log. Complete the cause and follow-up afterwards.

- All OOS → Issue Log: one issue per OOS parameter that has none. Messages: “There are no OOS rows in the Actual Data at the moment.” / “All OOS parameters already have an issue.” Later OOS readings need to be added by hand.

### The chips on an issue card
| Chip | Meaning | 
| Need Follow Up | Red: raised, waiting for someone to act. | 
| In Progress | Orange: being handled. | 
| Closed | Green: fully resolved, effectiveness verified, no further action. | 
| Close With Notification | Yellow: fully resolved and verified, but the stakeholders must be informed for documentation or awareness; no corrective action. Always write the Close Remarks. | 
| OOS (red) | The issue is about a parameter that currently has an out-of-spec reading. It is re-checked at every save, so it does not matter how the issue was created, a hand-typed issue on an OOS parameter gets it too, and it goes away after the reading is corrected and saved. General issues (no parameter) never carry it. | 
| Impact chips | The areas ticked in the form (RM / PM / Process / FG). Each ticked area makes its Cause box mandatory; nothing else changes. | 

### Counts, glow and filters
- “n total · n not yet Closed”: the red number counts every issue that is not Closed and not Close With Notification (Need Follow Up, In Progress, or no status). Example: 5 issues — 2 In Progress, 1 Need Follow Up, 2 Close With Notification — reads “5 total · 3 not yet Closed”.
- The panel glows when at least one issue is not finished, or when the stage has OOS readings and not one issue at all (any issue, even a general one, switches that second reason off). It is only a hint; the real check is at Submit Stage.
- The search box looks through every text of the issue, including the causes, close remarks and PSD’s remarks. The drop-downs only offer values that exist. Filtering only hides cards; nothing is deleted.
- The issue form has two parts: “PIC Reviewer” (yours: Issue Detail down to Evidence) and “Reviewer PSD” (PSD Conclusion and Remarks, read-only for you).

### Evidence in detail
- A thumbnail with “+2” means three files are attached (the first image plus 2 more). With no image there is one chip per file (name cut at 22 characters, full name on hover). Every one opens the viewer.
- In the viewer “2 / 4” is the file you are on and the tag in the left list is the file type. Text files show only the first 200 KB (“…truncated, download for the full content”). If a PDF stays blank, use Open in new tab or Download.
- Server messages: “The total evidence file size must not exceed 5 MB.” · “File format ‘…’ is not supported. Use an image, PDF, Word or Excel file.”

## Save vs Submit

Two very different actions. Save is only a draft. Submit is the real hand-over and the only moment completeness is checked.
In short
- Save = draft. Almost no checks, the stage stays open.
- Submit Stage = hand-over. Every check runs and the stage locks.
Show full detailsHide details

|  | Save | Submit Stage | 

| Purpose | Keep your work | Tell PSD this stage is finished | 

| Checks | Only sanity: Max ≥ Min and Target within Min–Max (numeric spec rows). Also refused: a negative Serving Size / Serving Suggestion or a Target Energy over 100 characters (Validation), and removing an Oracle spec row after its results were pulled | Everything on the checklist | 

| Locks the stage? | No | Yes — read-only afterwards | 

| Sends email? | No | Only when it is the last stage | 

| Can leave fields empty? | Yes | No | 

Example Budi types 6 readings, presses Save (draft) and closes the page for lunch. Everything is still there when he returns. He may Save with half of the Standard Spec empty — nothing complains. Only when he presses Submit Stage does the system check that it is complete and, if it is, hands the stage over and locks it.

### What the toolbar Save does

- Asks “Save all changes in stage …?”.

- Shows “Saving … (1/n)” while it saves, in order: Standard Spec → Actual Data changes (Process only, if anything changed) → Issue Log. (Validation: Validation Spec and Product Formulation & Metadata → Issue Log.)

- Success: “All stage changes saved.” The stage reloads and History is updated.

If a row you edited no longer exists (for example it was regenerated), you get “n row(s) you edited no longer exist … Please reload the page and redo your changes.” If the lock was taken over you get “…is editing this stage; your changes cannot be saved.”

## Submit Stage checklist

Press Submit Stage (top right of the Input & Log area) when the stage is finished. Confirmation: “Submit stage …? It cannot be changed after submission.” The checks run in this order and the first failure stops it.
In short
- The checks run in a fixed order; the first failure stops the submit and tells you why.
- You need at least 3 filled Actual rows and a complete issue for every OOS parameter.
- When the last open stage is submitted, the document moves to PSD Review.
Show full detailsHide details

### Checks on your screen first

- Nobody else holds the lock (“…is editing this stage; you cannot submit.”).

- Validation stage: no unsaved Analysis No. change (“The Analysis No. has changed and is not saved. Click Save before Submit.”).

- No unsaved Actual changes (“There are unsaved Actual changes. Click Save before Submit.”).

- Process stage: the Standard Spec is complete (“Complete the Standard Spec first (Numeric needs Min, Max and Target; Value needs Target)…”).

- Every OOS parameter has a complete issue (“First complete the Issue Log for the following OOS parameters …”).

### Rules checked by the system

| Rule | Message you may see | 

| Document must be Evaluation In Progress or Returned; stage not yet submitted | “The stage can only be submitted while the evaluation is in progress.” / “This stage has already been submitted.” | 

| At least 3 filled Actual readings | “At least 3 filled Actual rows are required before submitting (currently n).” | 

| Every OOS parameter has a complete issue | “Complete the Issue Log for the following OOS parameters first …” | 

| Validation stage extras | See Spec Validation stage. | 

What is a “complete” issue? It has a Category, a Status, an Issue Detail and a Follow-up; a Close Remark if the status is “Close With Notification”; and a Cause for every Impact area that is ticked. It must be linked to the OOS parameter itself. Evidence and Action Plan are not required.

Example Budi has 2 readings, one of them OOS (Moisture), and presses Submit Stage. First the screen stops him: “First complete the Issue Log for the following OOS parameters (Category, Issue Detail, Follow-up, plus Cause if an Impact is ticked and Close Remarks for Close With Notification): Moisture” — the Moisture issue has no Follow-up yet. He fills it in and presses Submit again. Now the system says “At least 3 filled Actual rows are required before submitting (currently 2).” He adds a third reading, confirms “Submit stage …? It cannot be changed after submission.”, and the stage turns 🔒 Locked · submitted.

### What happens after Submit

- “Stage submitted.” The stage card shows 🔒 Locked · submitted and the stage becomes read-only.

- When the last open stage is submitted (so that all four are submitted) the document becomes Pending PSD Review and the Reviewer PSD gets an “Awaiting PSD Review” email.

- Normally a stage is reopened only when PSD returns it. (Submit Setup also resets all four stages — avoid it.)

### A few more details
- A reading counts as filled only when it has a value; blank generated rows do not count towards the 3 rows.
- Only the stage’s OOS parameters are checked for a complete issue. Issues for non-OOS or general parameters are never checked at Submit.
- Other messages: “Stage name has already been submitted and cannot be changed.” · “The document is final and can no longer be changed.” · “Select the stage(s) to return.” (PSD) · “The document is already completed.”

## Spec Validation stage

The fourth stage validates the final specification against the readings already collected in the FG stage. It has two PICs (QA from QFS, ProDev from PDV) and no Oracle pull of its own. The FG stage must have a generated Standard Spec first (“No FG Standard Spec yet. Generate the spec in the FG tab first.”).
In short
- The fourth stage, with two PICs (QA from QFS, ProDev from PDV). No Oracle pull: it works from the FG stage.
- Fill the product metadata, choose the Analysis No., then set Label / Decision / Remark per row. Save before you submit.
- Submit needs at least 3 readings, a Decision on every labelled row and complete issues for OOS.
Show full detailsHide details

### 1 · Product Formulation & Metadata (Manual Specs)

| Field | Notes | 

| Food Category * | Type at least 2 characters to search. | 

| Target Energy * | Text, max 100 characters, e.g. “430 kcal/100g”. Always typed by hand. | 

| Serving Size * + Unit | A positive number; unit g or ml. | 

| Serving Suggestion * | A positive number — servings per day. | 

| Label Claims * | Free text. | 

Pull from i2ms refills Food Category, Serving Size, Serving Suggestion and Label Claims from i2ms (Target Energy is never touched). If something is already filled it asks “Existing entries will be overwritten with i2ms data (fields that are empty in i2ms are left unchanged). Continue?”. It only fills the form — press Save afterwards. Fields i2ms does not have are listed so you can type them. A document not linked to an i2ms project says so. The stars are enforced only at Submit.

### 2 · Validation Spec

- Analysis No. box — choose one or more samples (shown as “sample no — Lot — date”) from the FG results. The grid gets one Actual column per sample. If the grid is still empty, choosing the first one pulls the FG spec automatically.

- Pull from FG Spec rebuilds the rows from the FG spec on screen (nothing saved). Labels, decisions and remarks you typed are kept. “FG spec pulled onto the screen. Click Save to save it.” or “Spec is already identical to the FG tab.”

- For each row, fill Label (max 200), Decision (drop-down; options are configured by the administrator, e.g. OK / Follow up 1 / Follow up 2) and Remark (max 1000). The Result column (OK / OOS / —) is calculated for you; OOS rows are red. Spec columns and readings are read-only.

- A filter bar helps: search a parameter, All types, All results (OK / OOS / No reading), All decisions.

Unsaved warning After you change the Analysis No. or pull the spec, a yellow banner says “Analysis No. / FG spec has changed and is not saved yet. Save first before filling in Label / Decision / Remark or Submitting.” with a Save button. Until you Save, Label / Decision / Remark, Export Excel and Upload Excel are disabled.

Example The FG stage has samples S-0153 (Lot L-001) and S-0154 (Lot L-002). In Analysis No. you tick both; the grid gets two Actual columns, one per sample. In the Moisture row, S-0153 shows 4.2 and S-0154 shows 5.4 (red, because Max is 5.0), so the Result says OOS. You type Label “Moisture”, Decision Follow up 1 (picked from the drop-down) and Remark “Re-test lot L-002”. Nothing is stored until you press Save.

#### Excel round trip

- Export Excel downloads the saved rows with the saved Analysis No. readings (OOS in red). Only Label, Decision, Remark are unlocked; don’t add or delete rows and don’t touch the hidden Key column.

- Upload Excel reads the file (max 5 MB) and asks “Apply Excel contents?” with counts and up to 8 problems → Apply / Cancel. Empty cells change nothing. Then press Save.

- Typical errors: not a valid .xlsx; sheet “ValidationSpec” not found; template columns changed; row not recognised; Decision not valid; Label or Remark too long.

#### Generate Issue Log

Generate Issue Log creates one issue per OOS parameter among the saved Analysis Nos., skipping those that already have one. Issues that were created from OOS but whose parameter is no longer OOS are removed after you confirm. Then the Issue Log is saved. (Needs a saved state and at least one Analysis No.)

### Charts

The left panel shows “Validation Analytics”: parameter list, Pass / Fail toggles and a Summary. The main area shows a small bar chart per numeric parameter (6 per page, Previous / Next), one bar per Analysis No.; the green band is Min–Max and an OOS bar has a red outline.

### Submitting the Validation stage

- Select at least 1 Analysis No.

- Product Formulation & Metadata complete and saved (“Complete Product Formulation & Metadata and Save first: …”).

- A Decision for every row that has a Label (rows without a Label may stay undecided).

- At least 3 filled readings (rows × selected Analysis Nos.).

- Every OOS parameter has a complete issue.

Both Validation PICs’ Superiors sign separately later (see Approval & Sign-off).

### Reading the Validation grid
| Column | Meaning | 
| Type N / V / T | N = a number judged by Min / Max. V = a value judged against the spec value (text or number). T = a text or scale result judged by its position on the scale. A “—” in Min / Max / Target means not set; text specs show their text. Only numeric parameters can be drawn in the charts. | 
| Result | One verdict per row across all the chosen Analysis Nos.: OOS if at least one chosen reading is out of spec; OK if there are readings and none is OOS; — if no chosen sample has a reading. In the PDF / Excel only “OOS” is written: a blank there can mean OK or no reading. | 
| Decision | Your own call per row from the administrator’s list (OK / Follow up 1 / Follow up 2). It does not change the Result and is not linked to the Issue Log. “Not set” in the filter finds rows without one; an old value that is no longer offered also counts as not set and must be picked again before Submit. | Example S-0153 = 4.2 and S-0154 = 5.4 with Max 5.0: the row says OOS, because one chosen sample is out of spec. With only S-0153 chosen it would say OK.

### Analytics rail and charts
- Passed = rows with readings and no OOS; Failed = rows with at least one OOS reading; Total = the rows currently shown (after your parameter ticks and the Pass / Fail toggles). A row with no reading counts only in Total. The numbers beside the Pass / Fail toggles count all rows. With both toggles off nothing is shown.
- Each small chart is one parameter: a bar per Analysis No. in the order you chose them (colour = Analysis No.), green band = Min–Max, red dashed lines = Min / Max, green dashed line = Target, a red outline on an OOS bar. The axis starts at 0. Long names are shortened; hover a bar for the full name and value. 6 charts per page.
- Notes under the charts: “n parameter(s) have no numeric result in the selected Analysis No., so they are not plotted.” and “n parameter(s) of type Value / Scale (text results) are not shown in the chart.”
- On the stage card, “data” counts readings (rows × chosen Analysis Nos.), not rows.

### Messages you may meet
- “Data pulled from i2ms. Click Save to save it.” · “Not available in i2ms, fill in manually: …” · “This document is not linked to an i2ms project yet.”
- “Serving Size must be a positive number.” · “Serving Suggestion must be a positive number.” · “Target Energy must not exceed 100 characters.” · “Food Category is too long.”
- “The following Analysis Nos are not in the FG Actual Data: …” (reload and choose again) · “There are no Label / Decision / Remark entries in this file.” · “Fill in the Decision for every row that has a Label first (n rows pending): …”

## PSD Review

Appears at the top of the Evaluation step only when the document is Pending PSD Review and you belong to the PSD department. Admin has no shortcut here.
In short
- Only the PSD department sees it, and only while the document is Pending PSD Review.
- Mark every issue OK or NOT OK. NOT OK sends that stage back to its PIC.
- All OK → Approve → Management. Reject document is final.
Show full detailsHide details

### The panel

- Header “PSD Review — Decide OK / NOT OK for each issue. All OK: approve to Management; any NOT OK: return its stage to the PIC.”

- KPIs with a progress bar: Total issue · From OOS · OK · NOT OK · Undecided.

- One section per stage showing the PIC, the issue count, OOS count and a Return to PIC switch. A stage without issues says “No issues in this stage.”

- Each issue card shows everything the PIC wrote (detail, causes, follow-up, action plan, evidence) and two big buttons: OK and NOT OK (click the active one again to clear it), plus a “PSD remark (optional)” box.

- Marking an issue NOT OK automatically switches on “Return to PIC” for its stage.

- Earlier conclusions stay. After a return, PSD must re-review: a NOT OK issue stays NOT OK until PSD changes it to OK.

### The action bar

| Control | Rule | Result | 

| Box “Remark for PIC (required when returning)” | Required for Return. | One remark is sent to all returned stages. | 

| Return to PIC | Tick at least one stage (“Select the stage(s) to return.”) and write a remark (“Remark is required when returning.”). Stages with NOT OK issues are always included. Confirm: “Return the selected stage(s) to the PIC?” | “Returned to PIC.” Status → Returned / Revision. Only the returned stages reopen (not submitted, remark shown). PICs of those stages get an email. Other stages stay locked. | 

| Approve → Management | Disabled while any issue is NOT OK or undecided (tooltips explain). A document with zero issues can be approved straight away. Confirm: “Approve the document to Management?” | “Approved to Management.” Status → Pending Management Approval. Each Superior gets one “Awaiting Your Sign-off” email listing the slot(s) they hold. An optional remark is kept in History. | 

| Reject document | Only while Pending PSD Review. Dialog “Reject document (final)?” with a required Reason. | “Document rejected.” Status → Rejected, final. PICs, Reviewer PSD and PIC Project are emailed with the reason. The reason is kept in History and the email (not displayed on screen). | 

Reject is permanent. There is no undo and no reopening. Use Return to PIC if the work can be corrected.
Example Budi’s issue says “Cause: dryer temperature was low” with no test result. Rina clicks NOT OK and writes the PSD remark “Please add the lab test result.” — the Process stage is switched on under “Return to PIC” by itself. She writes the box “Remark for PIC”: “Process: add the re-test result to the issue.” and presses Return to PIC. Only the Process stage reopens; Inline, FG and Validation stay locked.

Messages: “Approval blocked: all issues must have an OK conclusion. n NOT OK issue(s) … Return them to the PIC. m issue(s) have no conclusion yet.” · “Only PSD department users can perform this review.” · “Review is only possible when the status is Pending PSD Review.”

### Reading the panel
- Total issue = all active issues of the document, all four stages. From OOS = those with the red OOS chip (the tile turns red above 0). OK / NOT OK / Undecided are live counts of your clicks, even before you press Return or Approve; OK + NOT OK + Undecided always add up to Total issue.
- The progress bar shows how many issues you have decided (OK or NOT OK), not how many are OK; it reaches 100% when none is undecided, even if some are NOT OK. Example: 10 issues, 6 OK, 1 NOT OK, 3 undecided = 70%.
- The hint beside the buttons explains why Approve is greyed: red = NOT OK issues exist, amber = some are undecided, green = ready. NOT OK takes priority over undecided.
- In a stage header, “n issue” counts issue cards and “n OOS” counts bad readings in that stage — so “1 issue · 14 OOS” is possible. Validation shows both PICs as “A / B”.
- The Return to PIC switch is forced on while the stage has a NOT OK issue; once on, it stays on after you clear the NOT OK until you switch it off yourself.
- On an issue card, “General” means no parameter. The card edge is green when you marked OK and red when NOT OK. The grey line at the bottom is the PIC who last edited the issue, not PSD.
- One undecided or NOT OK issue anywhere blocks Approve — closed issues and general issues count too. A NOT OK issue always sends its own stage back, even if you did not tick it.

## Returned documents

When PSD returns a stage, the document status becomes Returned / Revision and the stepper caption reads “Returned: revise the affected stage(s), then resubmit.”
In short
- Only the returned stages reopen. Fix them and press Submit Stage (never Submit Setup).
- When all four stages are submitted again, PSD reviews again.
- An issue still marked NOT OK blocks approval until PSD changes it to OK.
Show full detailsHide details

### What the PIC does

- Open the document (the email has an Open Document/Revise Document link). The returned stage card shows “⚠ Returned / Revision” and a yellow note “Returned by PSD: remark”.

- Correct the stage — Actual Data, Issue Log, Standard Spec (Validation: Analysis No., Label / Decision / Remark) — and press Save.

- Press Submit Stage again. The same checklist applies.

- Only the returned stages reopen. The others stay submitted and locked.

- The document stays Returned until all four stages are submitted again; then it goes back to Pending PSD Review and the Reviewer PSD is emailed.

- PSD’s earlier OK / NOT OK conclusions are kept. An issue still marked NOT OK blocks approval, so PSD must change it to OK after checking the revision.

Example Budi opens ICL-2026-00012 from the email. The Process card says “⚠ Returned / Revision” and the yellow note reads “Returned by PSD: Process: add the re-test result to the issue.” He adds the result to the issue, presses Save, then Submit Stage. Because the other three stages are still submitted, the document goes straight back to Pending PSD Review and Rina gets an email.
Do not click Submit Setup to resubmit. It resets all four stages and re-emails every PIC (see Step 1 · Setup).

## Approval & Sign-off

Step 3. Opens after PSD approves (Pending Management Approval). Each Superior signs for the PIC they supervise. The panel is titled “Management Approval”.
In short
- Each PIC’s Superior signs their slot by drawing a signature. There is no signing order.
- A Superior can Reject: the document goes back to PSD Review and all signatures are cleared.
- When the last slot is signed, the document completes by itself.

STAGE · PICSUPERIOR (signs)SLOT ON THE APPROVAL SCREEN

Process · Budi
Inline · Dewi
FG · Andi
Validation PIC 1 (QA) · Maya
Validation PIC 2 (ProDev) · Joko
Reviewer PSD · Rina
Sariholds 2 slots, signs each
Tonoholds 2 slots
Hadi
Hadi’s manager (Dept Head)
SPV — Process Performance Review
SPV — Inline Process Review
SPV — Finished Goods Review
SPV — Validation Review (QA)
SPV — Validation Review (ProDev)
SPV / Dept Head — PSD

Names are made up. The PIC → Superior link comes from the user master, so one Superior can hold several slots.
Show full detailsHide details

### The sign-off slots

| Slot | Signed by | 

| SPV — Process Performance Review | Superior of the Process PIC | 

| SPV — Inline Process Review | Superior of the Inline PIC | 

| SPV — Finished Goods Review | Superior of the FG PIC | 

| SPV — Validation Review (QA) | Superior of Validation PIC 1 (QA) | 

| SPV — Validation Review (ProDev) | Superior of Validation PIC 2 (ProDev) — only if the document has a second Validation PIC | 

| SPV / Dept Head — PSD | Superior of the Reviewer PSD | 

Example — who signs what Budi is the Process PIC and reports to Sari; Dewi is the Inline PIC and also reports to Sari. Sari then holds two slots — “SPV — Process Performance Review” and “SPV — Inline Process Review” — and sees two Sign now buttons. She signs each one separately.

- There is no signing order; any Superior can sign any time while the status is Pending Management Approval. Nobody else can sign a slot.

- A person who is Superior of several PICs has several slots and signs each one separately.

- Each slot card shows its state: Waiting for PSD approval (not open yet), Waiting for SPV, Your turn, Signed (with date, signer and the signature image). A red “SPV is not set in the user master” means that PIC has no Superior, so the slot can never be signed — ask an administrator to fix the user master.

- A banner tells the Superior “Your turn: n slot(s) waiting for your signature”. A progress bar shows “signed / total sign-off”.

- Above the slots, a recap lists “Items to approve” per stage (data, OOS, issues, PSD decisions) and collapsible “Findings & PSD decisions” with filters, so Superiors can read before signing.

### Buttons

| Button | Who | What happens | 

| Sign now | Only the Superior of that slot, while the slot is unsigned | Opens a window “Sign-off — slot name”: “Draw your signature in the box below, then Save.” Draw with mouse or finger in the box; Clear wipes it; Save Signature stores it. A blank box is refused (“Please draw your signature first.”). Success: “Sign-off saved.” Cancel closes without signing. | 

| Reject (return to PSD Review) | A Superior who still has an unsigned slot | Dialog “Reject approval?” with a required Reason. Result: “Returned to PSD Review.” All signatures collected so far are cleared, status → Pending PSD Review, and the Reviewer PSD is emailed “Sign-off Rejected”. After PSD approves again, every Superior must sign again. | 

### Completing

When the last required slot is signed the system completes the document automatically: status → Completed, the document is locked, an integrity hash is stored, the i2ms Project Closure task is set to DONE, and an “Evaluation Completed” email goes to all PICs, the Reviewer PSD and the PIC Project.

#### What is the SHA-256 shown?

- Under each signature: a short fingerprint of the stored signature image — proof of which image was recorded.

- After completion: a Document integrity hash (SHA-256), a fingerprint of the spec, actual data, issue log and sign-offs at completion (the Spec Validation rows are not included). If any of those were altered later, the fingerprint would no longer match. It also appears in the PDF and Excel.

Example — what is a “hash”? A SHA-256 is a fingerprint of data: a long code like a3f9c2e1…7b1d90ee. Change a single digit of the data and the fingerprint changes completely. After completion, the document’s fingerprint is stored; if someone altered a reading or an issue later, a new fingerprint would no longer match the stored one — that is how tampering would be noticed. You never need to type or compare it yourself.

Messages: “This slot can only be signed by name.” · “Sign-off is only allowed when the status is Pending Management Approval.” · “No SPV found for this slot. Make sure the stage PIC and their Superior are set in the user master.” · “Only the SPV of this slot can reject the approval.” · “Rejection reason is required.”

### Reading “Items to approve”
- The big percentage = (readings − OOS readings) ÷ readings, to one decimal; “—” and “no actual data” when there are no readings. The bar is green for the share in spec and red for the rest.
- Card colour: green = nothing out of spec (“All within spec”); amber = there were OOS readings but PSD OK’d every issue (“n OOS: all handled & OK’d by PSD”); red = some issue is not OK’d by PSD yet (“n issue(s) not yet OK’d by PSD”).
- The facts line reads “120 data · 8 OOS · 3 issue (3 OK)”: readings in the stage, OOS readings, issues in the stage and how many PSD marked OK. For Validation, data means the readings of the chosen Analysis Nos.Example 120 readings, 8 OOS = 93.3% within spec. If PSD marked all 3 issues OK the card is amber; if one issue is still not OK’d it is red.

### Findings and slot cards
- Findings are listed with out-of-spec ones first. “PSD: —” / “PSD: pending” means PSD has not decided. While approving you see the short card (stage, parameter, detail, follow-up, action plan, PSD remark); the full card with status, causes and evidence is in Full Detail after completion.
- Slot border: green = signed, blue glow = your slot, dashed red = that PIC has no Superior set. The round badge shows the Superior’s initials. “Waiting for PSD approval” is shown on every unsigned slot while the document is not Pending Management Approval; Full Detail shows “Pending” for an unsigned slot.
- Each Superior signs for the PIC(s) they supervise; the Reviewer PSD’s Superior signs a separate slot.

## Completed & Full Detail

Step 4. Available only when the document is Completed. The document is locked: no screen can change it any more. (A Rejected document is locked too, but has no Full Detail.)
In short
- A locked, read-only report of the whole evaluation.
- PDF (choose the content and up to 24 charts) and Excel (6 sheets) can be downloaded.
- The integrity hash shows that nothing was changed after completion.
Show full detailsHide details

### On screen

A read-only report: header facts (i2ms project, Item Code, category, brand, manufacturer, FPA, monitoring window, PIC Project, Reviewer PSD), key figures (Actual data, Within spec %, OOS, Issues OK’d by PSD, Sign-off), a summary per stage, “Findings & PSD decisions” (filterable), the sign-off cards with signatures, and the Document integrity hash. If nothing was found it says “No findings: all parameters are within spec.”

### PDF

Press PDF (enabled only when Completed). A window Generate Full Detail PDF lets you choose:

- Report content (all on by default): Recap per Stage · Standard Spec · Spec Validation · Issue Log · Sign-off.

- Actual Data table: OOS data only (default, compact and fast) · All data (can run to hundreds of pages and takes long) · Not shown.

- Charts per parameter (optional): tick parameters per stage (with data / OOS badges), Select all / Clear, a search box, and optional Machine and Line filters. Maximum 24 charts — a counter “n / 24 selected” shows it, and Generate is disabled above 24.

- Footer: Cancel and Generate PDF. It shows “Generating PDF…”; the window cannot be closed meanwhile. The file downloads as DocNo.pdf (landscape A4, with signature images and charts).

Example The document has 4,000 readings, 12 of them OOS. With OOS data only the PDF lists just those 12 rows and is ready in seconds. With All data it lists all 4,000 and can run to hundreds of pages. You tick 6 charts (counter shows “6 / 24 selected”) — for example Moisture and Temperature of the Mixer — and press Generate PDF.

### Excel

Excel downloads DocNo.xlsx with six sheets: Summary, Standard Spec, Actual Data (all rows, OOS in red), Spec Validation, Issue Log and Sign-off. It has no charts and no signature images — use the PDF for those.

### The key figures, exactly
| Figure | How it is computed | 
| Actual data | The sum of the data counts of all four stage cards. Because the Validation stage re-reads FG readings, a reading chosen in the Validation tab is counted in both FG and Validation. | 
| OOS | The sum of the OOS counts of the four stage cards (same remark). | 
| Within spec | (Actual data − OOS) ÷ Actual data, to one decimal; “—” when there is no data. Amber when OOS is above 0, green otherwise. The Excel Summary tile “IN SPEC” shows 100% when there is no data at all. | 
| Issues OK’d by PSD | “3 / 5” = PSD approved 3 of the 5 logged issues (any status, general issues included). On a Completed document it should show all of them. | 
| Sign-off | Signed slots ÷ total slots (6, or 5 on older documents); green only when all are signed. | Example FG has 200 readings (4 OOS) and Validation has 10 readings (1 OOS): the screen shows 210 data · 5 OOS · 97.6%. The 10 Validation readings are FG readings counted a second time.

### More on the screen and exports
- “No findings: all parameters are within spec.” only means no issue was recorded; it does not check the readings. Look at “Within spec” and “OOS” for the real picture.
- PDF window: per-parameter badges show the readings and OOS readings; “0 / 5” per stage is parameters ticked ÷ available; Machine and Line pills narrow the choice — with none ticked, all are included. Process / Inline / FG parameters give a run chart, Spec Validation parameters give a bar chart per Analysis No. The counter turns red above 24. The footer summary shows the number of charts and the Actual table mode.
- In the printed PDF the sign-off table has a “Slot” column with the system code and a “Position” column with the readable name. A caption like “3 of 4 Analysis No.” means one chosen Analysis No. had no number for that parameter; “no Actual data for this filter” and “no numeric results for the selected Analysis No.” explain an empty chart.
- Excel Summary mirrors the screen; “Issue Open” counts issues that are not Closed or Close With Notification; the Actual Data sheet writes “OK” for an empty row.
- “The PDF is only available once the document is Completed.” is shown when the PDF button is used before completion.

## Email notifications

The system emails people at each hand-over. Subject: “i-Clause - title (Doc No)”. Each email greets the recipient by name, shows a small table (date, Doc No, i2ms project, project, item code, and “Your stage” / “Your sign-off slot” where relevant) and has a button that opens the document directly. Emails are sent in the background and retried if they fail; a mail problem never blocks the workflow.
In short
- The system emails the right people at each hand-over (seven events).
- Every email has a button that opens the document.
- A mail problem never blocks the workflow.
Show full detailsHide details

Example Budi receives an email with the subject “i-Clause - Evaluation Started (ICL-2026-00012)”. It says “Hello Budi Santoso,” (your full name), shows a small table (date, Doc No, project, item code, “Your stage: Process Performance Review”) and a green Open Document button that opens exactly that document.

| When | Title (button) | Who receives it | 

| Setup submitted | Evaluation Started (Open Document) | Every assigned PIC | 

| Last stage submitted | Awaiting PSD Review (Review Document) | Reviewer PSD | 

| PSD returns stage(s) | Stage Returned for Revision (Revise Document), with PSD’s remarks | PICs of the returned stages | 

| PSD approves | Awaiting Your Sign-off (Sign Off) | The Superior of each slot (one mail per person listing their slots) | 

| All slots signed | Evaluation Completed (Open Document) | All PICs, Reviewer PSD, PIC Project | 

| PSD rejects the document | Document Rejected (Open Document), with the reason | All PICs, Reviewer PSD, PIC Project | 

| A Superior rejects the approval | Sign-off Rejected (Review Document), with the reason | Reviewer PSD | 

No email is sent for: Sync, Save Draft, Save, an individual signature, or a stage submit that is not the last one.

## Master Process Parameter

A separate menu (Process Parameter). It defines, per manufacturer (and optionally per line), which process parameters are loaded into the Process Performance Review stage. It does not hold Min / Max / Target — the PIC enters those in each document.
In short
- A separate menu (Process Parameter), maintained by Admin / PSD.
- It decides which parameters load into the Process stage, per manufacturer (and line). It holds no Min / Max / Target.
- Changing it does not rewrite documents that already started.
Show full detailsHide details

Everyone with menu access can view. Only Admin and PSD see/use the buttons that change data (New Config, Add Parameter, Save, Delete).

### List page

- Cards: TOTAL CONFIGS, ACTIVE, INACTIVE (click to filter).

- Columns: Manufacturer · Line (“all lines” in grey if empty) · # Param · Status · Updated By · Updated · Action. Filter boxes for Manufacturer and Line (type, then Enter).

- Refresh and New Config (Admin / PSD).

- Action: pencil (Edit — also lets read-only users open and view) and trash (Delete). Delete asks “Delete this configuration and all its parameters? This action cannot be undone.” and is permanent.

### Detail page “Process Parameter Configuration”

- Back arrow (asks about unsaved changes) and Save.

- Manufacturer * (required), Line (optional; blank = “All lines”; enabled after you pick a manufacturer) and an Active switch (default on). Only one configuration may exist per manufacturer + line.

- Parameter List table: Parameter · UOM · Machine · Source Type · Test Type · Value Set · Action (pencil / trash). Add Parameter opens a form: Parameter (required; only active process parameters), UOM (auto), Machine, Source Type, Test Type, and Value Set (shown only when Test Type = Value; it defines the drop-down options for Min/Max/Target/Actual). Apply adds it to the table. The same parameter + machine cannot appear twice. Removing a row only takes effect after Save.

- A blue note appears if master data is incomplete (e.g. no parameters flagged as Process); ask an administrator to complete the Parameter menus first.

- Save messages: “Select a Manufacturer first.”, “Add at least one parameter before saving.”, “A configuration already exists for … edit the existing one instead.”, success “Configuration saved successfully.”

Example — one configuration Configuration: Manufacturer Plant X, Line LINE A, Active. Parameter list: “Moisture — Dryer-01 — Logged — Numeric” and “Colour — — Free — Value, Value Set Colour”. A Value Set is a ready-made list of allowed answers (for example Cream / Yellow / Brown) that becomes the drop-down for Target and Actual. When a document for Plant X with LINE A is set up, its Process Standard Spec gets these two rows; the PIC then fills Min / Max / Target.
Remember Changing the master does not rewrite specs of documents that already started. The master is applied to a document’s Process Standard Spec when its Setup is submitted, or when the PIC presses “Pull from Master Process Parameter”.

### What the fields mean
| Field | Meaning | 
| Source Type | A label for how the reading is taken (the values are “Logged” and “Free”). It is stored and copied to the spec row, but nothing in the system behaves differently because of it. | 
| Test Type | Numeric = a number judged against Min / Max. Value = a choice or text (the Value Set gives the drop-down). Text = a free comment. An empty Test Type counts as Numeric. (“Scale” exists only for Oracle Inline / FG specs.) On Process, Numeric parameters are judged; a Value parameter only when its Min / Max and the reading are numbers. | 
| Line | Empty = the configuration serves all lines. A line-specific configuration for the same manufacturer is a separate record; the same manufacturer + line cannot repeat. | 
| Banner | A blue note such as “master data is incomplete” (for example no parameter is flagged PROCESS in the Parameter menu): ask an administrator to complete the Parameter menus first. An inactive manufacturer is refused. | 
- Server messages: “The selected manufacturer is no longer active…” · “Configuration not found — it may have been deleted…” · “Some parameters do not match the list…” · “Manufacturer is not selected.” · “Add at least one parameter first.”

## Button index (A–Z)

Every button in i-Clause, in alphabetical order. Click a topic name for the full explanation.

| Button | Where | One-line effect | Topic | 

| Add issue | Issue Log | Opens the issue form. | Issue Log | 

| Add Parameter | Master Process Parameter | Adds a parameter row (form, then Apply). | Master Process Parameter | 

| Add to Table | Excel Upload Preview | Puts the rows on screen; Save stores them. Disabled if any row has a problem. | Actual Data | 

| All OOS → Issue Log | Actual Data toolbar | One issue per OOS parameter without one. | Issue Log | 

| Apply / Cancel | “Apply Excel contents?” box (Validation); parameter form (Master) | Accept or discard the Excel contents / the parameter. | Spec Validation | 

| Approve → Management | PSD Review | Sends the document to Superior sign-off. | PSD Review | 

| Back | Document header | Confirm, release lock, return to Tasklist. | Opening a document | 

| Blank row | Actual Data (Process) | Adds an empty row to “New rows”. | Actual Data | 

| Clear (filters) | Issue Log, Findings and Validation filter bars | Resets the filters. | Issue Log | 

| Clear (signature) | Sign-off window | Wipes the drawing. | Approval & Sign-off | 

| Clear / All (parameters) | Left filter panel | Untick / tick all parameters. | Evaluation screen | 

| Delete (evidence file) | Issue form | Removes an uploaded file; takes effect on Save. | Issue Log | 

| Delete Spec | Standard Spec (Inline/FG) | Deletes the generated spec so another can be chosen — until results are pulled. | Standard Spec | 

| Download Data (fill in Actual) | Actual Data (Process) | Excel of existing rows to update Actual. | Actual Data | 

| Excel (Full Detail) | Full Detail | Downloads the 6-sheet workbook. | Completed & Full Detail | 

| Excel Template | Actual Data (Process) | Blank workbook for adding rows. | Actual Data | 

| Export Excel / Upload Excel | Validation Spec | Round trip for Label / Decision / Remark. | Spec Validation | 

| Force Unlock | Lock ribbon (PSD / Admin) | Takes the stage lock away from the current editor. | Editing & edit lock | 

| Generate from Batch-Lot (Oracle) — Process; Generate from Evaluation Data (Oracle) — Inline, FG | Actual Data | Background pull of the Monitoring Window. | Actual Data | 

| Generate Issue Log | Validation Spec | One issue per OOS parameter; removes obsolete ones. | Spec Validation | 

| Generate PDF | PDF window | Builds the Full Detail PDF. | Completed & Full Detail | 

| Generate Standard Spec | Select Spec (Oracle) window | Creates the spec from the chosen Oracle spec. (The button first reads “Continue”; after you pick a spec it reads “Generate Standard Spec”.) | Standard Spec | 

| Jump to first OOS | Red OOS banner | Scrolls to the first bad reading. | Evaluation screen | 

| New Config | Master Process Parameter | Starts a new configuration. | Master Process Parameter | 

| Next / Previous | Evidence viewer; Validation charts; this guide | Moves to the next / previous item. | Issue Log | 

| OK / NOT OK | PSD Review issue card | PSD conclusion on the issue. Click the active one again to clear it. | PSD Review | 

| Open | Tasklist | Opens the document. | The Tasklist | 

| Open in new tab / Download | Evidence viewer | Opens or downloads the file. | Issue Log | 

| PDF | Full Detail | Opens the PDF options window (Completed only). | Completed & Full Detail | 

| PNG | Chart header | Downloads the chart as an image. | Evaluation screen | 

| Pull from FG Spec | Validation Spec | Rebuilds the rows from the FG spec on screen. | Spec Validation | 

| Pull from i2ms | Validation metadata | Refills product info from i2ms. | Spec Validation | 

| Pull from Master Process Parameter | Standard Spec (Process) | Loads the parameter rows from the master. | Standard Spec | 

| Refresh | Tasklist; Actual Data; Master list | Reloads the data. | The Tasklist | 

| Reject (return to PSD Review) | Approval | A Superior sends the document back to PSD; clears all signatures. | Approval & Sign-off | 

| Reject document | PSD Review | Ends the document for good. | PSD Review | 

| Return to PIC | PSD Review | Reopens the ticked stages with a remark. | PSD Review | 

| Save (toolbar) | Stage Input & Log | Saves spec, actuals and issues as a draft. The yellow “not saved yet” banner in Validation has its own Save button. | Save vs Submit | 

| Save (issue form / Master) | Issue form; Master detail | Saves the issue log with evidence; saves the configuration. | Issue Log | 

| Save Draft | Document header (Setup) | Saves Setup without validation. | Step 1 · Setup | 

| Save Signature | Sign-off window | Stores your signature. | Approval & Sign-off | 

| Save Window | Monitoring Window bar (PSD / Admin) | Saves the new window and re-queues the data pull. | Step 1 · Setup | 

| Select & Generate Spec (Oracle) | Standard Spec (Inline/FG) | Lists Oracle specs to choose from. | Standard Spec | 

| Select all / Clear (charts) | PDF window | Ticks or unticks every chart of that stage. | Completed & Full Detail | 

| Sign now | Approval slot card | Opens the signature window. | Approval & Sign-off | 

| Submit Setup | Document header (Setup) | Validates Setup and starts the evaluation. | Step 1 · Setup | 

| Submit Stage | Stage toolbar | Locks the stage and hands it to PSD. | Submit Stage checklist | 

| Sync i2ms | Tasklist (Admin / PDV / PSD) | Creates documents from eligible i2ms projects. | The Tasklist | 

| Triangle (warning) on an OOS row | Actual Data | Creates a pre-filled issue for that parameter. | Issue Log | 

| Trash (row / issue / parameter) | Spec, Actual Data, Issue Log, Master | Marks for deletion; final after Save (Master list delete is immediate after confirm). | Save vs Submit | 

| Undo delete | Actual Data (Process) | Brings back a row struck through before Save. | Actual Data | 

| Upload Excel (Actual Data) | Actual Data (Process) | Reads a filled Excel Template or Download Data file and shows a preview (Add to Table). | Actual Data | 

| User Guide | Tasklist; document header | Opens this guide. | Overview | 

| View All | History strip | Opens the full timeline. | Opening a document | 

## FAQ

Frequently asked questions: the messages you may meet and what to do about them. Use the search box above for any other text you see.

| You see / problem | What it means · what to do | 

| I don’t see the Sync i2ms button | Only Admin role, PDV and PSD departments can sync. | 

| “No new eligible i2ms projects.” | No project meets the rules (NPD/REVIT; FPA task — “First Production” for NPD, “Production Readiness” for REVIT — DONE with an Actual Date; Project Closure not DONE) or documents already exist. Check the i2ms tasks. | 

| Save Draft / Submit Setup missing | The document is no longer Pending Setup / Returned, or you are not Admin / PDV / PSD. | 

| “The document was changed by someone else after you opened it. Please reload the page first.” | Reload the document, then redo your Setup changes. | 

| Item Code list is empty | Type at least 3 characters and press Enter. If it stays empty, the system could not match this manufacturer in Oracle, or Oracle did not respond — try again later, then ask IT. | 

| “Complete the following before submitting: …” | The list names the Setup fields still missing. Nothing was saved by that click — fix them and press Submit Setup again (or Save Draft first). | 

| “Only the PIC of this stage or users from the same PIC department can modify this data.” | You are not allowed to edit this stage. Ask the Setup team to correct the PIC, or ask the PIC. | 

| “This stage is currently being edited by name…” | Another person holds the lock. Wait, or ask PSD / Admin to Force Unlock. | 

| “The stage can only be edited while the status is Evaluation In Progress or Returned.” | The document is waiting for review, approval or is final. | 

| Generate button is disabled with a spinner | A background pull is still running for this document. Wait; it re-enables itself and reloads. | 

| Generated, but Actual data is empty (Inline/FG) | Oracle has no analysis result yet for those tests. Try again later. | 

| “No Standard Spec yet …” when generating | Create the spec first (Pull from Master / Select & Generate Spec). | 

| “Fill in Min & Max in the Standard Spec first for parameter: …” | Complete Min and Max for those numeric parameters, Save, then Generate. | 

| Excel upload blocked | At least one row has a problem (red in the preview). Fix the file and upload again; no partial uploads. | 

| “At least 3 filled Actual rows are required before submitting (currently n).” | Enter or generate more readings. | 

| “Complete the Issue Log for the following OOS parameters first …” | Each OOS parameter needs an issue with Category, Status, Detail and Follow-up (plus causes / close remarks where required). | 

| “File not found on this server …” in the evidence viewer | The file was uploaded on another environment. Upload it again here if needed. | 

| I can’t press Approve in PSD Review | An issue is NOT OK or has no conclusion. Decide every issue, or return the stage. | 

| “SPV is not set in the user master” | A PIC has no Superior, so the document cannot be completed. Ask an administrator to set the Superior, then continue. | 

| “This slot can only be signed by name.” | You are not the Superior of that PIC. | 

| PDF button disabled | The PDF exists only for Completed documents. | 

| PDF: “A maximum of 24 charts per PDF is allowed.” | Untick some charts. | 

| “Connection problem. Please try (saving) again (shortly).” | Network or server hiccup. Your last Save may not have gone through — reload and check before redoing. | 

| “Select a spec first.” / “Select a Standard Spec before generating Actual data.” | Nothing is chosen in the picker. Pick one spec row and press the button again. | 

| “A generate/pull process is still running for this document. Wait for it to finish, then try again.” | A Generate or an automatic pull is running for this stage (or for the document). Wait for the spinner to stop. | 

| “Pull or fill in the Standard Spec before generating Actual data.” / “No Standard Spec exists yet. Click “Select & Generate Spec (Oracle)” …” | Create the Standard Spec first: Process from the master, Inline / FG from Oracle. | 

| “No Oracle lot exists within the Monitoring Window.” | Check the dates and the Item Code, or wait until the product has been produced. | 

| “The Standard Spec has already been generated …” / “The spec cannot be deleted because analysis results have already been pulled. Contact IT support…” | Use Delete Spec while no results are pulled. After that the spec is locked: contact IT. | 

| “n row(s) you edited no longer exist … Please reload the page and redo your changes.” | A row was regenerated while you edited. Reload and redo the change. | 

| “Stage name has already been submitted and cannot be changed.” / “The document is final …” | The stage is locked. Ask PSD to return it. A Completed or Rejected document is locked for good. | 

| “Only the PSD department can change the Monitoring Window once evaluation has started.” | Ask PSD or Admin. | 

| “Setup can only be submitted when the status is Pending Setup or Returned.” / “Save the draft before submitting the setup.” | Wrong status, or the form was never saved: Save Draft first. | 

| “This i2ms project already has an active i-Clause document. Please open the existing one.” | Open the existing document from the Tasklist. | 

| “You do not have access to sync i2ms projects.” / “… to modify this document.” / “… to submit the setup of this document.” | Your role or department is not allowed. Ask Admin, PDV or PSD. | 

| “Select the stage(s) to return.” / “Reject reason is required.” / “A document can only be rejected while the status is Pending PSD Review.” | PSD: tick a stage (or mark an issue NOT OK), write the reason, and reject only while the document is Pending PSD Review. | 

| “Rejection reason is required.” / “Only the SPV of this slot can reject the approval.” | A Superior can only reject for a slot they hold, with a reason. | 

| “The PDF is only available once the document is Completed.” | Wait for the last signature. | 

| “Session expired. Please log in again.” | Log in again; unsaved work on the page is lost. | 

| “Unable to open this document…”, “Unable to load stage data…”, “Unable to load Actual data…”, “Sync failed…”, “Unable to upload the file.” | A network or server problem. Try again; if it repeats, note the Doc No and the message and tell IT. | 

| “Invalid document / data is incomplete / document not found … Please reload the page.” | The page is stale or the record was changed by someone else. Reload; if it repeats, tell IT. | 

| A stage card says clean but there is a red “n OOS” | “clean” only means no issue has been logged yet. Add an issue for every OOS parameter before you submit. | 

| The percentage on Full Detail looks too good | Rows still waiting for a reading count as in spec, and Validation readings are counted a second time (see Completed & Full Detail). | 

Tip Still stuck? Note the Doc No, what you clicked and the exact message, and send it to IT Help Desk.

