import firebase from "../../firebase";
import Person from "../../Interfaces/Person"

export const addPerson = (person: Person) => {
    try {
        firebase.ref("/person").push().set(person);
    } catch (error) {
        console.log(error);
    }
}

export const listPersons = () => {
    try {
        const results = firebase.ref('/person').on('value', data => {
            if(!data.val()){
                return;
            }
            return data.val();
        });
    } catch (error) {
        console.log(error);
    }
}