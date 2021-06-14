import OktaJwtVerifier, { Jwt } from '@okta/jwt-verifier';
import { container } from 'tsyringe';
import { Response } from 'express';

export default async function authenticationRequired(req: any, res: Response, next: Function) {
  const oktaJwtVerifier = container.resolve(OktaJwtVerifier);

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  // The expected audience passed to verifyAccessToken() is required,
  // and can be either a string (direct match) or
  // an array  of strings (the actual aud claim in the token must match
  // one of the strings).
  const expectedAudience = 'api://default';

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];

  try {
    const jwt: Jwt = await oktaJwtVerifier.verifyAccessToken(accessToken, expectedAudience);
    req.jwt = jwt;
    return next();
  } catch (err) {
    res.status(401).send(err.message);
  }
}
