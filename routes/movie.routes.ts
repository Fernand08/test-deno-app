import { helpers, Router, Context, Status } from "../deps.ts";
import { searchMovie, getMovieDetails } from "../services/movie.service.ts";
import { addToFavs, removeFromFavs } from "../services/favs.service.ts";

async function search(ctx: Context) {
    const key = ctx.request.url.searchParams.get("key") ?? "";
    ctx.response.body = await searchMovie(key);
}

async function getDetails(ctx: Context) {
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    ctx.response.body = await getMovieDetails(id);
}

async function addMovieToFavs(ctx: Context) {
    const {id} = helpers.getQuery(ctx, { mergeParams: true });
    const memberId = ctx.request.headers.get("X-MID");
    const body = ctx.request.body();
    if (body.type !== "json" || !memberId || !id) {
        ctx.response.status = Status.BadRequest;
        return;
    }
    const value = await body.value;
    addToFavs(memberId, id, value.comment);
    ctx.response.status = Status.OK;
}

function removeMovieFromFavs(ctx: Context) {
    const {id} = helpers.getQuery(ctx, { mergeParams: true });
    const memberId = ctx.request.headers.get("X-MID");
    if (!memberId || !id) {
        ctx.response.status = Status.BadRequest;
        return;
    }
    removeFromFavs(memberId, id);
    ctx.response.status = Status.OK;
}

export const movieRoutes = new Router()
    .get('/movies/search', search)
    .get('/movies/:id', getDetails)
    .post('/movies/:id/favs', addMovieToFavs)
    .delete('/movies/:id/favs', removeMovieFromFavs)
