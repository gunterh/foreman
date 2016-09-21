import React from 'react';

const style = {
    container: {
        width: '100%',
        textAlign: 'left',
        heigth: '50px'
    },
    element: {

    }
};

const PlanSelector = (props) => {
    let name;

    const onNameChange = (e) => {
        name = e.target.value;
    };

    const onClick = (e) => {
        props.onClick(e, name);
    };

    return (
        <div style={style.container}>
            <input style={style.element} onChange={onNameChange} type="text"/>
            <button  style={style.element} onClick={onClick}>Create new plan</button>
            <div>
                <select>
                    {props.plans.map((plan) => {
                        return <option key={plan.id} value={plan.id}>{plan.scopes[0].name}</option>;
                    }) }
                </select>
            </div>
        </div>
    );
};

export default PlanSelector;