import './App.css';
import Alert from './components/Alert';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import React,{useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App(){

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() =>{
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = '#3b3b3b';
      handleAlert(" Dark mode has been enabled", "success");
      document.title = "Textutils-Dark Mode";
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      handleAlert(" Light mode has been enabled", "success");
      document.title = "Textutils-Light Mode";
    }
  };

  return (
    <>
      <Router>
        <Navbar title="Textutils" aboutText="About Textutils" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
          {/* exact keyword is used so that exact matching is done otherwise 
          react will do partial matching
          /users --> component 1
          /users/names --> component2
          Then on typing users/names/ --> component 1 will be rendered is
          'exact' is not mentioned */}
            <Route exact path='/' element={<TextForm heading="Enter the text to analyse" mode={mode} handleAlert={handleAlert} />} />
            <Route exact path='/about' element={<About />} />
          </Routes>
        </div>
      </Router>
    
    </>
  );
}
export default App;
