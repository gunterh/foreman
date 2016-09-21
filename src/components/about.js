import React from 'react';
import logo from '../images/ProcessFlow.png';
import firebasereact from '../images/reactfirebase.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const About = (props) => {
    return <div>

         <img src={logo} alt="logo"/>
         <img src={firebasereact} alt="firebasereact"/>

    </div>;
};

export default About;