async function setNote(lineNum, text){
  text = listToString(text);
  let state = Calc.getState();
  let express = state.expressions.list;
  for (let i = 0; i < express.length; i++){
    if (!(express[i].secret)){
      lineNum--;
      if (lineNum == 0){
        express[i].text = text;
        break;
      }
    }
  }
  if (lineNum != 0){
    express.push({type: "text", text: text})
  }
  state.expressions.list = express;
  Calc.setState(state);
  timeout(100);
  const fields = document.querySelectorAll('.dcg-mq-root-block');
  fields.forEach(field => {
    if (field.children[0].innerHTML == "n" && field.children[1].innerHTML == "o" && field.children[2].innerHTML == "t"){
      field.removeChild(field.children[0]); field.removeChild(field.children[0]); field.removeChild(field.children[0]);
      field.removeChild(field.children[0]);
      let newElem = document.createElement("span");
      field.prepend(newElem);
      newElem.innerHTML = "note";
    }
  })
}
