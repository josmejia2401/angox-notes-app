export async function getItem(id) {
    return new Promise((resolve, reject) => {
        try {
            const _ID = `@Angos@Security:${id}`;
            const value = window.localStorage.getItem(_ID);
            resolve(value);
        } catch (error) {
            reject(error);
        }
    });
}

export async function setItem(id, value) {
    return new Promise((resolve, reject) => {
        try {
            const _ID = `@Angos@Security:${id}`;
            window.localStorage.setItem(_ID, value);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

export async function removeItem(id) {
    return new Promise((resolve, reject) => {
        try {
            const _ID = `@Angos@Security:${id}`;
            window.localStorage.removeItem(_ID);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

export async function cleanAll() {
    return new Promise((resolve, reject) => {
        try {
            window.localStorage.clear();
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}