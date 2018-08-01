

function store(key, any) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            localStorage[key] = JSON.stringify(any);
            resolve();
        }, 200)
    });

}

function load(key) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var str = localStorage[key] || 'null';
            resolve(JSON.parse(str));
        }, 200)
    });
}

export default {
    store,
    load
}