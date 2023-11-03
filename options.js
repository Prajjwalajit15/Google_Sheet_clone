const activeCellElement = document.getElementById("active-cell");
const textAllignElements = document.getElementsByClassName("tetx-allign");
const boldButton = document.getElementById("bold");
const italicButton = document.getElementById("italic");
const underlinedBUtoon = document.getElementById("underlined");



let activeCell = null ;

const deafultOptionstate = {
    fontFamily : "",
    isBoldSelected :false,
    isItalicSelected : false,
    isUnderlineSelected : false,
    textAlign : 'left',
    textColor : '#000',
    backgroundColor : '#fff',
    fontSize : 14,
};

let activeOptionstate ;

function toggleButtonStyle(button , isSelected){
    if(isSelected){ 
     button.classList.add("active-option"); 
}
else{
    button.classList.remove("active-option");
}

}

function highlightOptionButtonOnFocus(){
   
    toggleButtonStyle(boldButton,activeOptionstate.isBoldSelected);
 
    toggleButtonStyle(italicButton,activeOptionstate.isItalicSelected);

    toggleButtonStyle(underlinedBUtoon,activeOptionstate.isUnderlineSelected);
    
    highLightTextAllignButton(activeOptionstate.textAlign);
}

function onCellFocus(e){ 

    if(activeCell && activeCell.id===e.target.id){
            return ;
    }

    activeCell = e.target;
    activeCellElement.innerText = e.target.id;

    const computedStyle = getComputedStyle(activeCell);

     activeOptionstate = {
        fontFamily : computedStyle.fontFamily,
        isBoldSelected : computedStyle.fontWeight==="600",
        isItalicSelected : computedStyle.fontStyle==="italic",
        isUnderlineSelected : computedStyle.textDecoration.includes("underline"),
        textAlign : computedStyle.textAlign,
        textColor : computedStyle.color,
        backgroundColor : computedStyle.backgroundColor,
        fontSize : computedStyle.fontSize,
    };

    highlightOptionButtonOnFocus();
}
 
function onClickBold(boldButton) {
    boldButton.classList.toggle("active-option");
    if(activeCell){
        activeOptionstate
        if(activeOptionstate.isBoldSelected === false){
            activeCell.style.fontWeight="600"; 
        }
        else{
            activeCell.style.fontWeight="400"; 
        }
        activeOptionstate.isBoldSelected=!activeOptionstate.isBoldSelected;
    }
}
function onClickItalic(italicButton) {
    italicButton.classList.toggle("active-option");
    if(activeCell){  
         
        if(activeOptionstate.isItalicSelected){
            activeCell.style.fontStyle="normal"; 
        }
        else{
            activeCell.style.fontStyle="italic"; 
        }
        activeOptionstate.isItalicSelected=!activeOptionstate.isItalicSelected;
    }
}
function onClickUnderLined(underlinedButton){
    underlinedButton.classList.toggle("active-option");
    if(activeCell){
        if(activeCellElement.isUnderlineSelected){
            activeCell.style.textDecoration = "none";
        }
        else{
            activeCell.style.textDecoration = "underline";
        }
        activeOptionstate.isUnderlineSelected=!activeOptionstate.isUnderlineSelected;
    }
}
function highLightTextAllignButton(textAlignValue){
    const textAllignElements = document.getElementsByClassName("text-allign");
    for(let i = 0; i<textAllignElements.length; i++){
        if(textAllignElements[i].getAttribute("data-value")===textAlignValue){
            textAllignElements[i].classList.add("active-option");
        }
        else{
            textAllignElements[i].classList.remove("active-option");
        }
    }
}
function onClickTextAllign(textAlignButton){
    let selectedValue = textAlignButton.getAttribute("data-value");
    highLightTextAllignButton(selectedValue);
    if(activeCell){
        activeCell.style.textAlign = selectedValue;
        activeOptionstate.textAlign = selectedValue;
    }
}
function onChangeTextColor(textcolorInput){
    let selectedColor = textcolorInput.value;
    if(activeCell){
        activeCell.style.color = selectedColor;
        activeOptionstate.color = selectedColor;
    }
}
function onChangeBackgroundColor(bgColor){
    let selectedColor = bgColor.value;
    if(activeCell){
        activeCell.style.backgroundColor = selectedColor;
        activeOptionstate.color = selectedColor;
    }
}

// Get the upload and download elements by their IDs
const uploadButton = document.getElementById("upload");
const downloadButton = document.getElementById("download");

// Add event listener for the upload button
uploadButton.addEventListener("click", () => {
    // Implement the upload functionality here
    alert("Do you want to upload this file ?");
});

// Add event listener for the download button
downloadButton.addEventListener("click", () => {
    // Implement the download functionality here
    alert("Do you want to download this file ?");
});

// Add event listener for the upload button
uploadButton.addEventListener("click", () => {
    // Create an input element of type "file" to trigger file selection
    const fileInput = document.createElement("input");
    fileInput.type = "file";

    // Trigger a click event on the file input
    fileInput.click();

    // Handle the selected file when it changes
    fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0];
        // You can now work with the selected file (e.g., upload it to a server).
        console.log("Selected file:", selectedFile);
    });
});

// Add event listener for the download button
downloadButton.addEventListener("click", () => {
    // Implement the download functionality, e.g., generating a download link for data.
    const dataToDownload = "This is the data to download.";

    const downloadLink = document.createElement("a");
    downloadLink.href = "data:text/plain;charset=utf-8," + encodeURIComponent(dataToDownload);
    downloadLink.download = "downloaded-data.txt";
    downloadLink.style.display = "none";
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
});


// Get the copy, paste, and cut elements by their IDs
const copyButton = document.getElementById("copy");
const cutButton = document.getElementById("cut");
const pasteButton = document.getElementById("paste");

// Add event listener for the copy button
copyButton.addEventListener("click", () => {
    copyText();
});

// Add event listener for the cut button
cutButton.addEventListener("click", () => {
    cutText();
});

// Add event listener for the paste button
pasteButton.addEventListener("click", () => {
    pasteText();
});

function copyText() {
    if (activeCell) {
        const selectedText = window.getSelection().toString();
        navigator.clipboard.writeText(selectedText).then(() => {
            console.log("Text copied to clipboard: " + selectedText);
        }).catch(err => {
            console.error("Copy failed: " + err);
        });
    }
}

function cutText() {
    if (activeCell) {
        // 1. Copy the selected text to the clipboard.
        const selectedText = window.getSelection().toString();
        navigator.clipboard.writeText(selectedText).then(() => {
            console.log("Text copied to clipboard: " + selectedText);

            // 2. Clear the cell's content (remove the text).
            activeCell.innerText = "";
        }).catch(err => {
            console.error("Cut failed: " + err);
        });
    }
}


function pasteText() {
    if (activeCell) {
        navigator.clipboard.readText().then(clipboardText => {
            activeCell.innerText = clipboardText;
            console.log("Text pasted from clipboard: " + clipboardText);
        }).catch(err => {
            console.error("Paste failed: " + err);
        });
    }
}


 