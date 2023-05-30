export const createImage = (src: string) => {
    const image: HTMLImageElement = new Image();
    image.src = src;
    return image
};

export const getLogedUser = () => {
    let user: any = {userName: '', isAdmin: false};
    for(let item of window.location.search.split('?')[1].split('&')){
        for(let key of Object.keys(user)){
            if(key === item.split('=')[0]){
                user[key] = key === "isAdmin" ? item.split('=')[1] === "true" : item.split('=')[1];
            }
        };
    };
    return user;
};