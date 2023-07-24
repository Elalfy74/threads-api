import { Request, Response, NextFunction } from 'express';
import * as passport from 'passport';

import { ISession } from '../interfaces';

export function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  passport.authenticate('jwt', (err, user: ISession) => {
    if (!user) return;

    req.user = user;
  })(req, res, next);

  next();
}
