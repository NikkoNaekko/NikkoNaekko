import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';

const ItemDescription = () => {
    const item = useSelector(state => state.items.selectedItems);

    let str = item.explain;
    const br = '<br>'
    useEffect(() => {
       if(item.explain){
           str = lineUp(str,br);
           document.querySelector('.description').innerHTML = str;
       }
        
    }, [item])
    return (
        <div className="descriptionBorder">
            <p className="description"></p>
        </div>
    )
}

String.prototype.replaceAt=function(index, char) {
    return this.substr(0, index + 1) + char + this.substr(index + 1, this.length);
}
function lineUp (originalStr, replaceStr) {
    const LENGTHLIMIT = 14;
    let count = 0;
    for(let i = 0; i < originalStr.length; i++){
        if(LENGTHLIMIT < count && originalStr[i] === ' '){
            originalStr = originalStr.replaceAt(i,replaceStr)
            i += replaceStr.length - 1;
            count = 0;
        } else if (originalStr[i] === '.' || originalStr[i] === ',' || originalStr[i] === '!'){
            originalStr = originalStr.replaceAt(i,replaceStr)
            i += replaceStr.length - 1;
            count = 0;
        }
        count++;
    }
    return originalStr;
}
export default ItemDescription