import React from 'react';
import {Link} from 'react-router';

const LeftMenu = (props) => {
    const renderCategory = (category) => {
        return (
            <li key={category.id}>
                <div>{category.name}</div>
                <div>{category.categories.map(renderCategory) }</div>
            </li>
        );
    }
    return (
        <div className='NavMenu'>
            <div><Link to='/plan'>Go to Plan</Link></div>
            <div><Link to='/valueseries'>Go to Value Series</Link></div>
            <ul>
                {props.categories.map(renderCategory) }
            </ul>
        </div>
    );
};

export default LeftMenu;