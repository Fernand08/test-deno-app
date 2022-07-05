import { Application, oakCors } from "./deps.ts";
import { setupRoutes } from "./routes/setup.routes.ts";
import { movieRoutes } from "./routes/movie.routes.ts";
import { log, time } from "./middleware/logger.ts";

const app = new Application();

app.use(oakCors())

app.use(log);
app.use(time);

app.use(setupRoutes.routes());
app.use(setupRoutes.allowedMethods());

app.use(movieRoutes.routes());
app.use(movieRoutes.allowedMethods());

await app.listen({ port: 8000 });
