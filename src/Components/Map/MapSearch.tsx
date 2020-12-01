import React, { useState, useEffect } from "react";
import Person from "../../Interfaces/Person";

import classes from "./Map.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  { faSearch } from "@fortawesome/free-solid-svg-icons";

const MapSearch = (props: any) => {

    const searchIcon = <span className={classes.icon}><FontAwesomeIcon icon={faSearch} className="fas fa-lg" /></span>;

    const [searchInputState, setSearchInputState] = useState<string>("");
    const [personListState, setPersonListState] = useState<Person[]>([]);
    
    let listOptions: string[] = [];

    const listPersonHandler = () => {

        props.personList.forEach((person: Person) => {
            setPersonListState([...personListState, person])
        });
    
    }

    useEffect(() => {
        
        listPersonHandler();

    }, [props.personList]);

    const searchInputOptions = () => {

        personListState.forEach((person: Person) =>  {
            if(!person.firstName){
                return;
            } 
            
            if(!searchInputState){
                return;
            }    
            
            if(person.firstName.toLowerCase().indexOf(searchInputState.toLowerCase()) > -1){
                listOptions.push(person.firstName + " " + person.lastName);
            }
            
        });

        return <ul className={classes.options}>
            {listOptions.map((optionName: string) => {
                return (
                    <li className={classes.optionList} key={optionName} onClick={optionClickHandler}>
                        {optionName}
                    </li>
                );
            })}
        </ul>;
        
    }

    const optionClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {

        setSearchInputState(event.currentTarget.innerText);

    }

    const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

        setSearchInputState(event.target.value);

    }

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        
        props.formSubmit(searchInputState);
        
    }

    return <div>
            <form onSubmit={formSubmitHandler}>
                <div className={classes.searchContainer}>
                    <input autoComplete="off" onChange={searchInputHandler} value={searchInputState} type="text" name="search-input" />
                    <button type="submit" className={classes.searchButton}>{searchIcon}</button>
                </div>
            </form>
            {searchInputOptions()}
        </div>;
}

export default MapSearch;