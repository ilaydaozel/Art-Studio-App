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
        contact: "İletişim",
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
    update_text_modal: {
        update_successful_message: "Metin başarıyla güncellendi",
        action_label: "Güncelle",
    },
    footer: {
        all_rights_deserved_text: "Tüm hakları saklıdır."
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
        },
        biography: {
            biography_label: "Biografi",
            edit_button_label: "Biografiyi Düzenle"
        },
        delete_successful_mesage: "Eser başarıyla silindi"

    },
    exhibitions: {
        list_heading: "Sergileri Düzenle",
        add_button_text: "Yeni Sergi Ekle +"
    },
    exhibition_profile: {
        description: {
            heading: "Açıklama",
            edit_button_label: "Açıklamayı Düzenle"
        },
        list: {
            heading: "Seçilmiş Eserler",
            add_button_text: "Yeni Eser Oluştur +",
            add_artwork_to_exhibition_button_text: "Sergiye Eser Ekle +"

        },
        virtual_exhibition: {
            heading: "Sanal Sergi",
        },
    },
    edit_announcements: {
        heading: "Duyuruları Düzenle",
        add_button_text: "Yeni Duyuru Ekle +"
    },
    about: {
        heading: "Hakkımızda",
        about_text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla urna sit amet nunc rhoncus, sit amet varius felis condimentum. In auctor ultrices mauris, a congue leo vehicula eget. Cras consectetur euismod ipsum porta pretium. Praesent placerat nulla ac vulputate tempus. Fusce magna enim, ullamcorper sit amet est et, finibus luctus ligula. Cras feugiat, sem efficitur euismod iaculis, augue metus euismod ex, imperdiet tempus libero mi nec nisl. Vivamus vestibulum id nulla vel facilisis. Ut suscipit pharetra lectus, eget dapibus quam bibendum sed. Fusce placerat ipsum a odio iaculis posuere.Quisque sollicitudin est a eros egestas accumsan.Sed malesuada congue sapien, vel tempor elit dapibus quis.<br />Quisque ipsum elit, lobortis vitae tincidunt ut, commodo ut sapien.Nullam tincidunt semper suscipit.Donec in justo ipsum.Nullam ac ultrices metus.Quisque at turpis pulvinar eros feugiat pulvinar et id arcu.Fusce arcu metus, facilisis nec vehicula sit amet, pretium quis velit.Vestibulum nec turpis sed velit condimentum tincidunt. Morbi quis velit varius elit aliquam pretium vitae ultrices nunc.Donec elementum facilisis est, ut auctor dui dictum id.Fusce maximus dolor quis dignissim tempor.Etiam diam est, dictum eget ultricies ac, sagittis at odio.Phasellus a ipsum urna.Fusce feugiat, eros et rhoncus iaculis, purus tortor egestas augue, vitae tempor lectus nunc sed risus.  <br />Donec varius blandit massa vitae imperdiet.Aliquam venenatis sapien eget risus viverra suscipit commodo eu mi.Quisque id quam suscipit, ultricies velit quis, consequat eros.Nam ac dolor laoreet, consequat ante euismod, pretium ante. Sed molestie libero arcu, vitae tristique tellus cursus nec.In nec dignissim orci.Phasellus fermentum mi eu interdum blandit. Aenean id tortor in mi cursus rhoncus.Fusce tempor molestie ligula ut hendrerit."

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
