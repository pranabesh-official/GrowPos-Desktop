export const datetime = () => {
    const currentdate = new Date();
    const datetime = "DATE: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " TIME "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime
};

export const date = () => {
    const currentdate = new Date();
    const date =  currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() 
    return date
}

export const time = () => {
    const currentdate = new Date();
    const time =  currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return time
};


export const getDate = (d) => {
    const currentdate = new Date(d);
    const date =  currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() 
    return date
}

export const gettime = (t) => {
    const currentdate = new Date(t);
    const time =  currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return time
};