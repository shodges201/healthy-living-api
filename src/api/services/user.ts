import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import { Client, User } from '@okta/okta-sdk-nodejs';
import { Response } from 'express';
import { Logger } from 'winston';
import UserModel from '../models/user';

import ConfigService from '../config/config';
import { User as AppUser } from '../types/User';

@injectable()
export default class UserService {
  constructor(@inject(Client) private oktaClient: Client,
    @inject(UserModel) private userModel: UserModel,
    @inject(ConfigService) private config: ConfigService,
    @inject('logger') private logger: Logger) {
  }

  public async create(req: any, res: Response) {
    const newUser = {
      profile: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        login: req.body.email,
        mobilePhone: req.body.phoneNumber,
      },
    };

    this.logger.info(JSON.stringify(newUser));
    this.logger.info(JSON.stringify(req.body));

    try {
      const oktaUser: User = await this.oktaClient.createUser(newUser, { activate: false });
      oktaUser.activate(({ sendEmail: true }));
      const { id, created } = oktaUser;
      const appUser: AppUser = new AppUser(newUser.profile.email, id,
        newUser.profile.email,
        newUser.profile.mobilePhone,
        newUser.profile.firstName,
        newUser.profile.lastName,
        new Date(created));
      this.userModel.create(appUser);
      return appUser;
    } catch (error) {
      this.logger.error('Error creating a user');
      this.logger.error(error.message);
      throw error;
    }
  }

  public async getAll(): Promise<QueryResult> {
    const result = await this.userModel.getAll();
    return result;
  }

  public async login(username: string, password: string) {
    const authUrl = `${this.oktaClient.baseUrl}/oauth2/default/v1/token`;
    console.log(authUrl);
    const authHeader = `${this.config.okta.clientId}:${this.config.okta.clientSecret}`;
    const base64AuthHeader = Buffer.from(authHeader).toString('base64');

    const body: { [key: string]: string } = {
      username,
      password,
      grant_type: 'password',
      scope: 'openid',
    };

    const bodyData = Object.keys(body).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(body[key])}`).join('&');

    const request = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64AuthHeader}`,
      },
      body: bodyData,
    };
    try {
      const authResponse = await this.oktaClient.http.http(authUrl, request);
      const respJson = await authResponse.json();
      return respJson;
    } catch (error) {
      this.logger.error('Error logging in/getting token for user');
      this.logger.error(error.message);
      throw error;
    }
  }

  public async getFromOktaId(id: string): Promise<AppUser> {
    const user = await this.userModel.getUserFromOktaId(id);
    return user;
  }
}
