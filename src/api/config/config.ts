import dotenv from 'dotenv';
import assert from 'assert';
import { injectable } from 'tsyringe';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

interface dbConfig {
    hostname: string,
    port: number,
    name: string,
    user: string,
    password: string
}

interface oktaConfig {
    domain: string,
    token: string,
    clientSecret: string,
    clientId: string,
}

@injectable()
export default class ConfigService {
    public baseUrl: string;
    public port: number;
    public prefix: string;
    public db: dbConfig;
    public okta: oktaConfig;

    constructor() {
        const {
            BASE_URL,
            PORT,
            API_PREFIX,
            DB_HOSTNAME,
            DB_PORT,
            DB_NAME,
            DB_USER,
            DB_PASSWORD,
            OKTA_DOMAIN,
            OKTA_TOKEN,
            OKTA_CLIENT_SECRET,
            OKTA_CLIENT_ID,
        } = process.env;

        assert(BASE_URL, `BASE_URL required for this environment`);
        assert(PORT, `PORT needs to be specified to run`);
        assert(DB_HOSTNAME, `PORT needs to be specified to run`);
        assert(DB_PORT, `DB_PORT needs to be specified to run`);
        assert(DB_NAME, `DB_NAME needs to be specified to run`);
        assert(DB_USER, `DB_USER needs to be specified to run`);
        assert(DB_PASSWORD, `DB_PASSWORD needs to be specified to run`);
        assert(API_PREFIX, `API_PREFIX needs to be specified to run`);
        assert(OKTA_DOMAIN, `OKTA_DOMAIN needs to be specified to run`);
        assert(OKTA_TOKEN, `OKTA_TOKEN needs to be specified to run`);
        assert(OKTA_CLIENT_ID, `OKTA_CLIENT_ID needs to be specified to run`);
        assert(OKTA_CLIENT_SECRET, `OKTA_CLIENT_SECRET needs to be specified to run`);

        this.baseUrl = BASE_URL;
        this.port = parseInt(PORT);
        this.prefix = API_PREFIX;
        this.db = {
            hostname: DB_HOSTNAME,
            port: parseInt(DB_PORT),
            name: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD
        }
        this.okta = {
            domain: OKTA_DOMAIN,
            token: OKTA_TOKEN,
            clientSecret: OKTA_CLIENT_SECRET,
            clientId: OKTA_CLIENT_ID
        }
    }
}