import {Entity} from "./Entity";
import {User} from "./User";

export interface Post extends Entity {
    id: string;
    content: string;
    createdAt: string;
    postedBy: User;
    commentsCount: number;
    likesCount: number;
    isLikedByIssuer: boolean;
    hasPicture: boolean;
}

export interface CreatePostRequest {
    postedById: string;
    content: string;
}

export interface UpdatePostRequest {
    content: string;
    hasPicture: boolean;
}