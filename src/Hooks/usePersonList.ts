import { useEffect, useState } from "react";
import Person from "../Interfaces/Person";
import { getPersons } from "../Servers/PersonServer";

const usePersonList = () => {

    const [personListState, setPersonListState] = useState<Person[]>([]);
    
    const personMap = (data: any): Person => {
        const person: Person = {
            id: data[0],
            ...data[1],
        };
        return person;
    };

    useEffect(() => {
        getPersons().then((data) => {
            if (!data) {
                return;
            }
            let personList: Person[] = [];
            for (let key in data) {
                personList.push(personMap([key, data[key]]));
            }
            setPersonListState(personList);
        });

    }, []);
    
    return personListState;
};

export default usePersonList;