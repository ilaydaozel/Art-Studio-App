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
    artworks?: IUserArtwork[];
    artistId: string;
    user: IUser;
}

export interface IUserArtwork {
    id: string;
    artistId: string;
    title: string;
    description?: string;
    creationYear?: string;
    medium?: string;
    type?: string;
    width?: number;
    height?: number;
    artworkMedias: string[];
    exhibitionIds: string[];
    artist: IArtistProfile;
    exhibitions: IExhibition[];
}

export interface IGuestArtwork {
    id: string;
    title: string;
    artistName: string;
    artistSurname: string;
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

export interface IExhibition {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    organizedBy?: string;
    userArtworkIds: string[];
    guestArtworkIds: string[];
    userArtworks: IUserArtwork[];
    guestArtworks: IGuestArtwork[];
}
