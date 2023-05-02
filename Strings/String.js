function stringToList(text){
  return text.split('').map(function (char) {
    return char.charCodeAt(0);
  });
}

function listToString(nums){
  const letters = nums.map(val => {return String.fromCharCode(val)});
  return letters.join('');
}
