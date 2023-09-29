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
    add_exhibition_modal: {
        form_title: "New Exhibition",
        action_label: "Save",
        title: "Title",
        description: "Description",
        startDate: "Start Date",
        endDate: "End Date",
        organizedBy: "Organized By",
        coverImage: "Cover Image",
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
