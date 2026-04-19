# 2026wc_quiniela

PepsiCo / Lay's branded quiniela app for the FIFA World Cup 2026.

## What it does

- Email and password registration/login.
- Full 48-team group stage seeded for the 2026 World Cup format.
- Score predictions for every group match.
- Automatic group standings, best third-place teams, Round of 32, and full knockout simulation.
- Knockout score and winner predictions, including third-place match and champion.
- Manual real-result entry for official scores.
- Live leaderboard with 3 points for exact score and 1 point for correct outcome.
- Department registration and average-score department ranking.
- User profile with prediction, ranking, and champion summary.
- Save feedback messages for prediction/result updates.
- Static Vercel deploy with no build step required.

## Run locally

Open `index.html` directly in a browser, or run:

```bash
npm run dev
```

Then visit `http://localhost:4173`.

## Results

The `Resultados` tab is manual for now. Admins can enter official scores directly, including penalty winners for tied knockout matches.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repository in Vercel.
3. Keep the framework preset as `Other`.
4. Deploy.

Because this version is static, there is no required build command.

## Data note

The app seeds the 12 confirmed groups and the 104-match tournament structure. The static prototype generates group fixtures and knockout paths locally; before launch, replace the generated fixture dates/venues with an approved official source if exact times or stadium assignments matter.
