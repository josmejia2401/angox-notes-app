export function armarJsonDeForm(form, jsonComoData = {}) {
    const formData = new FormData(form);
    Array.from(formData.keys()).reduce((acc, key) => {
        let val = "";
        if (form.elements[key].type === "checkbox") {
            val = form.elements[key].value && form.elements[key].value === "on" ? true : false;
        } else {
            val = form.elements[key].value;
        }
        jsonComoData[key] = val;
        acc[key] = val;
        return acc
    }, {});
    return JSON.stringify(jsonComoData);
}