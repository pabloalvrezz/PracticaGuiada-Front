import { environment } from '../environments/environment';

export class OAuth {
    clientId!: string;
    secret!: string;
}

export class LocaleConfiguration {
    fallbackLocale!: string;
    availableLanguages!: string[];
}

export const BASE_URL = environment.urlBase;

export const OAUTH: OAuth = {
    clientId: environment.oauthClientId,
    secret: environment.oauthSecret
};

export const LOCALE_CONFIG: LocaleConfiguration = {
    fallbackLocale: 'en',
    availableLanguages: ['es', 'en', 'en_US']
};
