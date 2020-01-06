let indices = [];

const getCurrentIndex = () => {
  if (indices.length === 0) return null;
  else return indices[indices.length - 1];
}

const updateIndices = (index) => indices.push(index);

export {getCurrentIndex, updateIndices}