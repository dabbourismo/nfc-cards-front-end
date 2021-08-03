import { ClientPersonal } from './ClientPersonal';
import { ClientSocial } from './ClientSocial';
export interface Client{
    clientPersonalDto:ClientPersonal;
    clientSocialDto:ClientSocial
}