import React from 'react';
import './button.scss';

const Button = ({name}) => {
    return (
        <button className="btn">
            {name}
        </button>
    )
}

export default Button;