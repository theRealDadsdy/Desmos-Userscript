var funcCount = 0;

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function newName(name){
  function applyNames() {
    /* see https://github.com/jared-hughes/DesThree/blob/master/src/View.js#L66 for more info, including
    forcing a rerender */
    const fields = document.querySelectorAll('.dcg-mq-editable-field')
    fields.forEach(field => {
      const opt = field._mqMathFieldInstance.__controller.root.cursor.options;
      // allow name to be written without manipulating LaTeX in the console
      opt.autoOperatorNames[name] = name
    })
  }

  window.Calc.controller.dispatcher.register(e => {
    if (
      ['tick', 'new-expression', 'new-expression-at-end'].includes(e.type) ||
      (e.type === 'on-special-key-pressed' && e.key === 'Enter')
    ) {
      // update the math field of new expression elements
      applyNames()
    }
  })
  applyNames()
}

async function newDesFunc(name, callback, params=[]){
  newName(name);
  funcCount++;
  Calc.setExpression({id:name, latex:"uni"});
  let ranName = "r"+"_{an"+name+"}";
  Calc.setExpression({id:name+"ran", latex:ranName+"=0", secret: true});
  params.forEach(val => {Calc.setExpression({id:val, latex:"c_{heck" + val + "}=0", secret: true})});
  await timeout(100);
  const fields = document.querySelectorAll('.dcg-mq-root-block')
  fields.forEach(field => {
    if (field.children[0].innerHTML == "u" && field.children[1].innerHTML == "n" && field.children[2].innerHTML == "i"){
      field.removeChild(field.children[0]); field.removeChild(field.children[0]); field.removeChild(field.children[0]);
      let newElem = document.createElement("span");
      field.prepend(newElem);
      newElem.innerHTML = name;
    }
  })
  let checks = params.map(val => {return "c_{heck" + val + "}"})
  let paramNames = params.map(val => {return val[0] + (val.length > 1 ? "_{"+val.slice(1) + "}" : "")})
  let body = ranName + "\\to1";
  checks.forEach((val, ind) => {body += "," + val + "\\to " + paramNames[ind]});
  let fullFuncText = "\\operatorname{" + name + "}\\left(" + paramNames.toString() + "\\right)=" + body;
  Calc.setExpression({id:name, latex: fullFuncText, secret: true});
  Calc.observeEvent('change', () => {
    let express = Calc.getExpressions();
    let ran = false;
    let paramsLeft = 0;
    let paramsToPass = {};
    //Checking if the function ran, and getting the parameters
    express.forEach(val => {
      if (val.id == name + "ran" && val.latex == ranName + "=1"){
        Calc.setExpression({id:name+"ran", latex:ranName+"=0"});
        ran = true;
        paramsLeft = params.length;
      }
      else if (params.includes(val.id)){
        paramsToPass[val.id]=val.latex.split("=")[1];
      }
    })
    if (ran){
      //Sorting parameters
      let parameters = [];
      for (param of params){
        parameters.push(eval(paramsToPass[param].split('\\left').join('').split('\\right').join('')));
      }
      callback(...parameters)
    }
  })
}
