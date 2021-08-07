var IMAGE_MIME_REGEX = /^image\/(p?jpeg|gif|png)$/i;

var loadImage = function (file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var img = document.createElement('img');
        img.src = e.target.result;
        var range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        range.insertNode(img);
        console.log("insertando img", e.target.result);
    };
    reader.readAsDataURL(file);
};

document.onpaste = function (e) {
    var items = e.clipboardData.items;
    for (var i = 0; i < items.length; i++) {
        if (IMAGE_MIME_REGEX.test(items[i].type)) {
            loadImage(items[i].getAsFile());
            return;
        }
    }
    e.preventDefault();
}

/*
<img id="container"/>
document.onpaste = function (pasteEvent) {
    // consider the first item (can be easily extended for multiple items)
    var item = pasteEvent.clipboardData.items[0];
    if (item.type.indexOf("image") === 0) {
        var blob = item.getAsFile();
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById("container").src = event.target.result;
        };
        reader.readAsDataURL(blob);
    }
}
*/