import {HttpMethod, HttpService} from "../HttpService";

export class LikeService {

    public static likePost = (likedById: string, postId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.POST,
            "/likes" + HttpService.addQueryParameters(undefined, {likedById, postId})
        );
    }

    public static unlikePost = (likedById: string, postId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.DELETE,
            "/likes" + HttpService.addQueryParameters(undefined, {likedById, postId})
        );
    }
}