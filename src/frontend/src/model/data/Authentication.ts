export interface LoginResponse {
    accessToken: string;
    expiresAt: string;
    issuerId: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}