import {LoginResponse, LoginRequest} from "../model/data/Authentication";
import {ContentType, HttpMethod, HttpService} from "./HttpService";

export class AuthenticationService {

    public static loginUser = (request: LoginRequest): Promise<void> => {
        return HttpService.sendRequest<LoginResponse>(
            HttpMethod.POST,
            "/login",
            new URLSearchParams({
                'username': request.username,
                'password': request.password
            }),
            ContentType.X_WWW_FORM_URLENCODED
        ).then((data) => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('expires_at');
            localStorage.removeItem('issuer_id');
            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('expires_at', data.expiresAt);
            localStorage.setItem('issuer_id', data.issuerId);
        });
    }

    public static logoutUser = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('issuer_id');
    }

    public static isLogged = () => {
        const issuerIdExists = localStorage.getItem('issuer_id') != null;
        const accessTokenExists = localStorage.getItem('access_token') != null;
        const expiresAt = localStorage.getItem('expires_at');

        const expiresAtExists = expiresAt != null;
        const tokenNotExpired = expiresAtExists
            ? new Date(expiresAt) >= new Date()
            : false;

        return issuerIdExists && accessTokenExists && expiresAtExists && tokenNotExpired;
    }
}