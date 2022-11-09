import * as express from 'express';
import Post from './post.interface';
import postModel from './post.model';
 
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
    this.router.post(this.path, this.createPost);
  }
 
  getAllPosts = (request: express.Request, response: express.Response) => {
    response.send(this.posts);
  }
 
  public createPost(request: express.Request, response: express.Response) {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        response.send(savedPost);
      })
  }
}