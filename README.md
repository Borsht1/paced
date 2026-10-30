# Paced

A to-do list that helps you work at a steady pace and balance work with free time.

- Add a task and split it into small steps, with a guess of how many minutes each will take.
- Press **Start**. Paced times each step and compares it with your guess.
- It tells you when to take a break once you slow down, or to switch tasks when something is due soon.
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
