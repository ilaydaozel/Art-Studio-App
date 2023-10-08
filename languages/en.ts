import { ILanguageData } from "./type";

const EnglishData: ILanguageData = {
    academy: {
        name: "Konak Academy of Art and Culture"
    },
    route_names: {
        home: "Homepage",
        artists: "Artists",
        register: "Register Artist",
        edit: "Edit",
        edit_artist_accounts: "Edit Artist Accounts",
        edit_artist_profile: "Edit Artist Profile",
        edit_announcements: "Edit Announcements",
        edit_exhibition: "Edit Exhibition",
        edit_exhibitions: "Edit Exhibitions",
        artist_profile: "Artist",
        about: "About",
        exhibitions: "Exhibitions",
        exhibition: "Exhibition",
        logout: "Log out"
    },
    login_modal: {
        login_successful_message: "Logged in successfully",
        login_failed_message: "Could not log in",
        password: "Password",
        title: "Welcome to Konak Academy of Art and Culture!",
        subtitle: "Please Log In",
        action_label: "Log In"
    },
    create_exhibition_modal: {
        form_title: "New Exhibition",
        action_label: "Save",
        title: "Title",
        description: "Description",
        start_date: "Start Date",
        end_date: "End Date",
        organized_by: "Organized By",
        cover_image: "Cover Image",
        back_label: 'Back',
        forward_label: 'Forward',
        creation_successful_message: 'Exhibition created successfully!',
    },
    create_artwork_modal: {
        form_title: 'Create Artwork',
        action_label: 'Done',
        artist_name: 'Artist Name',
        artist_surname: 'Artist Surname',
        title: 'Title',
        description: 'Description',
        creation_year: 'Creation Year',
        medium: 'Medium',
        type: 'Type',
        width: 'Width',
        height: 'Height',
        back_label: 'Back',
        forward_label: 'Forward',
        creation_successful_message: 'Artwork created successfully!',
    },
    create_exhibition_artwork_modal: {
        form_title: 'Create Artwork',
        action_label: 'Done',
        guest_label: 'Not From Academy',
        user_label: 'Academy Artist',
        artist_fullname: 'Artist Fullname',
        artist_name: 'Artist Name',
        artist_surname: 'Artist Surname',
        title: 'Title',
        description: 'Description',
        creation_year: 'Creation Year',
        medium: 'Medium',
        type: 'Type',
        width: 'Width',
        height: 'Height',
        back_label: 'Back',
        forward_label: 'Forward',
        creation_successful_message: 'Artwork created successfully!',
    },
    create_announcement_modal: {
        form_title: 'Create Announcement',
        action_label: 'Done',
        title: 'Title',
        description: 'Description',
        short_description: 'Short Description',
        link: 'Link',
        cover_image: 'Cover Image',
        creation_successful_message: 'Announcement created successfully!',
    },
    update_text_modal: {
        update_successful_message: "Text updated successully",
        action_label: "Update",
    },
    artist_accounts: {
        list_heading: "Artists",
        add_button_text: "Add New Artist +"
    },
    artist_profile: {
        about: {
            heading: "About",
            change_image_button_text: "Change Cover Image"
        },
        list: {
            heading: "Selected Artworks",
            add_button_text: "Add New Artwork +",
            max_artwork_number_warning: "You have reached the maximum number of artworks"
        },
        header: {
            change_image_button_text: "Change Cover Image",
            change_successful_message: "Cover image is updated",
            change_failed_message: "Something went wrong",
            select_cover_image: "Select Cover Image",
            select_button_text: "Select"
        },
        biography: {
            biography_label: "Biography",
            edit_button_label: "Update Biograpy"
        }
    },
    exhibitions: {
        list_heading: "Edit Exhibitions",
        add_button_text: "Add New Exhibition +"
    },
    edit_announcements: {
        heading: "Edit Announcements",
        add_button_text: "Add New Announcement +"
    },
    error_page: {
        caption: "Oops.. Something isn't right",
        reset_button_label: "Try Again",
        home_button_label: "Go To Homepage",
    },
    exceptions: {
        authRequiredError: "Authentication is required to access this page!",
        adminAuthRequiredError: "Admin authentication is required to access this page!",
        passwordLengthError: "The password must be at least 4 characters long!",
        passwordMismatchError: "Passwords do not match!",
        unknownError: "An error occurred!",
        nonUniqueEmailError: "This email is already in use!",
        nonExistingArtistProfileError: "There is no such artist profile!",
    },
};

export default EnglishData;
