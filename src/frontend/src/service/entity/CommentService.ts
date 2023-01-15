import {ContentType, HttpMethod, HttpService} from "../HttpService";
import {Comment, CreateCommentRequest} from "../../model/entity/Comment";

export class CommentService {

    public static createComment = (request: CreateCommentRequest): Promise<Comment> => {
        return HttpService.sendRequest<Comment>(
            HttpMethod.POST,
            "/comments",
            JSON.stringify(request),
            ContentType.JSON
        );
    }

    public static deleteComment = (commentId: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.DELETE,
            `/comments/${commentId}`
        );
    }

    public static updateComment = (commentId: string, request: string): Promise<void> => {
        return HttpService.sendRequest<void>(
            HttpMethod.PUT,
            `/comments/${commentId}`,
            JSON.stringify(request),
            ContentType.JSON
        );
    }
}