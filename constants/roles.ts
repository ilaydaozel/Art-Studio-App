import { ROUTE_PATHS } from './routes';
import { ChangeTypes } from './type';

export const enum ROLES {
    ARTIST,
    ADMIN,
    VISITOR
}

const VISITOR_PERMISSION: ROLES[] = [ROLES.VISITOR];
const ARTIST_PERMISSION: ROLES[] = [ROLES.ARTIST, ...VISITOR_PERMISSION];
const ADMIN_PERMISSION: ROLES[] = [ROLES.ADMIN, ...ARTIST_PERMISSION];

export const PERMISSIONS: Partial<ChangeTypes<typeof ROUTE_PATHS, ROLES[]>> = {
    EDIT_ARTIST_ACCOUNT: ADMIN_PERMISSION,
    ADD: ADMIN_PERMISSION,

};
