const out = document.querySelector("p");

function assemble(){
  let text = textarea.value.split('\n');
//  let labels = {};
//  text.forEach((item, i) => {
//    if (item.charAt(0) == '(' && item.includes(')')){
//      labels[item.replace('(','').replace(')','')] = i - Object.keys(labels).length;
//    }
//  })
//  for (let i in labels){
//    text.splice(labels[i],1);
//  }
  outText = [];
  text.forEach((item, i) => {
    if (item == "empty"){outVal = ["1"]}
    else if (item == "push data") {outVal = ["2"]}
    else if (item == "pop data") {outVal = ["3"]}
    else if (item == "push counter") {outVal = ["4"]}
    else if (item == "pop counter") {outVal = ["5"]}
    else if (item == "push pointer") {outVal = ["6"]}
    else if (item == "pop pointer") {outVal = ["7"]}
    else if (item == "output") {outVal = ["8"]}
    else if (item == "input") {outVal = ["9"]}
    else if (item == "to") {outVal = ["10"]}
    else if (item == "go") {outVal = ["11"]}
    else if (item == "at") {outVal = ["12"]}
//    else if (labels[item] != undefined) {
//      outVal = labels[item].toString().split('').map((val)=>{return parseInt(val)+48});
//    }
    else {
      outVal = item.split('').map(val=>
        val=="E"?1:
        val=="D"?2:
        val=="S"?3:
        val=="C"?4:
        val=="J"?5:
        val=="P"?6:
        val=="M"?7:
        val=="O"?8:
        val=="I"?9:
        val=="T"?10:
        val=="G"?11:
        val=="A"?12:
        val.charCodeAt(0)
      );
    }
    outText = outText.concat(outVal);
  })
  out.innerHTML = "\\left[" + outText + "\\right]";
}