// tslint:disable:no-console
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get(["/team/create/", "/team/edit/:teamId/"], (req, res) => {
      const page = "/teamBuilder";
      const { teamId } = req.params;
      const queryParams = { teamId };
      return app.render(req, res, page, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
