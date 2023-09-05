import { getDictionary } from '@/lib/dictionary';
import { ChangeTypes } from './type';

export enum ROUTE_PATHS {
    HOME = '/',
    ARTISTS = '/pages/artists',
    ADD = '/pages/add/',
    ADD_NEW_ARTIST = 'addNewArtist',
    EDIT = '/pages/edit/',
    EDIT_ARTIST_ACCOUNTS = 'editArtistAccount',
    EDIT_ARTIST_PROFILE = 'editArtistProfile',
    EDIT_ANNOUNCEMENTS = 'editAnnouncements',
    ARTIST_PROFILE = '/pages/artistProfile',
    ABOUT = '/pages/about',
    VIRTUAL_EXHIBITIONS = '/pages/virtualExhibition',
}

export const ROUTE_NAMES: ChangeTypes<typeof ROUTE_PATHS, string> = {
    HOME: 'Anasayfa',
    ARTISTS: 'Sanatçılar',
    ADD: 'Ekle',
    ADD_NEW_ARTIST: 'Yeni Sanatçı Ekle',
    EDIT: 'Düzenle',
    EDIT_ARTIST_ACCOUNTS: 'Sanatçıları Düzenle',
    EDIT_ARTIST_PROFILE: 'Profilimi Düzenle',
    EDIT_ANNOUNCEMENTS: 'Duyuruları Düzenle',
    ARTIST_PROFILE: 'Sanatçı',
    ABOUT: 'Hakkımızda',
    VIRTUAL_EXHIBITIONS: 'Sanal Sergiler',
};

export const NAVBAR_LINKS: Pick<typeof ROUTE_PATHS, 'HOME' | 'ARTISTS' | 'ABOUT'> = {
    HOME: ROUTE_PATHS.HOME,
    ARTISTS: ROUTE_PATHS.ARTISTS,
    ABOUT: ROUTE_PATHS.ABOUT,
};