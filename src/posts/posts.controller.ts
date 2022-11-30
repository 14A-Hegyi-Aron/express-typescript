import PostNotFoundException from "../exceptions/PostNotFoundException";
import { Request, Response, NextFunction, Router } from "express";
import Controller from "../interfaces/controller.interface";
import Post from "./post.interface";
import postModel from "./post.model";

export default class PostsController implements Controller {
  public path = "/posts";
  public router = Router();
  private post = postModel;

  private posts: Post[] = [
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
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  getAllPosts = (request: Request, response: Response) => {
    response.send(this.posts);
  };

  createPost = (request: Request, response: Response) => {
    const postData: Post = request.body;
    const createdPost = new this.post(postData);
    createdPost.save().then((savedPost) => {
      response.send(savedPost);
    });
  };

  getPostById = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    this.post.findById(id).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  modifyPost = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    const postData: Post = request.body;
    this.post.findByIdAndUpdate(id, postData, { new: true }).then((post) => {
      if (post) {
        response.send(post);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };

  deletePost = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id;
    this.post.findByIdAndDelete(id).then((successResponse) => {
      if (successResponse) {
        response.send(200);
      } else {
        next(new PostNotFoundException(id));
      }
    });
  };
}
