function getStorageKey(key:string, base?:string){

    if(sessionStorage.getItem(key) != undefined){
        return sessionStorage.getItem(key)
    }
    
    else{
        sessionStorage.setItem(key, base)
        return sessionStorage.getItem(key)
    }
}

function setStorageKey(key:string, base:string){
    sessionStorage.setItem(key, base)
}

export { getStorageKey , setStorageKey}