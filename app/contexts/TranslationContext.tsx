'use client';
import { createContext, useContext } from 'react';
import tr from '@/dictionaries/tr.json';
const defaultLocalizationData = {
  navbar: {
    academy: {
      name: '',
    },
    route_names: {
      home: '',
      artists: '',
      add: '',
      add_new_artist: '',
      edit: '',
      edit_artist_accounts: '',
      edit_artist_profile: '',
      edit_announcements: '',
      artist_profile: '',
      about: '',
      virtual_exhibitions: '',
      logout: '',
    },
    login_modal: {
      login_successful_message: '',
      login_failed_message: '',
      password: '',
      title: '',
      subtitle: '',
      action_label: '',
    },
  },
  artistsPage: {
    list_heading: '',
  },
  editArtistAccountsPage: {
    list_heading: '',
    add_button_text: '',
  },
  artistProfilePage: {
    about: {
      heading: '',
    },
    list: {
      heading: '',
    },
  },
  editArtistProfilePage: {
    about: {
      heading: '',
    },
    list: {
      heading: '',
      add_button_text: '',
      max_artwork_number_warning: '',
    },
    header: {
      change_image_button_text: '',
      change_successful_message: '',
      change_failed_message: '',
      select_cover_image: '',
      select_button_text: '',
    },
  },
  editAnnouncementsPage: {
    heading: '',
    add_button_text: '',
  },
};

export const TranslationContext = createContext(defaultLocalizationData);
export const useTranslation = () => useContext(TranslationContext);
