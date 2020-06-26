import express from 'express';
import next from 'next';
import nextI18NextMiddleware from 'next-i18next/middleware';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  const nextI18Next = require('../i18n').default;
  await nextI18Next.initPromise;
  server.use(nextI18NextMiddleware(nextI18Next));

  server.get('*', (req, res) => handle(req, res));

  server.listen(port);

  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  );
})();
