import React from 'react';
import Item from './Item';
import ItemTitle from './ItemTitle';

const VerticalList = ({selectedItem}) => {
    return (
        <div className="verticalList">
            {selectedItem.map((item)=>(
                <div className="listItem" key={item.id}>
                    <Item item={item} />
                    <ItemTitle title={item.mood}/>
                </div>
            ))}
        </div>
    )
}

export default VerticalList;