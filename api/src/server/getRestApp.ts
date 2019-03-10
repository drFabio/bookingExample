import express from 'express';
import bodyParser from 'body-parser';
import { Context } from '../types';

declare global {
  namespace Express {
    export interface Request {
      context?: Context;
    }
  }
}

export function getRestApp(context: Context) {
  const app = express();

  app.use(bodyParser.json());
  app.use((req, res, next) => {
    req.context = context;
    next();
  });
  app.get('/bookings', async (req, res) => {
    const data = await req.context!.bookingManager.getAllBookings(false);
    res.json(data);
  });
  app.get('/users/:userId/bookings', async (req, res) => {
    const data = await req.context!.bookingManager.getUserBookings(
      req.params.userId,
      false
    );

    res.json(data);
  });
  return app;
}
