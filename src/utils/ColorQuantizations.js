export default (data, n) => {
    let boxes = [getBoundingBox(data)];
    if(n !== 1){
        boxes = cut(boxes[0]);
        while(boxes.length < n){
            const boxId = findBiggestIndex(boxes);
            const splittedBoxes = cut(boxes[boxId]);
            boxes.splice(boxId, 1, splittedBoxes[0], splittedBoxes[1]);
        }
    }
    return getColors(boxes);
}
  
const findBiggestIndex = (boxes) => {
    const [_,maxIndex] = boxes.reduce((maxArea,{ area }, i) => area > maxArea[0] ? [area,i]:maxArea ,[-1,0]);
    return maxIndex;
}
  
const getColors = (colorSets) => {
    const colors = new Array();
    for(let i=0; i<colorSets.length; i++){
        colors.push(getCenterColor(colorSets[i]));
    };
    return colors;
}
  
const getCenterColor = (box) => {
    const amount = box.data.length / 4;
    // find the color in the box thats closest to the center
    return findMostSimilarColor(box.data, [
        Math.round(box.r.count / amount),
        Math.round(box.g.count / amount),
        Math.round(box.b.count / amount) 
    ]);
    // or calculate the median color
    // return [ Math.round(box.r.count/amount), Math.round(box.g.count/amount), Math.round(box.b.count/amount) ];
}
  
const cut = (box) => {
    let [a, b] = [new Array(), new Array()];
    const index = "rgb".indexOf(box.max);
    const median = getMedian(box.data, index);
    
    for(let i=0, l=box.data.length; i<l; i+=4){
        let array = box.data[i+index] < median ? a : b;
        array.push(box.data[i], box.data[i+1], box.data[i+2], box.data[i+3]);
    }
    return [getBoundingBox(a), getBoundingBox(b)];
}
  
const getMedian = (data, offset) => {
    let histogram = new Array(256).fill(0);
    let total = 0;
  
    for (let i = 0, l = data.length; i<l; i+=4, total++){
        let value = data[i+offset];
        histogram[value] += 1;
    }
    
    for (let i = 0, count = 0; i < histogram.length; i++){
        count += histogram[i];
        if(count  > total/2)
            return i;
    }
}
  
const getBoundingBox = (data) => {
    let colors = {
        data : data,
        r : { min : 255, max : 0, count : 0 },
        g : { min : 255, max : 0, count : 0 },
        b : { min : 255, max : 0, count : 0 }
    };
    
    for(let i=0, l=data.length; i<l; i+=4){
        // check r
        if(data[i] < colors.r.min) colors.r.min = data[i];
        if(data[i] > colors.r.max) colors.r.max = data[i];
        colors.r.count += data[i];

        // check g
        if(data[i+1] < colors.g.min) colors.g.min = data[i+1];
        if(data[i+1] > colors.g.max) colors.g.max = data[i+1];
        colors.g.count += data[i+1];

        // check b
        if(data[i+2] < colors.b.min) colors.b.min = data[i+2];
        if(data[i+2] > colors.b.max) colors.b.max = data[i+2];
        colors.b.count += data[i+2];
    } 
    
    // the count can be zero
    colors.r.distance = colors.r.count === 0 ? 0 : colors.r.max - colors.r.min;
    colors.g.distance = colors.g.count === 0 ? 0 : colors.g.max - colors.g.min;
    colors.b.distance = colors.b.count === 0 ? 0 : colors.b.max - colors.b.min;
    
    colors.area = Math.max(colors.r.distance, 1) * Math.max(colors.g.distance, 1) * Math.max(colors.b.distance, 1);
    
    // find longest expansion
    const maxDistance = Math.max(colors.r.distance, colors.g.distance, colors.b.distance);
    
    const colorSet = ["r", "g", "b"];
    for(let swatch in colorSet){
        if(colors[ colorSet[swatch] ].distance === maxDistance){
            colors.max = colorSet[swatch];
            break;
        }
    }
    return colors;
}

const findMostSimilarColor = (data, rgb) => {
    let minDistance = 255*3;
    let index = 0;
    
    for(let i=0, l=data.length; i<l; i+=4){
        const distance = Math.abs(data[i]-rgb[0]) + Math.abs(data[i+1]-rgb[1]) + Math.abs(data[i+2]-rgb[2]);
        if(distance < minDistance){
            minDistance = distance;
            index = i;
        }
    }
    return [data[index], data[index+1], data[index+2]];
}