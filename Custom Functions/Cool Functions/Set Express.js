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
