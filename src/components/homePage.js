import React from 'react';
import logo from '../images/ProcessFlow.png';
import pricing from '../images/Pricing.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const HomePage = (props) => {
    return <div>

        <table align="center" >
            <tr>
                <td>
                    Login
                    <br></br>
                    <br></br>
                    <TextField id="username" hintText="enter your username..." /><br />
                    <TextField id="password" hintText="password" /><br />
                </td>

               
            </tr>
            <tr>
                <td>
                     <RaisedButton label="Login" style={style} primary={true}  /> 
                      <RaisedButton label="Register" style={style} primary={true} onClick={()=>props.history.push('/register')} /> 
                </td>

            </tr>
        </table>

    </div>;
};

export default HomePage;