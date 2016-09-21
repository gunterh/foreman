import React from 'react';
import logo from '../images/ProcessFlow.png';
import pricing from '../images/Pricing.png';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const RegisterPage = (props) => {
    return <div>

        <table align="center">
            <tr>
                <td>
                     <img src={pricing} alt="Pricing"/>
                </td>

               
            </tr>
            <tr>
                <td>
                     <RaisedButton label="Subscribe" style={style} primary={true} onClick="javascript:alert('not implemented')" /> 
                </td>

            </tr>
        </table>

    </div>;
};

export default RegisterPage;