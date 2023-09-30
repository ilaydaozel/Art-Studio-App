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
    create_exhibition_modal: {
        form_title: "Yeni Sergi",
        action_label: "Kaydet",
        title: "Başlık",
        description: "Açıklama",
        start_date: "Başlangıç Tarihi",
        end_date: "Bitiş Tarihi",
        organized_by: "Düzenleyen",
        cover_image: "Kapak Fotoğrafı",
        back_label: 'Geri',
        forward_label: 'İleri',
        creation_successful_message: 'Sergi başarıyla oluşturuldu!',
    },
    create_artwork_modal: {
        form_title: 'Eser Oluştur',
        action_label: 'Tamam',
        artist_name: 'Sanatçı Adı',
        artist_surname: 'Sanatçı Soyadı',
        title: 'Başlık',
        description: 'Açıklama',
        creation_year: 'Yapım Yılı',
        medium: 'Teknik',
        type: 'Tür',
        width: 'Genişlik',
        height: 'Yükseklik',
        back_label: 'Geri',
        forward_label: 'İleri',
        creation_successful_message: 'Eser başarıyla oluşturuldu!',
    },
    create_exhibition_artwork_modal: {
        form_title: 'Eser Oluştur',
        action_label: 'Tamam',
        guest_label: 'Akademi Dışı',
        user_label: 'Akademi Sanatçısı',
        artist_fullname: 'Sanatçı Tam İsim',
        artist_name: 'Sanatçı Adı',
        artist_surname: 'Sanatçı Soyadı',
        title: 'Başlık',
        description: 'Açıklama',
        creation_year: 'Yapım Yılı',
        medium: 'Teknik',
        type: 'Tür',
        width: 'Genişlik',
        height: 'Yükseklik',
        back_label: 'Geri',
        forward_label: 'İleri',
        creation_successful_message: 'Eser başarıyla oluşturuldu!',
    },
    create_announcement_modal: {
        form_title: 'Duyuru Oluştur',
        action_label: 'Tamam',
        title: 'Başlık',
        description: 'Açıklama',
        short_description: 'Kısa Açıklama',
        link: 'Link',
        cover_image: 'Kapak Fotorafı',
        creation_successful_message: 'Duyuru başarıyla oluşturuldu!',
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
    error_page: {
        caption: "Hay aksi.. Doğru olmayan bir şeyler var",
        reset_button_label: "Tekrar Dene",
        home_button_label: "Anasayfaya git",
    },
    exceptions: {
        authRequiredError: "Bu sayfaya erişim için kimlik doğrulaması gereklidir!",
        adminAuthRequiredError: "Bu sayfaya erişim için yönetici kimlik doğrulaması gereklidir!",
        passwordLengthError: "Şifre en az 4 karakter uzunluğunda olmalıdır!",
        passwordMismatchError: "Şifreler eşleşmiyor!",
        unknownError: "Bilinmeyen bir hata oluştu!",
        nonUniqueEmailError: "Bu e-posta zaten kullanılıyor!",
        nonExistingArtistProfileError: "Böyle bir sanatçı profili bulunmuyor!",

    },
};

export default TurkishData;
