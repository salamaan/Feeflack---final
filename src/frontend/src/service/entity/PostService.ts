import {ContentType, HttpMethod, HttpService} from "../HttpService";
import {Page, Pageable} from "../../model/data/Page";
import {CreatePostRequest, Post, UpdatePostRequest} from "../../model/entity/Post";
import {User} from "../../model/entity/User";
import {Comment} from "../../model/entity/Comment";

export class PostService {

    public static getPost = (postId: string): Promise<Post> => {
        return HttpService.sendRequest<Post>(
            HttpMethod.GET,
            `/posts/${postId}`
        );
    }

    public static getPosts = (pageable: Pageable): Promise<Page<Post>> => {
        return HttpService.sendRequest<Page<Post>>(
            HttpMethod.GET,
            "/posts" + HttpService.addQueryParameters(pageable),
        );
    }

    public static getMostPopularPosts = (pageable: Pageable): Promise<Page<Post>> => {
        return HttpService.sendRequest<Page<Post>>(
            HttpMethod.GET,
            "/posts/popular" + HttpService.addQueryParameters(pageable),
        );
    }

    public static getPostLikers = (pageable: Pageable, postId: string): Promise<Page<User>> => {
        return HttpService.sendRequest<Page<User>>(
            HttpMethod.GET,
            `/posts/${postId}/likers` + HttpService.addQueryParameters(pageable),
        );
    }

    public static getPostComments = (pageable: Pageable, postId: string): Promise<Page<Comment>> => {
        return HttpService.sendRequest<Page<Comment>>(
            HttpMethod.GET,
            `/posts/${postId}/comments` + HttpService.addQueryParameters(pageable),
        );
    }

    public static createPost = (request: CreatePostRequest): Promise<Post> => {
        return HttpService.sendRequest<Post>(
            HttpMethod.POST,
            "/posts",
            JSON.stringify(request),
            ContentType.JSON
        );
    }

    public static deletePost = (postId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.DELETE,
            `/posts/${postId}`
        );
    }

    public static updatePostPicture = (postId: string, picture: FormData): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.PUT,
            `/posts/${postId}/picture`,
            picture,
        );
    }

    public static updatePost = (postId: string, request: UpdatePostRequest): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.PUT,
            `/posts/${postId}`,
            JSON.stringify(request),
            ContentType.JSON
        );
    }
}