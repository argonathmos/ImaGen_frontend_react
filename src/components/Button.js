import classes from './Button.module.css'

const Button = props => {

    return(
        <div className={classes.BtnContainer}>
            <button value={props.searchTerms}
                    onClick={(evt) => props.btnClickHandler(evt)}
                    disabled={props.fetching === 'pending'}
            >{props.children}</button>
        </div>
    )
}


export default Button;