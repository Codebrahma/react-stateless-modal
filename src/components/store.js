import Modal from "./modal";

let ids = [];
let modalCount = 0;
let removeRequestCount = 1;
let stackHeight = 0;

const updateIds = (id) => {
  ids.push(id);
  modalCount+=1;
  stackHeight+=1;
  Modal.stackCount+=1;
}

const viewStore = () => {
  const state = {ids, modalCount, removeRequestCount, stackHeight}
  console.log(state);
}

const removeLastId = () => {
    unmountModal();
    ids.pop();
    modalCount-=1;
    removeRequestCount = 1;
    if (modalCount === 0) {
      stackHeight = 0;
      Modal.stackCount = 0;
    }
}

const requestRemoval = () => {
  if (removeRequestCount === stackHeight) {
    removeLastId();
  }
  else removeRequestCount+=1;
}

const getModalCount = () => modalCount

const getLastId = () => ids[ids.length - 1];

const unmountModal = () => {
  const element = document.querySelector(`#app-modal-${getLastId()}`);
  element.parentNode.removeChild(element);
}

export {updateIds, viewStore, getLastId, removeLastId, requestRemoval, getModalCount}