import { ILanguageData } from "./type";

const TurkishData: ILanguageData = {

    academy: {
        name: "Konak Kültür Sanat Akademisi"
    },
    route_names: {
        home: "Anasayfa",
        artists: "Sanatçılar",
        register: "Yeni Sanatçı Kaydet",
        edit: "Düzenle",
        edit_artist_accounts: "Sanatçıları Düzenle",
        edit_artist_profile: "Profilimi Düzenle",
        edit_announcements: "Duyuruları Düzenle",
        edit_exhibition: "Sergiyi Düzenle",
        edit_exhibitions: "Sergileri Düzenle",
        artist_profile: "Sanatçı",
        about: "Hakkımızda",
        exhibitions: "Sergiler",
        exhibition: "Sergi",
        logout: "Çıkış Yap"
    },
    login_modal: {
        login_successful_message: "Başarıyla giriş yapıldı",
        login_failed_message: "Giriş yapılamadı",
        password: "Şifre",
        title: "Konak Kültür Sanat Akademisi'ne Hoş Geldiniz!",
        subtitle: "Lütfen Giriş Yapın",
        action_label: "Giriş Yap"
    },
    add_exhibition_modal: {
        form_title: "Yeni Sergi",
        action_label: "Kaydet",
        title: "Başlık",
        description: "Açıklama",
        startDate: "Başlangıç Tarihi",
        endDate: "Bitiş Tarihi",
        organizedBy: "Düzenleyen",
        coverImage: "Kapak Fotoğrafı",
    },
    artist_accounts: {
        list_heading: "Sanatçılar",
        add_button_text: "Yeni Sanatçı Ekle +"
    },
    artist_profile: {
        about: {
            heading: "Hakkında",
            change_image_button_text: "Kapak Fotoğrafını Değiştiriniz"
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
    exhibitions: {
        list_heading: "Sergileri Düzenle",
        add_button_text: "Yeni Sergi Ekle +"
    },
    edit_announcements: {
        heading: "Duyuruları Düzenle",
        add_button_text: "Yeni Duyuru Ekle +"
    },
    exceptions: {
        authRequiredError: "Bu sayfaya erişim için kimlik doğrulaması gereklidir!",
        adminAuthRequiredError: "Bu sayfaya erişim için yönetici kimlik doğrulaması gereklidir!",
        passwordLengthError: "Şifre en az 4 karakter uzunluğunda olmalıdır!",
        passwordMismatchError: "Şifreler eşleşmiyor!",
        unknownError: "Bilinmeyen bir hata oluştu!",
        nonUniqueEmailError: "Bu e-posta zaten kullanılıyor!"

    },
};

export default TurkishData;
