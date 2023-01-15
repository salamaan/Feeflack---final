import {Pageable} from "../model/data/Page";

interface ApiError {
    message: string;
    httpsStatus: string;
}

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export enum ContentType {
    JSON = "application/json",
    X_WWW_FORM_URLENCODED = "application/x-www-form-urlencoded",
}

export class HttpService {
    private static API_URL = "http://localhost:8080/api";

    public static sendRequest = async <T>(
        httpMethod: HttpMethod,
        url: string,
        body?: any,
        contentType?: ContentType
    ): Promise<T> => {
        if (httpMethod === HttpMethod.GET) {
            if (url.includes("?")) {
                url += "&";
            } else {
                url += "?";
            }

            url += "issuer_id=" + localStorage.getItem('issuer_id');
        }

        return fetch(`${this.API_URL}${url}`, {
                method: httpMethod,
                headers: this.getRequestHeaders(contentType),
                body: body
            }
        ).then(response => {
            const contentType = response.headers.get("content-type");

            return response.ok
                ? contentType && contentType.indexOf("application/json") !== -1
                    ? response.json()
                    : null
                : response.text().then(text => {throw new Error(text)});
        });
    }

    public static getError = (error: Error) => {
        return JSON.parse(error.message) as ApiError;
    }

    public static addQueryParameters(pageable?: Pageable, requestParams?: { [p: string]: string | undefined }) {
        let url = "?";

        if (pageable) {
            url += `page=${pageable.page}&size=${pageable.size}&sort=${pageable.sort.toString()},${pageable.direction}&`;
        }

        if (requestParams) {
            Object.keys(requestParams).forEach(key => {
                if (requestParams[key] !== undefined) {
                    url += `${this.camelToKebab(key)}=${requestParams[key]}&`;
                }
            });
        }

        return url.slice(0, -1);
    }

    private static getRequestHeaders = (contentType?: ContentType): Headers => {
        let requestHeaders = new Headers();

        if(contentType) {
            requestHeaders.append("Content-Type", contentType);
        }
        requestHeaders.append("Authorization", `Bearer ${localStorage.getItem('access_token')}`);

        return requestHeaders;
    }

    private static camelToKebab(camelCaseString: string): string {
        return camelCaseString.replace(/[A-Z]/g, "_$&").toLowerCase();
    }
}