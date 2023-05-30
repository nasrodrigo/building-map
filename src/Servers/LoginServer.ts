import firebase from "../firebase";

export const getUsers = async () => {
    let result = null;
    try {
        result = (await firebase.ref("/login").get()).val();
    } catch (error) {
        console.log(error);
    }
    return result;
};