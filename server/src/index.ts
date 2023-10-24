import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import 'reflect-metadata';
import { ArtistRouter } from './routes/app/artist.route';
import { AlbumRouter } from './routes/app/album.route';
import { TrackRouter } from './routes/app/track.route';
import { AuthRouter } from './routes/auth.route';
import { TrackHistoryRouter } from './routes/trackHistory.route';

const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    routers: [new ArtistRouter(), new AlbumRouter(), new TrackRouter(), new AuthRouter(), new TrackHistoryRouter()],
});

app.listen();
