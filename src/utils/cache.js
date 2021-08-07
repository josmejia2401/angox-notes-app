export function emptyCache() {
    if ('caches' in window) {
        try {
            window.caches.keys().then((names) => {
                names.forEach(name => {
                    window.caches.delete(name);
                })
            });
        } catch (error) {
            console.error(error);
        }
    }
    if ('parent' in window) {
        try {
            window.parent.caches.delete("call");
        } catch (error) {
            console.error(error);
        }
    }
}
/*
export function loadCacheBrowser() {
    var appCache = window.applicationCache;
    switch (appCache.status) {
        case appCache.UNCACHED: // UNCACHED == 0
            return 'UNCACHED';
        case appCache.IDLE: // IDLE == 1
            return 'IDLE';
        case appCache.CHECKING: // CHECKING == 2
            return 'CHECKING';
        case appCache.DOWNLOADING: // DOWNLOADING == 3
            return 'DOWNLOADING';
        case appCache.UPDATEREADY:  // UPDATEREADY == 4
            return 'UPDATEREADY';
        case appCache.OBSOLETE: // OBSOLETE == 5
            return 'OBSOLETE';
        default:
            return 'UKNOWN CACHE STATUS';
    };
}

export function updateCacheBrowser() {
    var appCache = window.applicationCache;
    appCache.update();
    if (appCache.status == window.applicationCache.UPDATEREADY) {
        appCache.swapCache();
    }
}

export function addEventsCacheBrowser() {
    // Check if a new cache is available on page load.
    window.addEventListener('load', function (e) {
        window.applicationCache.addEventListener('updateready', function (e) {
            if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                // Browser downloaded a new app cache.
                if (confirm('A new version of this site is available. Load it?')) {
                    window.location.reload();
                }
            } else {
                // Manifest didn't changed. Nothing new to server.
            }
        }, false);

    }, false);
}

export function setEvetns() {
    function handleCacheEvent(e) {
        //...
    }

    function handleCacheError(e) {
        alert('Error: Cache failed to update!');
    };

    // Fired after the first cache of the manifest.
    appCache.addEventListener('cached', handleCacheEvent, false);

    // Checking for an update. Always the first event fired in the sequence.
    appCache.addEventListener('checking', handleCacheEvent, false);

    // An update was found. The browser is fetching resources.
    appCache.addEventListener('downloading', handleCacheEvent, false);

    // The manifest returns 404 or 410, the download failed,
    // or the manifest changed while the download was in progress.
    appCache.addEventListener('error', handleCacheError, false);

    // Fired after the first download of the manifest.
    appCache.addEventListener('noupdate', handleCacheEvent, false);

    // Fired if the manifest file returns a 404 or 410.
    // This results in the application cache being deleted.
    appCache.addEventListener('obsolete', handleCacheEvent, false);

    // Fired for each resource listed in the manifest as it is being fetched.
    appCache.addEventListener('progress', handleCacheEvent, false);

    // Fired when the manifest resources have been newly redownloaded.
    appCache.addEventListener('updateready', handleCacheEvent, false);
}
*/