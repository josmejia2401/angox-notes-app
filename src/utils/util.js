export function redirectTo(path) {
    if (path) {
        window.setTimeout(function () {
            window.location.href = "/web/security/apps";
        }, 1_000);
    }
}