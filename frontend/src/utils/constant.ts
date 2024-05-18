export const TIME_FOR_UPDATE_JWT = 1000*60*4;

export const loadStateFromLocalStorage = (key: string) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveLocalStorage=(key: string, state: any)=> {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch {
  
  }
}

export const deleteLocalStorage = (key:string)=>{
  localStorage.removeItem(key)
}