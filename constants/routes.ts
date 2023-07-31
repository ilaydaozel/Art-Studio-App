import { ChangeTypes } from './type';

export enum ROUTE_PATHS {
    HOME = '/',
    ARTISTS = '/pages/artists',
    ADD_ARTIST = '/pages/add/artist',
    EDIT_ARTIST = '/pages/editArtists',
    MY_PROFILE = '/pages/editProfile',
    ARTIST_PROFILE = '/pages/artistProfile',
    ABOUT = '/pages/about',
    UNAUTHORIZED = '/unauthorized',
}

export const ROUTE_NAMES: ChangeTypes<typeof ROUTE_PATHS, string> = {
    HOME: 'ANASAYFA',
    ARTISTS: 'SANATÇILAR',
    ADD_ARTIST: 'YENİ SANATÇI EKLE',
    MY_PROFILE: 'PROFİLİMİ DÜZENLE',
    ARTIST_PROFILE: 'SANATÇI',
    EDIT_ARTIST: 'SANATÇILARI DÜZENLE',
    ABOUT: 'HAKKIMIZDA',
    UNAUTHORIZED: 'Unauthorized',
};

export const NAVBAR_LINKS: Pick<typeof ROUTE_PATHS, 'HOME' | 'ARTISTS' | 'ABOUT'> = {
    HOME: ROUTE_PATHS.HOME,
    ARTISTS: ROUTE_PATHS.ARTISTS,
    ABOUT: ROUTE_PATHS.ABOUT,
};