import React, {useState} from 'react';
import PropTypes from 'prop-types';

export default function TextForm(props) {

  const [text, setText] = useState("Enter thy text");

  const handleOnChange = (event) =>{
    setText(event.target.value);
  }

  const handleUpClick = () =>{
    let newText = text.toUpperCase();
    setText(newText);
    props.handleAlert("Converted to uppercase.","success");
  }
  
  const handleLowClick = () =>{
    let newText = text.toLowerCase();
    setText(newText);
    props.handleAlert("Converted to lowercase.","success");
  }

  const handleExtraSpaceClick = () =>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.handleAlert("Removed extra space.","success");
  }


  const handleSpeechClick = () =>{
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    props.handleAlert("Text to speech activated.","success");
  }

  const handleSpecialChar = () =>{
    let str = text;
    setText(str.replace(/[&//\\#, =+()$~%.'":*?<>{}]/g, ' '));
    props.handleAlert("Removed special characters.","success");
  }

  const handleCopyText = () =>{
    let copiedText = document.getElementById('myBox');
    copiedText.select(); 
    navigator.clipboard.writeText(copiedText.value);
    props.handleAlert("Copied text to clipboard.","success");
  }

  const handleClearClick = () =>{
    let newText = ''
    setText(newText);
    props.handleAlert("All clear boss.","success");
  }


  return (
    <>
    
    <div className='container'>
        <h2 className={`text-${props.mode === 'light' ? 'dark' : 'light'}`}>{props.heading}</h2>
        <div className="mb-3">

        <textarea style={{backgroundColor: props.mode === 'light' ? 'white' : '#3b3b3b',
                          color : props.mode === 'light' ? 'black' : 'white'}} 
        className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>

        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}> Uppercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}> Lowercase</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleSpeechClick}> Speech</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaceClick}> Remove Extra Space</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleSpecialChar}> Remove Special Characters</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopyText}> Copy Text</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClearClick}> Clear</button>
    </div>


    <div className={`container my-3 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
        <h2>Your text summary</h2>

        <p>{text.length > 0 ? text.split(" ").length : 0} {text.split(" ").length === 1? 'word' : 'words'} and {text.length} characters</p>

        <p> {text.split(" ").length * 0.008} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length>0? text : "Enter something to preview..."}</p>
    </div>
    </>
  )
}

TextForm.propTypes = {
    heading : PropTypes.string.isRequired,
}

