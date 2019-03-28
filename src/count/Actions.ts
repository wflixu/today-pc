

export const increment = (counterCaption:any)=>{
    return {
        type: 'increment',
        counterCaption
    }
}

export const decrement =(counterCaption:any) =>{
    return {
        type: 'decrement',
        counterCaption
    }
}