var decodeFlight = (search, window)=> {
    try {
        var encoded = search.substring('?flight='.length);
        var decoded = window.atob(encoded);
        return JSON.parse(decoded);
    }
    catch(error) {
        return undefined;
    }
};
