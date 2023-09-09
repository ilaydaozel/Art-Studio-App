import { ILanguageData } from "./type";

const EnglishData: ILanguageData = {
    navbar: {
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
            artist_profile: "Artist",
            about: "About",
            virtual_exhibitions: "Virtual Exhibitions",
            logout: "Log out"
        },
        login_modal: {
            login_successful_message: "Logged in successfully",
            login_failed_message: "Could not log in",
            password: "Password",
            title: "Welcome to Konak Academy of Art and Culture!",
            subtitle: "Please Log In",
            action_label: "Log In"
        }
    },
    artistsPage: {
        list_heading: "Artists"
    },
    editArtistAccountsPage: {
        list_heading: "Edit Artist Accounts",
        add_button_text: "Add New Artist +"
    },
    artistProfilePage: {
        about: {
            heading: "About"
        },
        list: {
            heading: "Selected Artworks"
        }
    },
    editArtistProfilePage: {
        about: {
            heading: "About"
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
    editAnnouncementsPage: {
        heading: "Edit Announcements",
        add_button_text: "Add New Announcement +"
    }
};

export default EnglishData;
