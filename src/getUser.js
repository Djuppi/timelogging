export const getUser = () => {   
    return JSON.parse(localStorage.getItem('this_user'));
}