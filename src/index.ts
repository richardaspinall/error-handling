import { createServer } from 'http';
import express, { Request, Response } from 'express';

import { divide } from './Divide';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// routing
app.post('/', (req: Request, res: Response) => {
  const answer = divide(req.body.a, req.body.b);

  if (answer.error) {
    res.status(400).send(answer.error);
  } else {
    res.send({ body: answer.value });
  }
});

httpServer.listen(3000);
