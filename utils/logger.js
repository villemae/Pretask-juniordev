const info = (...params) => {
    console.log("INFO:", ...params);
}

const error = (...params) => {
    console.error("ERROR:", ...params);
}

export { info, error };