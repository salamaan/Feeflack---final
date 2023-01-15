import {User, CreateUserRequest, UpdateUserRequest} from "../../model/entity/User";
import {HttpService, HttpMethod, ContentType} from "../HttpService";
import {Page, Pageable} from "../../model/data/Page";
import {Post} from "../../model/entity/Post";

export class UserService {

    public static getUser = (userId: string): Promise<User> => {
        return HttpService.sendRequest<User>(
            HttpMethod.GET,
            `/users/${userId}`
        );
    }

    public static getUsers = (pageable: Pageable, filter?: string): Promise<Page<User>> => {
        return HttpService.sendRequest<Page<User>>(
            HttpMethod.GET,
            "/users" + HttpService.addQueryParameters(pageable, {filter}),
        );
    }

    public static getMostPopularUsers = (pageable: Pageable): Promise<Page<User>> => {
        return HttpService.sendRequest<Page<User>>(
            HttpMethod.GET,
            "/users/popular" + HttpService.addQueryParameters(pageable),
        );
    }

    public static getUserFollowers = (pageable: Pageable, userId: string): Promise<Page<User>> => {
        return HttpService.sendRequest<Page<User>>(
            HttpMethod.GET,
            `/users/${userId}/followers` + HttpService.addQueryParameters(pageable),
        );
    }

    public static getUserFollowing = (pageable: Pageable, userId: string): Promise<Page<User>> => {
        return HttpService.sendRequest<Page<User>>(
            HttpMethod.GET,
            `/users/${userId}/following` + HttpService.addQueryParameters(pageable),
        );
    }

    public static getPostsOfFollowing = (pageable: Pageable, userId: string): Promise<Page<Post>> => {
        return HttpService.sendRequest<Page<Post>>(
            HttpMethod.GET,
            `/users/${userId}/following/posts` + HttpService.addQueryParameters(pageable),
        );
    }

    public static getPostsOfUser = (pageable: Pageable, userId: string): Promise<Page<Post>> => {
        return HttpService.sendRequest<Page<Post>>(
            HttpMethod.GET,
            `/users/${userId}/posts` + HttpService.addQueryParameters(pageable),
        );
    }

    public static createUser = (request: CreateUserRequest): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.POST,
            "/users",
            JSON.stringify(request),
            ContentType.JSON
        );
    }

    public static followUser = (fromUserId: string, toUserId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.POST,
            `/users/${fromUserId}/following` + HttpService.addQueryParameters(undefined, {toUserId})
        );
    }

    public static unfollowUser = (fromUserId: string, toUserId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.DELETE,
            `/users/${fromUserId}/following` + HttpService.addQueryParameters(undefined, {toUserId})
        );
    }

    public static deleteUser = (userId: string): void => {
        HttpService.sendRequest<void>(
            HttpMethod.DELETE,
            `/users/${userId}`
        ).then(() => null);
    }

    public static updateProfilePicture = (userId: string, picture: FormData): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.PUT,
            `/users/${userId}/picture`,
            picture,
        );
    }

    public static updateUser = (userId: string, request: UpdateUserRequest): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.PUT,
            `/users/${userId}`,
            JSON.stringify(request),
            ContentType.JSON
        );
    }
}