

function store(key, any) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage[key] = JSON.stringify(any);
            resolve();
        }, 0)
    });

}

function load(key) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var str = localStorage[key] || 'null';
            resolve(JSON.parse(str));
        }, 0)
    });
}

export default {
    store,
    load
}