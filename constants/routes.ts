import { ChangeTypes } from './type';

export enum ROUTE_PATHS {
    HOME = '/',
    ARTISTS = '/pages/artists',
    ADD_ARTIST = '/pages/add/artist',
    MY_PROFILE = '/pages/myProfile',
    ABOUT = '/pages/about',
    UNAUTHORIZED = '/unauthorized',
}

export const ROUTE_NAMES: ChangeTypes<typeof ROUTE_PATHS, string> = {
    HOME: 'ANASAYFA',
    ARTISTS: 'SANATÇILAR',
    ADD_ARTIST: 'SANATÇI EKLE',
    MY_PROFILE: 'PROFİLİMİ DÜZENLE',
    ABOUT: 'HAKKIMIZDA',
    UNAUTHORIZED: 'Unauthorized',
};

export const NAVBAR_LINKS: Pick<typeof ROUTE_PATHS, 'HOME' | 'ARTISTS' | 'ABOUT'> = {
    HOME: ROUTE_PATHS.HOME,
    ARTISTS: ROUTE_PATHS.ARTISTS,
    ABOUT: ROUTE_PATHS.ABOUT,
};