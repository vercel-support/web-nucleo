This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Pull local environmental variables
First download vercel CLI
```npm i -g vercel```

Configure project with vercel
```vercel```

With the following command, you can pull the local environmental variables (don't upload them to github as they contain secrets).

```vercel env pull .env.local```


[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/pancho111203/web-nucleo)
