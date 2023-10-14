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