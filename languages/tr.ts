import { ILanguageData } from "./type";

const TurkishData: ILanguageData = {
    navbar: {
        academy: {
            name: "Konak Kültür Sanat Akademisi"
        },
        route_names: {
            home: "Anasayfa",
            artists: "Sanatçılar",
            add: "Ekle",
            add_new_artist: "Yeni Sanatçı Ekle",
            edit: "Düzenle",
            edit_artist_accounts: "Sanatçıları Düzenle",
            edit_artist_profile: "Profilimi Düzenle",
            edit_announcements: "Duyuruları Düzenle",
            artist_profile: "Sanatçı",
            about: "Hakkımızda",
            virtual_exhibitions: "Sanal Sergiler",
            logout: "Çıkış Yap"
        },
        login_modal: {
            login_successful_message: "Başarıyla giriş yapıldı",
            login_failed_message: "Giriş yapılamadı",
            password: "Şifre",
            title: "Konak Kültür Sanat Akademisi'ne Hoş Geldiniz!",
            subtitle: "Lütfen Giriş Yapın",
            action_label: "Giriş Yap"
        }
    },
    artistsPage: {
        list_heading: "Sanatçılar"
    },
    editArtistAccountsPage: {
        list_heading: "Sanatçı Hesaplarını Düzenle",
        add_button_text: "Yeni Sanatçı Ekle +"
    },
    artistProfilePage: {
        about: {
            heading: "Hakkında"
        },
        list: {
            heading: "Seçilmiş Eserler"
        }
    },
    editArtistProfilePage: {
        about: {
            heading: "Hakkında"
        },
        list: {
            heading: "Seçilmiş Eserler",
            add_button_text: "Yeni Eser Ekle +",
            max_artwork_number_warning: "Maximum eser sayısına ulaştınız"
        },
        header: {
            change_image_button_text: "Kapak Resmini Değiştir",
            change_successful_message: "Kapak fotoğrafı güncellendi",
            change_failed_message: "Bir şeyler yanlış gitti",
            select_cover_image: "Kapak Resmi Seç",
            select_button_text: "Seç"
        }
    },
    editAnnouncementsPage: {
        heading: "Duyuruları Düzenle",
        add_button_text: "Yeni Duyuru Ekle +"
    }
};

export default TurkishData;
