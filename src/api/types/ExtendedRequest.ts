import { Jwt } from '@okta/jwt-verifier';
import { Request } from 'express';

export default class ExtendedRequest extends Request{
    public jwt: Jwt;
}