# Paced

A to-do list that helps you work at a steady pace and balance work with free time.

- Add a task and split it into small steps, with a guess of how many minutes each will take.
- **Import**, next to the My tasks heading, brings in tasks from elsewhere. **Paste a list** turns each line of any list into a task, and works everywhere. **Google Tasks** shows your open tasks with a checkbox beside each. Tick the ones you want and they become Paced tasks, with due dates kept and subtasks as steps. Paced only reads from Google, so finishing a task here doesn't check it off there. Tasks you've already imported are marked so you don't add them twice. Google Tasks works on the website only.
- **Next up**, at the top, names the one thing to start: what's first on your timeline, or else what's due soonest, or else the top of your list. One press of **Start** begins it.
- If yesterday's timeline left tasks unfinished, the top asks about them first. **Put on today** adds them to today's timeline, and **Not now** leaves them off.
- **Quick add**, under the My tasks heading, makes a task from one line. End it with minutes and a day, like `chem lab 40m fri`, and the line under the box shows what it understood before you add it. **More details** opens the full form with what you typed: a due date, a day and time to work on it, how long it takes, or steps. If you close it without saving, it's kept, and the link says **Finish your draft**.
- **Work on it**, beside Due date in a task's details or a new task, plans it for a day: today or any later one, with a start time if you like. On today it goes on the timeline, starting no sooner than that time. A later day keeps it until that day comes, and your list shows when it's planned.
- A task past its due date says so once, calmly, with **Move to today** beside it.
- Press **Start**. Paced counts down each step and stops you at the planned end to decide what's next.
- Between steps a one-minute clock runs, then the next step starts by itself, so nothing is left un-timed. When a task is finished and nothing is planned after it, Paced waits for you to choose, and the clock is how long until it reminds you.
- The Today timeline is a card above your list showing the hours you can work. It stays in view while you drag a task onto it. Drag the grip under it to make it taller or shorter. Scroll sideways to see the rest of the day, and **Back to now** returns. Drag tasks onto it and each takes up room for the time it needs. Tasks flow through your free time in order and never start sooner than where you dropped them, so changing a task, your work hours or running over moves everything after it, and anything that no longer fits turns red. Drag either end of your work hours, or use **Work hours** under **Options**. Your changes last for the day, unless you choose to use them every day. **Clear today**, also under **Options**, empties the day.
- On the timeline your tasks are in your color from Settings, Google Calendar events are gray and breaks are green. A task outlined instead of filled has steps with no minutes yet.
- Each scheduled task gets a colored row in your list saying when it should be finished: green when it's on track, blue while you're working on it, amber when the time is a guess because it has no minutes, and red when it runs past your work hours.
- Click a task on the timeline to start it, remove it from today or put a different task there. Click a break to change its length, move it, add another, start it now or delete it. Backspace or Delete removes what's selected, and you can undo it. Drag the right edge of a task, or use the minute buttons in its menu, to save more or less time for it today. Its steps and timers stay as they are.
- Drag across the timeline to select, so you can delete or change many at once. If you select both tasks and breaks, the menu lets you choose which to change. Drag along the hour labels to start anywhere, shift-click to add to what's selected, and drag across an empty stretch to block it off or add a break there.
- **Google Calendar** under **Options** shows today's events as fixed blocks on the timeline, and tasks flow around them. Pick which calendars to use the first time, and press it again to update. All-day events, ones marked Free and ones you declined are left out. Click an event to hide it for today. While Paced is open, it warns you 5 minutes before an event. Paced can't update by itself, so press **Update calendar** when it appears each day, and Google may ask you to approve it again. **Settings** shows what's connected and turns it off. This works on the website only.
- Press the arrow on a task to show its steps, and drag any step onto the timeline on its own. The task's block shrinks to what's left, so one task can be spread across the day. Starting a different task while one is running sets the running step aside with its time kept, and a finished step in the timer's Steps list has **Go back**, which starts it again.
- **Schedules** under **Options** saves today's hours, breaks and tasks under a name. Load one into today or any later day, and it's waiting when that day comes.
- Drag **Add break** onto the timeline to plan one, or press it to add one after your next task. Tasks flow around it, and a break you planned comes before any Paced would suggest. When a task ends, the next one on the timeline starts by itself, and Paced alerts you when the first thing on it is due.
- Coming back after 30 minutes or more away from a paused step, such as overnight, counts as your break, so Paced doesn't ask for another one.
- While something is running, the bar at the bottom has **Stop**, so you can stop working without opening the timer.
- It tells you when to take a break once you slow down, or to switch tasks when something is due soon.
- Sound, notifications and the tab title reach you when you're not looking at Paced. Notifications need the page open in a desktop browser; on most phones you get sound and vibration only.
- **Pop out timer** opens a small timer window that stays on top of your other apps, with the current step, the time left, and buttons to finish or pause. It turns red when you run over. It works in desktop Zen, Firefox and Chrome, opens only when you press the button, and closes with the Paced tab.
- When you stop using your computer, the step pauses from the moment you stopped and carries on when you're back. It's on by default, and you can change it in Settings. It only sees this window, so in another app Paced sends a "Still working?" notification every 15 minutes, and pauses if you don't click it within 3 minutes.
- When you stop, Paced shows a summary of the session: what you worked on, your breaks and pauses, and how long each took, with room for a note. Each session is saved, breaks included.
- History shows your past sessions and when you work best: by time of day, by day of the week, and by how long it's been since a break.
- Try different ways of working (Break when you slow down, Pomodoro, Long focus, Switch tasks) and see which suits you.
- **Notes** catch a thought while you work so you don't lose it. Type it in the box on the timer screen and press Enter, or press **N** anywhere in Paced, or use the **Notes** button at the top left. The timer keeps running. Each note remembers when you wrote it and what step you were on. **Make it a task** turns a note into a task, with any extra lines as its steps. The summary when you stop working lists the thoughts you jotted. Deleting a note offers **Undo**.

## Running it

The whole app is one file, `paced.html`. Open it in a browser and it works. Tasks are saved in that browser.

When it runs as a Claude artifact on claude.ai, tasks are saved to your Claude account instead.

## Website (GitHub Pages)

`index.html` is the version for the website. After changing `paced.html`, rebuild it with:

```sh
sh build-pages.sh
```

## Accounts on the website

Sign-in and saving across devices use Firebase, on the website only.

- `firebase-config.js` holds the project's settings. Set it to `null` to run the site without accounts.
- `firestore.rules` holds the privacy rules. Each person can read and change only their own tasks.

## Google on the website

`PACED_GOOGLE_CLIENT_ID` in `firebase-config.js` turns on Google Tasks and Google Calendar. While it's `null`, both are hidden.

The client ID comes from the `paced-5dbc5` project in the [Google Cloud console](https://console.cloud.google.com/). The project needs the Google Tasks API and Google Calendar API turned on, the `tasks.readonly` and `calendar.readonly` scopes on its sign-in screen, and a web client that allows `https://borsht1.github.io`.

While the sign-in screen is in Testing, only the people added as test users can connect, up to 100, and they see an "unverified app" warning. Removing the warning for everyone takes Google's verification, which can take months. Publishing without verification lets anyone connect, but only 100 people ever can, and that limit can't be reset.
