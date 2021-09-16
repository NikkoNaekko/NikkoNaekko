import React, {useEffect} from 'react'
import { clothes } from '../../../data/data';

const ItemDescription = () => {
    const {clothesData} = clothes;
    let str = clothesData[31].product_explain;
    let br = '<br>'
    useEffect(() => {
       
        str = lineUp(str,br);
        document.querySelector('.description').innerHTML = str;
        
    }, [])
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