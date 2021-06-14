import { Jwt } from '@okta/jwt-verifier';
import { Request } from 'express';

export default interface RequestJwt extends Request {
  jwt: Jwt
}
