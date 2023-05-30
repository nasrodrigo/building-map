import firebase from "../firebase";

export const getPerson = async (id: string) => {
    let result = null;
    try {
        result = firebase.ref('/person/' + id);
    } catch (error) {
        console.log(error);
    }
    return result;
 };

export const getPersons = async () => {
    let result = null;
    try {
        result = (await firebase.ref('/person').get()).val();
    } catch (error) {
        console.log(error);
    }
    return result;
};

export const addPerson = async (person: any) => {
    let result = null;
    try {
        await firebase.ref("/person").push().set(person);
        result = "success";
    } catch (error) {
        result = "error";
        console.log(error);
    }

    return result;
};

export const updatePerson = async (person: any) => {
    let result = null;
    try {
        await firebase.ref("/person").child(person.id).set(person);
        result = "success";
    } catch (error) {
        result = "error";
        console.log(error);
    }
    
    return result;
};

export const deletePerson = async (id: string) => {
    try {
        await firebase.ref("/person").child(id).remove();
    } catch (error) {
        console.log(error);
    }
};