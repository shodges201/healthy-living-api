import { container } from 'tsyringe';
import { Client } from '@okta/okta-sdk-nodejs';
import OktaJwtVerifier from '@okta/jwt-verifier';
import ConfigService from './config';

export default async () => {
  const config = container.resolve(ConfigService);

  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: `https://${config.okta.domain}/oauth2/default`,
    clientId: config.okta.clientId,
  });

  const oktaClient = new Client({
    orgUrl: `https://${config.okta.domain}`,
    token: config.okta.token,
  });

  container.register(OktaJwtVerifier, { useValue: oktaJwtVerifier });
  container.register(Client, { useValue: oktaClient });
};
