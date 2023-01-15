import {Entity} from "./Entity";
import {User} from "./User";

export interface Comment extends Entity {
    id: string;
    commentedBy: User;
    content: string;
    createdAt: string;
    commentedPostId: string;
}

export interface CreateCommentRequest {
    commentedById: string;
    commentedPostId: string;
    content: string;
}

export interface UpdateCommentRequest {
    content: string;
}