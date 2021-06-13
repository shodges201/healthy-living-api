import { injectable, inject } from 'tsyringe';
import { QueryResult } from 'pg';
import { Client } from '@okta/okta-sdk-nodejs';
import UserModel from '../models/user';
import { Response } from 'express';
import { User } from '@okta/okta-sdk-nodejs';
import ConfigService from '../config/config';
import { User as AppUser } from '../types/User';
import { Logger } from 'winston';

@injectable()
export default class UserService {
    private oktaClient: Client;
    private userModel: UserModel;
    private config: ConfigService;
    private logger: Logger;

    constructor(@inject(Client) oktaClient: Client,
                @inject(UserModel) userModel: UserModel,
                @inject(ConfigService) config: ConfigService,
                @inject('logger') logger: Logger){
        this.oktaClient = oktaClient;
        this.userModel = userModel;
        this.config = config;
        this.logger = logger;
    }

    public async create(req: any, res: Response) {
        const newUser = {
            profile: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              login: req.body.email,
              mobilePhone: req.body.phoneNumber
            }
        };
        
        try{
            const oktaUser: User = await this.oktaClient.createUser(newUser, {activate: false});
            oktaUser.activate(({sendEmail: true}));
            const { id, created } = oktaUser;
            const appUser: AppUser = new AppUser(newUser.profile.email, id, 
                                                newUser.profile.email, 
                                                newUser.profile.mobilePhone, 
                                                newUser.profile.firstName, 
                                                newUser.profile.lastName, 
                                                new Date(created));
            this.userModel.create(appUser);
        }
        catch(error){
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
            username: username,
            password: password,
            grant_type: 'password',
            scope: 'openid'
        }

        const bodyData = Object.keys(body).map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');

        const request = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${base64AuthHeader}`
            },
            body: bodyData    
        };
        try{
            const authResponse = await this.oktaClient.http.http(authUrl, request);
            const respJson = await authResponse.json();
            return respJson;
        }
        catch(error){
            this.logger.error('Error logging in/getting token for user');
            this.logger.error(error.message);
            throw error;
        }
        
    }
}