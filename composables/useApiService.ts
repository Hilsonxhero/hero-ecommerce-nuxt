export interface SearchParameters {
    [key: string]: any;
}

type UseFetchOptions = {
    key?: string
    method?: string
    query?: SearchParameters
    params?: SearchParameters
    body?: RequestInit['body'] | Record<string, any>
    headers?: Record<string, string> | [key: string, value: string][] | Headers
    baseURL?: string
    server?: boolean
    lazy?: boolean
    immediate?: boolean
    pick?: string[]
}

export const useApiService = (request: string, opts?: UseFetchOptions): Promise<void> | void => {
    const config = useRuntimeConfig()
    const headers = useRequestHeaders(['cookie'])
    const apiFetch = $fetch.create({
        baseURL: config.public.baseURL,
        credentials: 'include',
        headers,
        onResponse({ request, response, options }) {
            // Process the response data
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
        },
        onRequest({ request, options }) {
            // Set the request headers
        },
        onRequestError({ request, options, error }) {
            // Handle the request errors
        },
        ...opts
    })
    return apiFetch(request)

}

export const get = (request: string, opts?: UseFetchOptions): Promise<void> | void => {
    return useApiService(request, opts)
};

export const post = (request: string, params?: SearchParameters, opts?: UseFetchOptions): Promise<void> | void => {
    return useApiService(request, { ...opts, method: "POST", body: params })
};

export const put = (request: string, params: SearchParameters, opts?: UseFetchOptions): Promise<void> | void => {
    return useApiService(request, { ...opts, method: "PUT", body: params })
};

export const remove = (request: string, params: SearchParameters, opts?: UseFetchOptions): Promise<void> | void => {
    return useApiService(request, { ...opts, method: "DELETE", body: params })
};


export default { get, post, put, remove };

