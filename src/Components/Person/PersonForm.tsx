import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Person, { Contact, Phone, Coordinate, person, contact, possition, phone } from "../../Interfaces/Person";
import firebase from "../../firebase";

import classes from "./Person.module.css";

interface FeedbackMessage {
    msg: string,
    color: string
}

const PersonForm = (props: any) => {

    const feedbackMessage = useRef<HTMLDivElement>(null);
    
    const [personState, setPersonState] = useState<Person>(person);
    const [contactState, setContactState] = useState<Contact>(contact);
    const [phoneState, setPhoneState] = useState<Phone>(phone);
    const [feedbackMessageState, setFeedbackMessageState] = useState<FeedbackMessage>({msg: "", color: ""});
    
    useEffect(() => {

        if(props.personUpdate.id) setPersonState(props.personUpdate);

    }, [props.personUpdate]);

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
            }

        } 

    }

    const removePersonHandler = (id: string) => {

        if(!feedbackMessage.current){
            return;
        }

        firebase.ref("/person").child(id).remove();
        setFeedbackMessageState({msg: "Removed successfully", color: "blue"});
        feedbackMessage.current.style.display = "block";
        setTimeout(() => {props.showPersonForm(false)}, 2000);

    }

    useEffect(() => {

        if(props.personRemove) removePersonHandler(props.personRemove);

    }, [props.personRemove]);

    const addPersonHandler = (event: React.FormEvent<HTMLFormElement>) => {

        if(!personState){
            return;
        }

        if(!feedbackMessage.current){
            return;
        }

        if(personState.id){
            firebase.ref("/person").child(personState.id).set(personState);
            return
        }

        if(!personState.firstName && !personState.lastName){
            event.preventDefault();
            setFeedbackMessageState({msg: "Fields first and last name must be filled", color: "red"});
            feedbackMessage.current.style.display = "block";
            return;            
        }

        if(personState.contact? !personState.contact.email : false){
            event.preventDefault();
            setFeedbackMessageState({msg: "Fields email must be filled", color: "red"});
            feedbackMessage.current.style.display = "block";
            return;            
        }

        try {
            event.preventDefault();
            firebase.ref("/person").push().set(personState);
            setFeedbackMessageState({msg: "Saved successfully", color: "blue"});
            feedbackMessage.current.style.display = "block";
            setTimeout(() => {props.showPersonForm(false)}, 2000);
        } catch (error) {
            event.preventDefault();
            setFeedbackMessageState({msg: "Error", color: "red"});
            feedbackMessage.current.style.display = "block";
        }
        
    }

    const listPersonHandler = () => {

        const results = firebase.ref('/person').on('value', data => {
            if(!data.val()){
                return;
            }

            let personData = data.val(); 
            let person: Person;
            let listPerson: Person[] = [];

            for(const key in personData){
                person = personData[key];
                person.id = key;
                listPerson.push(person);
                props.setPersonListState([...listPerson]);
            }

        });

    }

    useEffect(() => {

        listPersonHandler();

    }, []);

    const btnCancelHandler = () => {

        setFeedbackMessageState({msg: "", color: ""});
        
        props.showPersonForm(false);
    }

    return <>
            <form className={classes.personForm} onSubmit={addPersonHandler}>
                <div ref={feedbackMessage} className={classes.feedbackMessage}>
                    <a style={{color: feedbackMessageState? feedbackMessageState.color : undefined}}>{feedbackMessageState? feedbackMessageState.msg : undefined}</a>
                </div>
                <div>
                    <input type="text" 
                        name="firstName" 
                        value={personState.firstName} 
                        onChange={inputChangeHandler} 
                        id="first-name" 
                        placeholder="First Name *" 
                        title="Field name"/>
                </div>
                <div>
                    <input type="text" 
                        name="lastName" 
                        value={personState.lastName} 
                        onChange={inputChangeHandler} 
                        id="last-name" 
                        placeholder="Last Name *" 
                        title="Field name"/>
                </div>
                <div>
                    <input type="text" 
                        name="email" value={personState.contact? personState.contact.email : undefined} 
                        onChange={inputChangeHandler} 
                        id="email" 
                        placeholder="Email *" 
                        title="Field email"/>
                </div>
                <div>
                    <select name="phoneType" value={personState.contact? personState.contact.phone? personState.contact.phone.phoneType : undefined : contactState.phone? contactState.phone.phoneType : undefined} 
                    onChange={inputChangeHandler}>
                        <option value="phone">Phone</option>
                        <option value="cellphone">Cell Phone</option>
                    </select>
                    <input type="phone" 
                        value={personState.contact? personState.contact.phone? personState.contact.phone.phoneNumber : undefined : contactState.phone? contactState.phone.phoneNumber : undefined} 
                        onChange={inputChangeHandler} 
                        name="phoneNumber" 
                        id="phone" 
                        placeholder="Phone number" 
                        title="Field phone"/>
                </div>
                <div>
                    <button onClick={btnCancelHandler} type="reset" title="Button cancel submit">Cancel</button>
                    <button type="submit" title="Button submit person">{personState.id? "Update" : "Create"}</button>
                </div>
            </form>
        </>

}

export default PersonForm;