# FTA Mind Game

Meditation and visualization training app for Tier 1 FTA players. It installs on iPhone and Android from a web link, opens full screen, and works offline at tournaments.

## Put it online (one time, about 10 minutes)

1. **Make the repository.** On github.com, click **+** (top right), then **New repository**. Name it `fta-mind-game`, leave everything else as is, and click **Create repository**.
2. **Upload the files.** On the new repository page, click **uploading an existing file**. Drag in everything from this folder (`index.html`, `avatar.js`, `sw.js`, `manifest.webmanifest`, `vercel.json`, `README.md`, and the `api`, `icons` and `fonts` folders). Click **Commit changes**.
3. **Connect Vercel.** Go to vercel.com and choose **Continue with GitHub**. Click **Add New**, then **Project**, pick `fta-mind-game`, and click **Deploy**. Leave all settings as they are.
4. **Get the link.** Vercel gives you an address like `fta-mind-game.vercel.app`. That's the link for the players. You can rename it under Project, Settings, Domains.

## Turn on the team leaderboard (one time, about 5 minutes)

The leaderboard needs a small free database so every phone can share its score.

1. In Vercel, open the `fta-mind-game` project and go to **Storage**. Click **Create Database**, pick **Upstash** and then **Redis**, choose the free plan, and connect it to this project.
2. Go to **Settings**, then **Environment Variables**. Add one called `TEAM_CODE` and set it to a code you make up, for example `ACES26`. This keeps the board private to your players.
3. Go to **Deployments**, click the ⋯ menu on the newest one, and choose **Redeploy**.
4. Give the team code to the players. They type it on the **Team** tab.

To lock someone out or start a fresh season, change `TEAM_CODE` and redeploy. Everyone then rejoins with the new code.

The board only shows each player's first name, last initial and avatar. Scores come from the players' phones, so treat it as a fun motivator rather than an official record.

## How players install it

- **iPhone:** open the link in **Safari**, tap **Share**, then **Add to Home Screen**. Always open the app from the icon after that.
- **Android:** open the link in **Chrome** and tap **Install** in the banner, or use the ⋮ menu and **Add to Home screen**.

## Adding store items

Every item for sale is one line in `avatar.js`, in the `ITEMS` list, with its name and price. Ask Claude to add new hats, shirts or anything else.

## Updating it

Every change pushed to GitHub goes live on Vercel within a couple of minutes. Players get it the next time they open the app with internet, and a "New version ready" note may appear.

- In any Claude chat, attach the `fta-mind-game` repository and say what to change.
- If you change a file by hand, also change `VERSION` at the top of `sw.js` (for example `fta-mind-v2`) so phones pick up the new files.
- Keep the same web address. Player progress is tied to it.

## Where progress is saved

Each player's sessions, streaks, trophies, coins and avatar are saved on their own phone. The team board only gets their score numbers. The backup code under their name moves progress to a new phone. Deleting the app or clearing the browser's website data erases progress unless they saved that code.
