export const addProject = (projectTitle, user) => {

    const validateFields = () => {
        return projectTitle !== '';
    }

    if(validateFields() && typeof window !== 'undefined') {
        const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'))
        console.log(isLoggedIn)
        
        if(!isLoggedIn) {
            return {error: 'Du er ikke logget inn'};
        }

        const prevStore = JSON.parse((localStorage.getItem(`${user}_projects`)));
    
        const projectArr = [];
        
        if(prevStore) {
            if(prevStore?.includes(projectTitle)) {
                return {projects: prevStore, error: 'Prosjekt finnes allerede'};
            } else {
                prevStore?.push(projectTitle);
                localStorage.setItem(`${user}_projects`, JSON.stringify(prevStore));
                return {projects: prevStore, message: `${projectTitle} lagt til!`};
            }
        } else {
            projectArr.push(projectTitle);
            localStorage.setItem(`${user}_projects`, JSON.stringify(projectArr));
        }
        return {projects: projectArr, message: `${projectTitle} lagt til!`};
    }
} 
