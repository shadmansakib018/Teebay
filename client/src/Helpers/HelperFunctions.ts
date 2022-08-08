export const CheckLoggedIn = () => {
    return localStorage.getItem("username") ? true : false
}