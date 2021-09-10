import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './button.scss';

const Button = ({name, isDisabled, title, history}) => {

    if( title === "recommend" ) {
        return (
            <button 
                className={ isDisabled ? `btn btn_gray` : `btn btn_pink` } 
                onClick={() => history.push('/recommendResult')}
            >{name}
            </button>
        )

    } else if( title === "recommendResult" ) {
        return (
            <button 
                className="btn"
                onClick={() => history.push('/main')}
            >{name}
            </button>
        )

    } else {
        return (
            <button 
                className="btn" 
                // style={{'backgroundColor' : `${isDisabled ? 'var(--color-button-gray)' : '--color-button-pink'}`}}
                onClick={() => history.push('/main')}
            > {name}
            </button>
        )
    }
}

Button.defaultProps = {
    isDisabled : true,
}

export default withRouter(Button);