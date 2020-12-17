import React from 'react';
import classes from './ImageDisplay.module.css';
import { RADIO_INPUTS } from '../App';

const ImageDisplay = (props) => {
    const imgElem = <img onLoad={props.imgLoadHandler} className={classes.RandomImg} src={props.imageSrc} alt='randomly generated'/>;
    const spinnerElem = (
        <div className={classes.spinner}>
            <div className={classes.bounce1}></div>
            <div className={classes.bounce2}></div>
            <div className={classes.bounce3}></div>
        </div>
    );
    // Wating for the image to be loaded to display message answers (fetch is first resolved then loaded)
    let message = 'Meet Lady P, Lady D and M. Tumblr, you can ask them anything!';
    const title = RADIO_INPUTS.filter(ri => ri.inputValue === props.endpoint)[0];

    if(props.fetching === 'pending' || props.fetching === 'resolved'){
        message = `Asking ${title.first} ${title.last}... `
    }else if(props.fetching === 'loaded'){
        message = `${title.first} ${title.last} says: ${props.searchTerm} time ! `
    }else if(props.fetching === 'rejected'){
        message = `Sorry, ${title.first} ${title.last} is in a bad mood today. `
    }
    return(
        <div className={classes.ImageDisplay}>
            <h2 className={classes.Message}>{message}</h2>
            {props.fetching ==='pending' ? spinnerElem : imgElem}
        </div>
    )
}

export default ImageDisplay;