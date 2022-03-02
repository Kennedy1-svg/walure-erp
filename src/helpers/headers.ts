export const authHeader: any = ():any => {
    const token = localStorage.getItem('token')
    const token_type = localStorage.getItem('token_type')
    const refresh_token = localStorage.getItem('refresh_token')
    const expires_in = localStorage.getItem('expires_in')
    const id_token = localStorage.getItem('id_token')

    if (token) {
        return { 'Authorization': token_type + token }
    } else {
        return {}
    }
}