window.onerror = function(msg, url, line, col, error) {
  alert(error.stack);
}

const hideButton = document.createElement("button");
const div = document.createElement("div");
const lineNumbers = document.createElement("div");
const textarea = document.createElement("textarea");
hideButton.innerHTML = "-";
div.className = "numtext";
lineNumbers.className = "line-nums";
textarea.className = "codearea";
document.body.appendChild(hideButton);
document.body.appendChild(div);
div.appendChild(lineNumbers);
div.appendChild(textarea);
hideButton.addEventListener('click', event => {
  if (div.style.display == "none") {
    div.style.display = "";
  } else {
    div.style.display = "none";
  }
});
textarea.addEventListener('keyup', event => {
  const text = textarea.value.split('\n');
  let labelLocs = [];
  text.forEach((item, i) => {
    if (item.charAt(0) == '(' && item.includes(')')){
      labelLocs.push(i);
    }
  })
  const numberOfLines = text.length;
  let count = 0;
  lineNums = Array(numberOfLines)
    .fill('<span></span>');
  lineNums.forEach((val, i) => {lineNums[i] = ('<span number = ' + count + '></span>'); count += labelLocs.includes(i) ? 0 : 1;});
  lineNumbers.innerHTML = lineNums.join('');
  if (event.key == 'Tab') {
    event.preventDefault();
  }
});
textarea.addEventListener('keydown', event => {
  if (event.key === 'Tab') {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
    event.preventDefault();
  }
});

const button = document.createElement("button");
button.innerHTML = "Assemble";
button.onclick = assemble;
document.body.appendChild(button);
const out = document.createElement("p");
document.body.appendChild(out);

function assemble(){
  let text = textarea.value.split('\n');
  let labels = {};
  text.forEach((item, i) => {
    if (item.charAt(0) == '(' && item.includes(')')){
      labels[item.replace('(','').replace(')','')] = i - Object.keys(labels).length;
    }
  })
  for (let i in labels){
    text.splice(labels[i],1);
  }
  outText = [];
  text.forEach((item, i) => {
    if (item == "clear"){outVal = ["1"]}
    else if (item == "push data") {outVal = ["2"]}
    else if (item == "pop data") {outVal = ["3"]}
    else if (item == "push counter") {outVal = ["4"]}
    else if (item == "pop counter") {outVal = ["5"]}
    else if (item == "push pointer") {outVal = ["6"]}
    else if (item == "pop pointer") {outVal = ["7"]}
    else if (item == "output") {outVal = ["8"]}
    else if (item == "input") {outVal = ["9"]}
    else if (labels[item] != undefined) {
      outVal = labels[item].toString().split('').map((val)=>{return parseInt(val)+48});
    }
    else {
      outVal = item.split('').map((val)=>{return val.charCodeAt(0)});
    }
    outText = outText.concat(outVal);
  })
  out.innerHTML = "\\left[" + outText + "\\right]";
}