# Paced

A to-do list that helps you work at a steady pace and balance work with free time.

- Add a task and split it into small steps, with a guess of how many minutes each will take.
- Press **Start**. Paced counts down each step and stops you at the planned end to decide what's next.
- Between steps a one-minute clock runs, then the next step starts by itself, so nothing is left un-timed.
- It tells you when to take a break once you slow down, or to switch tasks when something is due soon.
- Sound, notifications and the tab title reach you when you're not looking at Paced. Notifications need the page open in a desktop browser; on most phones you get sound and vibration only.
- When you stop using your computer, the step pauses from the moment you stopped and carries on when you're back. It's on by default, and you can change it in Settings. It needs the browser extension to see activity in other apps.
- Try different ways of working (Paced breaks, Pomodoro, Long focus, Task rotation) and see which suits you.

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

## Browser extension

`extension/` keeps your timer on the browser toolbar and can pause or finish a step from there. It also sends alerts after the Paced tab is closed, as long as the browser is running. It works in Zen and Firefox, and is written to work in Chrome too.

It only learns about a session from an open Paced tab on that computer, so it won't see a timer you start on your phone unless Paced is also open here.

**Zen or Firefox**

1. Go to `about:debugging#/runtime/this-firefox`, press **Load Temporary Add-on**, and pick `extension/manifest.json`.
2. Pin Paced Timer from the extensions menu so the badge stays in view.

A temporary add-on disappears when the browser restarts. To keep it, sign it for free as an unlisted add-on at [addons.mozilla.org](https://addons.mozilla.org/developers/) and install the signed file.

**Chrome**

Go to `chrome://extensions`, turn on **Developer mode**, press **Load unpacked**, and pick the `extension` folder.
