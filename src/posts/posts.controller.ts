import * as express from 'express';
import Post from './post.interface';
 
export default class PostsController {
  public path = '/posts';
  public router = express.Router();
 
  private posts: Post[] = [
    {
      author: 'Béla',
      content: 'i liek tomateos',
      title: 'MyConfession',
      canIBeYourFriend: true,
    }
    // {
    //     author: "Vanöcsi Véged",
    //     content: "(╬▔皿▔)╯ ┻━┻",
    //     title: "Elkaplak bátyámmal hülyegyerek",
    //     canIBeYourFriend: true
    // },
    // {
    //     author: "Fejedet Levágoma",
    //     content: "ᕦ(ò_óˇ)ᕤ",
    //     title: "esejed 0",
    //     canIBeYourFriend: true
    // }
  ];
 
  constructor() {
    this.intializeRoutes();
  }
 
  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
    response.send(this.posts);
  }
 
  createAPost = (request: express.Request, response: express.Response) => {
    const post: Post = request.body;
    this.posts.push(post);
    response.send(post);
  }
}
 