import React from 'react';

const Header = ({title}) => {
    return (
        <div>
            <span className="recommnedTitle">{title}</span>
        </div>
    )
}

Header.defaultProrps = {
    title: null,
}

export default Header;