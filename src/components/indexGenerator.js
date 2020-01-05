let indices = [];
let currentIndex = null;

const getCurrentIndex = () => currentIndex;

const updateIndices = (index) => indices.push(index);

export {getCurrentIndex, updateIndices}