import React, { ReactElement, useState } from "react";
import Input from "../UIComponents/Input";
import classes from "./Person.module.css";

interface formElement {
    id:string, 
    config:any,
}

const PersonData = (props: any) => {

    const [personFormState, setPersonFormState] = useState<any>();

    setPersonFormState({
                        firstName: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                name: 'firstName',
                                placeholder: 'Enter with your first name', 
                                title: 'Enter with your first name',
                            },
                            value: '',
                        },
                        lastName: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                name: 'lastName',
                                placeholder: 'Enter with your last name', 
                                title: 'Enter with your last name',
                            },
                            value: '',
                        },
                        email: {
                            elementType: 'input',
                            elementConfig: {
                                type: 'email',
                                name: 'eamail',
                                placeholder: 'Enter with your email', 
                                title: 'Enter with your email',
                            },
                            value: '',
                        },
                        // Phones: [
                        //     {
                        //         phoneType: {
                        //             elementType: 'select',
                        //             elementConfig: {
                        //                 options: [
                        //                             {values: 'phone', displayValue: 'Phone'}, 
                        //                             {values: 'cellphone', displayValue: 'Cell Phone'},
                        //                         ]
                        //             },
                        //             value: '',
                        //         },
                        //         phone: {
                        //             elementType: 'input',
                        //             elementConfig: {
                        //                 type: 'phone',
                        //                 name: 'phone',
                        //                 placeholder: 'Enter with your phone', 
                        //                 title: 'Enter with your phone',
                        //             },
                        //             value: '',
                        //         },
                        //     }
                        // ]
                    });

              

    const personFormStateToArray = () => {
        const arr = [];

        for(let key in personFormState){
            arr.push({
                id: key,
                config: personFormState[key],
            })
        }

        return arr;

    }

    const formElementsArray = personFormStateToArray();

    return <form className={classes.personForm}>
            {formElementsArray.map((formElement: formElement) => (
                console.log(formElement.config),
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value} />
                )
            )}
            <button type="submit" title="Button submit person">submit</button>
            </form>
}

export default PersonData;