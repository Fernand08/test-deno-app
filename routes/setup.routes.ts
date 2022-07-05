import { Router, Context } from "../deps.ts";
import { uniqueId } from "../services/uniqueId.ts";
import { getFavs } from "../services/favs.service.ts";

function init ({ request, response }: Context) {
    const id = request.headers.get('X-MID') ?? uniqueId();
    const favs = getFavs(id);
    response.body = { id, favs };
}

export const setupRoutes = new Router()
    .get('/init', init);
