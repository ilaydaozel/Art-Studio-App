export interface IUser {
    id: string;
    name: string;
    surname: string;
    userType: string;
    email: string;
    gender?: string;
    artistProfile?: IArtistProfile;
}
export interface IArtistProfile {
    id: string;
    biography?: string;
    links: string[];
    profilePic?: string;
    artworks?: IArtwork[];
    coverImage?: string;
    artistId: string;
    user?: IUser;
}

export interface IArtwork {
    id: string;
    title: string;
    description?: string;
    creationYear?: string;
    medium?: string;
    type?: string;
    width?: number;
    height?: number;
    artworkMedias: string[];
    exhibitionIds: string[];
    exhibitions: IExhibition[];
}
export interface IArtwork extends IArtwork {
    artistId: string;
    artist: IArtistProfile;
}

export interface IGuestArtwork extends IArtwork {
    artistName: string;
    artistSurname: string;
}

export interface IExhibition {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    organizedBy?: string;
    ArtworkIds: string[];
    guestArtworkIds: string[];
    Artworks: IArtwork[];
    guestArtworks: IGuestArtwork[];
}

export interface IAnnouncement {
    id: string;
    caption: string;
    subcaption?: string;
    smallCaption?: string;
    coverImage?: string;
    link?: string;
    isActive: boolean;
}