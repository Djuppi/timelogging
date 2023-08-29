import { getUser } from "./getUser";

export const getProjects = () => {

    if(typeof window !== 'undefined') {
        const { username } = getUser();
        return JSON.parse(localStorage.getItem(`${username}_projects`));
    } else {
        return []
    }
}