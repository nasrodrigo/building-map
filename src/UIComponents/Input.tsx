import React from "react";
import classes from "./Input.css";

const Input = (props: any) => {

    let inputElement = undefined;

    switch (props.inputtype) {
        case ('input') :
            inputElement = <input className={classes.inputElement} 
                            {...props.elementConfig}
                            onChange={props.action}
                            value={props.value} />;

            break;
        case ('textarea') :
            inputElement = <textarea className={classes.inputElement} 
                            {...props.elementConfig}
                            onChange={props.action}
                            value={props.value}>
                            </textarea>;

            break;
        case ('select') :
            inputElement = <select className={classes.inputElement} 
                           value={props.value} 
                           onChange={props.action}>
                                {props.options.map((option: any) => {
                                    return <option value={option.value}>
                                                {option.displayValue}
                                            </option>
                                })}               
                            </select>;

            break;
        default:
            inputElement = <input className={classes.inputElement} 
                            {...props.elementConfig}
                            value={props.value} />;
        
            break;
    }

    return <div>
                <label>{props.label}</label>
                {inputElement}
            </div>

};

export default Input;