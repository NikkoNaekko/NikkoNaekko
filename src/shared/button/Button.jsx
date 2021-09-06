import React from 'react';
import './button.scss';

const Button = ({name, isDisabled}) => {
    return (
        <button className="btn" style={{'backgroundColor' : `${isDisabled ? 'var(--color-button-gray)' : '--color-button-pink'}`}}>
            {name}
        </button>
    )
}

export default Button;