import IAlbum from "./IAlbum";
import ITrackData from "./ITrackData";

export default interface ITrack extends ITrackData {
    id: number;
    numeration: string;
    userId: number;
    published: boolean;
    album: IAlbum;
}
