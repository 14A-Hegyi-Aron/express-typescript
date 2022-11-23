import * as express from "express";
import Post from "./post.interface";
import postModel from "./post.model";

export default class PostsController {
  public path = "/posts";
  public router = express.Router();

  private posts: Post[] = [
    {
      author: "Béla",
      content: "i liek tomateos",
      title: "Béla's first post",
      canIBeYourFriend: true,
    },
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
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.patch(`${this.path}/:id`, this.modifyPost);
  }

  getAllPosts = (request: express.Request, response: express.Response) => {
    response.send(this.posts);
  };

  createPost = (request: express.Request, response: express.Response) => {
    const postData: Post = request.body;
    const createdPost = new postModel(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  getPostById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    postModel.findById(id).then((post) => {
      response.send(post);
    });
  };

  modifyPost = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    const postData: Post = request.body;
    postModel.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      response.send(post);
    });
  };
}
