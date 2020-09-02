
export const isadmin = sessionStorage.getItem('isadmin')
export const UserName = sessionStorage.getItem('UserName')
export const Name = sessionStorage.getItem('Name')
export const Department = sessionStorage.getItem('Department')
export const Mobile = sessionStorage.getItem('Mobile')
export const token = sessionStorage.getItem('token')
export const public_id = sessionStorage.getItem('public_id')

export const CurrentUser = () => {
    if (isadmin && UserName && Name && Department && Mobile && token && public_id) {
        return ({ isadmin, UserName, Name, Department, Mobile, token, public_id })
    } else {
        return ({})
    }
}
export const isLogin = () => {
    if (isadmin && UserName && Name && Department && Mobile && token && public_id) {
        return true
    } else {
        return false
    }
}

export const logout = () => {
    sessionStorage.removeItem('isadmin')
    sessionStorage.removeItem('UserName')
    sessionStorage.removeItem('Name')
    sessionStorage.removeItem('Department')
    sessionStorage.removeItem('Mobile')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('public_id')
}
