import {Entity} from "./Entity";

export interface User extends Entity {
    id: string
    username: string;
    description: string;
    createdAt: string;
    followersCount: number;
    followingCount: number;
    isFollowedByIssuer: boolean;
    hasProfilePicture: boolean;
}

export interface CreateUserRequest {
    username: string;
    email: string;
    password: string;
}

export interface UpdateUserRequest {
    description: string;
    hasPicture: boolean;
}