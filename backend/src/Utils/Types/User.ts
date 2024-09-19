export interface PropsUser {
    name: string,
    password: string
}

export interface RetornoLogin {
    LOGIN_USER: string,
    LOGIN_NOME: string,
    E_MAIL?: string | undefined,
}