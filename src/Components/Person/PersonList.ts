// import { useEffect, useState } from "react";
import Person from "../../Interfaces/Person";
import { getPersons } from "../../Servers/PersonServer";
// import { get } from "http";

export const personMap = (data: any): Person => {
    const person: Person = {
        id: data[0],
        ...data[1],
    };
    return person;
};

export const getPersonList = async () => {
    let personList: Person[] = [];
    
    await getPersons().then((data) => {
        if (!data) {
            return;
        }
        for (let key in data) {
            personList.push(personMap([key, data[key]]));
        }
    });
    
    return personList;

};