import { ChangeTypes } from './type';

export enum ROUTE_PATHS {
    HOME = '/',
    ARTISTS = '/pages/artists',
    ADD = '/pages/add/',
    ADD_NEW_ARTIST = 'addNewArtist',
    EDIT = '/pages/edit/',
    EDIT_ARTIST_ACCOUNT = 'editArtistAccount',
    EDIT_ARTIST_PROFILE = 'editArtistProfile',
    EDIT_ANNOUNCEMENTS = 'editAnnouncements',
    ARTIST_PROFILE = '/pages/artistProfile',
    ABOUT = '/pages/about',
    VIRTUAL_EXHIBITION = '/pages/virtualExhibition',
    UNAUTHORIZED = '/unauthorized',
}

export const ROUTE_NAMES: ChangeTypes<typeof ROUTE_PATHS, string> = {
    HOME: 'ANASAYFA',
    ARTISTS: 'SANATÇILAR',
    ADD: 'EKLE',
    ADD_NEW_ARTIST: 'YENİ SANATÇI EKLE',
    EDIT: 'DÜZENLE',
    EDIT_ARTIST_ACCOUNT: 'SANATÇILARI DÜZENLE',
    EDIT_ARTIST_PROFILE: 'PROFİLİMİ DÜZENLE',
    EDIT_ANNOUNCEMENTS: 'DUYURULARI DÜZENLE',
    ARTIST_PROFILE: 'SANATÇI',
    ABOUT: 'HAKKIMIZDA',
    VIRTUAL_EXHIBITION: 'SANAL SERGI',
    UNAUTHORIZED: 'Unauthorized',
};

export const NAVBAR_LINKS: Pick<typeof ROUTE_PATHS, 'HOME' | 'ARTISTS' | 'ABOUT'> = {
    HOME: ROUTE_PATHS.HOME,
    ARTISTS: ROUTE_PATHS.ARTISTS,
    ABOUT: ROUTE_PATHS.ABOUT,
};