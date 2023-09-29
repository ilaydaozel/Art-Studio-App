export type ILanguageData = {
    [key: string]: {
        [key: string]: string | { [key: string]: string };
    };
    academy: {
        name: string;
    };
    route_names: {
        home: string;
        artists: string;
        register: string;
        edit: string;
        edit_artist_accounts: string;
        edit_artist_profile: string;
        edit_announcements: string;
        edit_exhibition: string;
        edit_exhibitions: string;
        artist_profile: string;
        about: string;
        exhibitions: string;
        exhibition: string;
        logout: string;
    };
    login_modal: {
        login_successful_message: string;
        login_failed_message: string;
        password: string;
        title: string;
        subtitle: string;
        action_label: string;
    };
    add_exhibition_modal: {
        form_title: string;
        action_label: string;
        title: string;
        description: string;
        startDate: string;
        endDate: string;
        organizedBy: string;
        coverImage: string;
    };
    create_artwork_modal: {
        form_title: string;
        action_label: string;
        artist_name: string;
        artist_surname: string;
        title: string;
        description: string;
        creation_year: string;
        medium: string;
        type: string;
        width: string;
        height: string;
        back_label: string;
        forward_label: string;
        creation_successful_message: string;
    };
    create_exhibition_artwork_modal: {
        form_title: string;
        action_label: string;
        guest_label: string;
        user_label: string;
        artist_fullname: string,
        artist_name: string;
        artist_surname: string;
        title: string;
        description: string;
        creation_year: string;
        medium: string;
        type: string;
        width: string;
        height: string;
        back_label: string;
        forward_label: string;
        creation_successful_message: string;
    };
    artist_accounts: {
        list_heading: string;
        add_button_text: string;
    };
    artist_profile: {
        about: {
            heading: string;
            change_image_button_text: string;
        };
        list: {
            heading: string;
            add_button_text: string;
            max_artwork_number_warning: string;
        };
        header: {
            change_image_button_text: string;
            change_successful_message: string;
            change_failed_message: string;
            select_cover_image: string;
            select_button_text: string;
        };
    };
    exhibitions: {
        list_heading: string;
        add_button_text: string;
    };
    edit_announcements: {
        heading: string;
        add_button_text: string;
    };
    exceptions: {
        authRequiredError: string;
        adminAuthRequiredError: string;
        passwordLengthError: string;
        passwordMismatchError: string;
        unknownError: string;
        nonUniqueEmailError: string;
        nonExistingArtistProfileError: string;
    };

}