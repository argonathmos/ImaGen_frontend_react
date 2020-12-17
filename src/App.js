import React, { useState } from 'react'
import axios from 'axios'
// Components
import ImageDisplay from './components/ImageDisplay'
import RadioInput from './components/RadioInput'
import Button from './components/Button'
import GithubLink from './components/GithubLink'
// Images
import startImg from './assets/images/start-img.jpg';
import pixabayLogo from './assets/images/pixabay_logo_square.svg';
import ddgLogo from './assets/images/ddg_logo.svg'
import tumblrLogo from './assets/images/tumblr_logo.png'


export const RADIO_INPUTS = [
    { inputValue: 'pixabay', logo: pixabayLogo, first: 'Lady', last: 'P'  },
    { inputValue: 'duckduckgo', logo: ddgLogo, first: 'Lady', last: 'D'  },
    { inputValue: 'tumblr', logo: tumblrLogo, first: 'Mr', last: 'Tumblr'  }
]
const HOT_DRINKS = ['coffee', 'tea', 'soup'];
const TRANSPORTS = ['bicycle', 'scooter', 'skateboard'];
const DINNERS = ['fastfood', 'fish', 'veggies'];
const NATURE = ['field', 'lake', 'montain', 'sea'];

export default function App() {
    // enpoint = 'pixabay' && 'duckduckgo' && 'tumblr'
    const [endpoint, setEndpoint] = useState('pixabay'); // pixabay radio input will be checked by default
    const [searchTerm, setSearchTerm] = useState('');
    const [fetch, setFetch] = useState(''); //fetch = '' && 'pending' && 'resolved' && 'rejected'
    const [imgSrc, setImgSrc] = useState(startImg);

    const radioInputList = RADIO_INPUTS.map(ri => {
        return <RadioInput 
                    key={ri.inputValue}
                    logo={ri.logo}
                    first={ri.first}
                    last={ri.last}
                
                    inputValue={ri.inputValue}
                    isChecked={ri.inputValue === endpoint} //true or false
                    handleInputChange={handleInputChange}
            />
    })
    function handleInputChange(evt){
        console.log(evt.target.value);
        setEndpoint(evt.target.value);
    }

    function btnClickHandler(evt){
        const newSearchTerm = randomWord(evt.target.value.split(' '));
        setSearchTerm(prevSearchTerm => newSearchTerm);
        setFetch('pending');
        axios
            .get(`https://imagen-rest-api.herokuapp.com/${endpoint}?q=${newSearchTerm}`)
            .then(response => {
                setImgSrc(response.data.src);
                setFetch('resolved');
            })
            .catch(error => {
                setFetch('rejected');
                
            }
            )

    }

    // Generates a random element from an array argument.
    const randomWord = array => {
        const word = array[Math.floor(Math.random() * array.length)];
        return word;
    }

    const imgLoadHandler = () => {
        console.log(imgSrc);
        if(imgSrc.includes('/static')){
            return;
        }
        setFetch('loaded');
        
    }
  return (
    <div className="App">
        <ImageDisplay fetching={fetch} imageSrc={imgSrc} endpoint={endpoint} searchTerm={searchTerm} imgLoadHandler={imgLoadHandler}/>
        
        <div className='RadiosContainer'>
            {radioInputList}
        </div>
        
        <div className='ButtonsContainer'>
            <Button searchTerms={HOT_DRINKS.join(' ')} btnClickHandler={btnClickHandler} fetching={fetch}>I want a hot drink !</Button>
            <Button searchTerms={TRANSPORTS.join(' ')} btnClickHandler={btnClickHandler} fetching={fetch}>No public transports today ?</Button>
            <Button searchTerms={DINNERS.join(' ')} btnClickHandler={btnClickHandler} fetching={fetch}>What should I eat tonight ?</Button>
            <Button searchTerms={NATURE.join(' ')} btnClickHandler={btnClickHandler} fetching={fetch}>Show me something great !</Button>
        </div> 

        <GithubLink />

    </div>
  );
}


