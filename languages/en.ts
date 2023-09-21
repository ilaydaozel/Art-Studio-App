import { ILanguageData } from "./type";

const EnglishData: ILanguageData = {
    academy: {
        name: "Konak Academy of Art and Culture"
    },
    route_names: {
        home: "Homepage",
        artists: "Artists",
        add: "Add",
        add_new_artist: "Add New Artists",
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
    unauthorized: {
        caption: "Unauthorized",
        user_subcaption: "Access is only allowed for registered users",
        admin_subcaption: "Access is only allowed for admins"
    },
};

export default EnglishData;
