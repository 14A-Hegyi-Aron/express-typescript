import AuthenticationController from "./authentication/authentication.controller";
import App from "./app";
import PostsController from "./posts/posts.controller";

const app = new App([new AuthenticationController(), new PostsController()]);

app.listen();
