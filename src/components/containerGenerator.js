const generateContainer = (modalId, containerId) => {
  const containerDomNode = document.createElement('div');
  let rand;
  if (modalId) {
    rand = modalId;
  } else {
    rand = Math.floor(Math.random() * 100000 + 1);
  }
  containerDomNode.setAttribute('id', `app-modal-${rand}`);
  if (containerId) {
    document.getElementById(containerId).appendChild(containerDomNode);
  } else {
    document.body.appendChild(containerDomNode);
  }
  return { containerDomNode, rand };
};

export default generateContainer;
