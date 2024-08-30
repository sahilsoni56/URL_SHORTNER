console.log("land");


document.querySelector("#copyButton").addEventListener("click", function(){
    var text = document.getElementById("url-short");
    text.select();
    text.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text.value);

    // Alert the copied text
    alert("Copied the text: " + text.value);
});
