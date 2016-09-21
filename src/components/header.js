import React from 'react';
import logo from '../images/logo.svg';

const Header = (props) => {
    return (
        <div>
            <div className="App-header">
                <table>
                    <tr>
                    <td className="App-intro" width="10px">
                            <img src={logo} className="App-logo" alt="logo" />
                        </td>
                        <td className="App-intro" width="200px">
                            ForeMan
                        </td>
                         <td width="*">
                            Welcome, Jay Jenkins
                        </td>
                    </tr>
                   
                </table>


            </div>

        </div>
    );
};

export default Header;