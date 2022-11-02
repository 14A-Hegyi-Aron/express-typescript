import * as express from "express";
import * as morgan from "morgan";

// function loggerMiddleware(
//   request: express.Request,
//   response: express.Response,
//   next
// ) {
//   console.log(`${request.method} ${request.path}`);
//   next();
// }

// app.use(loggerMiddleware);

const app = express();
const router = express.Router();

app.use(express.json());
app.use(morgan("dev"));
app.use(router);

router.get("/", (request, response) => {
  response.send({
    hostname: request.hostname,
    path: request.path,
    method: request.method,
  });
});

router.post("/hello", (request, response) => {
  response.send("Hello World!");
});

app.listen(5000);
