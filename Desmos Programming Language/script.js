eval.call(window, `
window.onerror = (msg, url, line, col, error) => {
  alert(error.stack);
  alert("Error at " + url + " line " + line + " col " + col);
  alert(msg);
}

var Calc;

if (Calc){}
else{
  var elt = document.getElementById('calculator');
  var Calc = Desmos.GraphingCalculator(elt);
}

let imports = ["Custom%20Functions/customFunctions.js", "Strings/String.js"];
imports = imports.map(val => "https://cdn.jsdelivr.net/gh/theRealDadsdy/desmos-userscript@master/" + val);

for (importy of imports){
  let script = document.createElement("script");
  script.src = importy;
  document.body.appendChild(script);
}

function setExpress(lineNum, text){
  text = listToString(text);
  let express = Calc.getExpressions();
  for (let i = 0; i < express.length; i++){
    if (!(express[i].secret)){
      lineNum--;
      if (lineNum == 0){
        Calc.setExpression({id: express[i].id, latex: text});
        break;
      }
    }
  }
  if (lineNum != 0){
    Calc.setExpression({latex: text});
  }
}

setTimeout(async ()=>{
  await newDesFunc("set", setExpress, ["lineNum", "text"]);
}, 100)
`);
