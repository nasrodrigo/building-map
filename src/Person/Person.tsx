import React, { ChangeEvent, useEffect, useState, useContext } from "react";
import classes from "./Person.module.css";
import firebase from "../firebase";

import { MapPersonListContext } from "../Map/Map";

export interface Person {
    id?: string;
    firstName?: string;
    lastName?: string;
    contact?: Contact;
    login?: Login;
    photo?: string;
    possition?: Coordinate;
} 

export interface Contact {
    id?: string;
    phone?: Phone;
    email?: string;
}

export interface Phone {
    phoneNumber?: string;
    phoneType?: string;
}

export interface Login {
    id?: string;
    login?: string;
    password?: string;
    isAdmin?: boolean;
}

export interface Coordinate {
    id?: string;
    x: number;
    y: number;
}

export let possition: Coordinate = {
    x: 0,
    y: 0,
}

let phone: Phone = {
    phoneNumber: undefined,
    phoneType: undefined,
}

let contact: Contact = {
    phone: phone,
    email: undefined,
};

let person: Person = {
    firstName: undefined,
    lastName: undefined,
    contact: contact,
    possition: possition,
};

export const PersonForm = (props: any) => {

    const mapPersonList = useContext(MapPersonListContext);

    const [personState, setPersonState] = useState<Person>(person);
    const [personListState, setPersonListState] = useState<[Person]>([person]);
    const [contactState, setContactState] = useState<Contact>(contact);
    const [possitionState, setPossitionState] = useState<Coordinate>(possition);
    const [phoneState, setPhoneState] = useState<Phone>(phone);

    useEffect(() => {
        const results = firebase.ref('/person').on('value', data => {
            if(!data.val()){
                return;
            }
            let personData = data.val();
            let personArray:[Person];

            for(const key in personData){
                person = personData[key];
                person.id = key;
                personListState.push(person);
            }

            mapPersonList.updatePersonList(personListState);

        });

    }, []);

    const addPersonDB = (props: any) => {

        firebase.ref("/person").push().set(personState);

        props.preventDefault();

    }

    const inputChangeHandler = (props: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        for(let key in personState){
            if(key === props.target.name){
                setPersonState({
                    ...personState,
                    [props.target.name]: props.target.value,
                });
            }else if(props.target.name === 'email'){
                setContactState({
                    ...contactState,
                    email: props.target.value,
                });
                setPersonState({
                    ...personState,
                    contact: contactState
                });
            }else if(props.target.name === 'phoneType'){
                phoneState.phoneType = props.target.value;
                setContactState({
                    ...contactState,
                    phone: phoneState,
                });
                setPersonState({
                    ...personState,
                    contact: contactState,
                });
            }else if(props.target.name === 'phoneNumber'){
                phoneState.phoneNumber = props.target.value;
                setContactState({
                    ...contactState,
                    phone: phoneState,
                });
                setPersonState({
                    ...personState,
                    contact: contactState,
                });
            }else if(props.target.name === 'possitionX'){
                setPossitionState({
                    ...possitionState,
                    x: +props.target.value
                });
                setPersonState({
                    ...personState,
                    possition: possitionState,
                });
            }else if(props.target.name === 'possitionY'){
                setPossitionState({
                    ...possitionState,
                    y: +props.target.value
                });
                setPersonState({
                    ...personState,
                    possition: possitionState,
                });
            }

        } 
    }

    return <div >
                <form method="POST" className={classes.personForm} onSubmit={addPersonDB}>
                    <div>
                        <label htmlFor="name">Name </label>
                        <input type="text" name="firstName" value={personState.firstName} onChange={inputChangeHandler} id="first-name" placeholder="Name" title="Field name"/>
                    </div>
                    <div>
                        <label htmlFor="name">Name </label>
                        <input type="text" name="lastName" value={personState.lastName} onChange={inputChangeHandler} id="last-name" placeholder="Name" title="Field name"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email </label>
                        <input type="email" name="email" value={personState.contact? personState.contact.email : undefined} onChange={inputChangeHandler} id="email" placeholder="Email" title="Field email"/>
                    </div>
                    <div>
                        <label htmlFor="phone-type">Phone Type</label>
                        <select name="phoneType" value={contactState.phone?contactState.phone.phoneType : undefined} onChange={inputChangeHandler}>
                            <option value="phone">Phone</option>
                            <option value="cellphone">Cell Phone</option>
                        </select>
                        <label htmlFor="phone">Phone </label>
                        <input type="phone" value={contactState.phone?contactState.phone.phoneNumber : undefined} onChange={inputChangeHandler} name="phoneNumber" id="phone" placeholder="Phone" title="Field phone"/>
                    </div>
                    <div className={classes.hideContent}>
                        <input name="possitionX" value={personState.possition? personState.possition.x : undefined} readOnly/>
                        <input name="possitionY" value={personState.possition? personState.possition.y : undefined} readOnly/>
                    </div>
                    <div>
                        <button type="submit" title="Button submit person">submit</button>
                    </div>
                </form>
            </div>
};

export default Person;