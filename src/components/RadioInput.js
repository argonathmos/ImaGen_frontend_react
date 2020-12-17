import React from 'react';
import classes from './RadioInput.module.css';

const RadioInput = (props) => {
    return(
        <div className={classes.RadioContainer}>
            <input type="radio"
                    name="filters"
                    id={props.inputValue} /* input id needs to be eaual to label for */
                    value={props.inputValue}
                    checked={props.isChecked}
                    onChange={(evt) => props.handleInputChange(evt)} 
                     />
            <label className={classes.RadioLabel} htmlFor={props.inputValue} > 
                <span>{props.first}<br/>{props.last}</span>
                <img src={props.logo} alt={props.inputValue}/>
            </label>
        </div>
    )
}

export default RadioInput;