let ids = [];
let modalCount = 0;
let removeRequestCount = 1;
let stackHeight = 0;

const updateIds = (id) => {
  ids.push(id);
  modalCount+=1;
  stackHeight+=1;
}

const viewStore = () => {
  console.log('ids:', ids, 'modalCount:', modalCount, "removeRequestCount", removeRequestCount )
}

const removeLastId = () => {
    // console.log('remove last called')
    unmountModal();
    ids.pop();
    modalCount-=1;
    if (modalCount === 1) removeRequestCount = 0
    else removeRequestCount = 1;
    if (modalCount === 0) {
      // removeRequestCount = 0;
      stackHeight = 0;
    }
}

const requestRemoval = () => {
  if (removeRequestCount === stackHeight) {
    // console.log('req completed')
    removeLastId();
  }
  else removeRequestCount+=1;
}

const getModalCount = () => modalCount

const getLastId = () => ids[ids.length - 1];

const unmountModal = () => {
  // console.log('unmount')
  const element = document.querySelector(`#app-modal-${getLastId()}`);
  element.parentNode.removeChild(element);
}

export {updateIds, viewStore, getLastId, removeLastId, requestRemoval, getModalCount}