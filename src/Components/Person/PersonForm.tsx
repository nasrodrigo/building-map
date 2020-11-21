import React, { useState } from "react";
import Person, { Contact, Phone, Coordinate, person, contact, possition, phone } from "../../Interfaces/Person";
import { addPerson } from "../../Services/PersonService/PersonService";

import classes from "./Person.module.css";

const PersonForm = () => {

    const [personState, setPersonState] = useState<Person>(person);
    const [contactState, setContactState] = useState<Contact>(contact);
    const [possitionState, setPossitionState] = useState<Coordinate>(possition);
    const [phoneState, setPhoneState] = useState<Phone>(phone);

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        for(let key in personState){
            if(key === event.target.name){
                setPersonState({
                    ...personState,
                    [event.target.name]: event.target.value,
                });
            }else if(event.target.name === 'email'){
                contactState.email = event.target.value;
                setContactState({
                    ...contactState 
                });
                setPersonState({
                    ...personState,
                    contact: contactState
                });
            }else if(event.target.name === 'phoneType'){
                phoneState.phoneType = event.target.value;
                setContactState({
                    ...contactState,
                    phone: phoneState
                });
                setPersonState({
                    ...personState,
                    contact: contactState
                });
            }else if(event.target.name === 'phoneNumber'){
                phoneState.phoneNumber = event.target.value;
                setContactState({
                    ...contactState,
                    phone: phoneState
                });
                setPersonState({
                    ...personState,
                    contact: contactState
                });
            }else if(event.target.name === 'possitionX'){
                possitionState.x = +event.target.value;
                setPossitionState({
                    ...possitionState
                });
                setPersonState({
                    ...personState,
                    possition: possitionState
                });
            }else if(event.target.name === 'possitionY'){
                possitionState.y = +event.target.value
                setPossitionState({
                    ...possitionState
                });
                setPersonState({
                    ...personState,
                    possition: possitionState
                });
            }

        } 

    }

    const addPersonHandler = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault;

        if(!person){
            return;
        }

        addPerson(personState);
        
    }

    return <>
                <form className={classes.personForm} onSubmit={addPersonHandler}>
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
                        <input type="text" name="email" value={personState.contact? personState.contact.email : undefined} onChange={inputChangeHandler} id="email" placeholder="Email" title="Field email"/>
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
                    {/* <div className={classes.hideContent}> */}
                    <div>
                        <input name="possitionX" value={personState.possition? personState.possition.x : undefined} readOnly/>
                        <input name="possitionY" value={personState.possition? personState.possition.y : undefined} readOnly/>
                    </div>
                    <div>
                        <button type="submit" title="Button submit person">submit</button>
                    </div>
                </form>
            </>

}

export default PersonForm;