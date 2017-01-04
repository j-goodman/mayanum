// Special characters: |·⁚⁝⁞Ø
var arabToMaya = function (arabNum) {
  var mayaDigits = [];

  // Get highest place
  var maxPlace = 1;
  while (maxPlace <= arabNum / 20) {
    maxPlace *= 20;
  }
  var place = maxPlace;

  // Loop to determine place values
  var i = 0;
  while (place >= 1) {
    mayaDigits.push(0);
    while (arabNum >= place) {
      arabNum -= place;
      mayaDigits[i] += 1;
    }
    place /= 20;
    i++;
  }

  // Convert place values array into readable maya numeral string
  var mayaNum = '';
  for (i=0 ; i<mayaDigits.length ; i++) {
    mayaNum += arabToMayaDigits(mayaDigits[i]) + ' ';
  }
  return mayaNum;
};

var arabToMayaDigits = function (arabNum) {
  // Converts an arabic numeral under 20 to a maya digit
  var shell = '\u00D8';    // (Ø)
  var bar = '\u007C';      // (|)
  var oneDot = '\u2027';   // (‧)
  var twoDot = '\u205a';   // (⁚)
  var threeDot = '\u205D'; // (⁝)
  var fourDot = '\u205E';  // (⁞)
  var mayaNum = '';
  if (arabNum === 0) {
    return shell;
  }
  while (arabNum >= 5) {
    arabNum -= 5;
    mayaNum = bar + mayaNum;
  }
  switch (arabNum) {
    case 4: mayaNum = fourDot + mayaNum; break;
    case 3: mayaNum = threeDot + mayaNum; break;
    case 2: mayaNum = twoDot + mayaNum; break;
    case 1: mayaNum = oneDot + mayaNum; break;
  }
  return mayaNum;
};

window.onkeyup = function () {
  arabNum = document.getElementById('num-input').value;
  document.getElementById('num-input').placeholder = "";
  mayaNumField = document.getElementById('num-output');
  if (arabNum === 0 || arabNum) {
    mayaNum = arabToMaya(arabNum);
    mayaNumField.innerText = mayaNum;
  } else {
    mayaNumField.innerText = "";
  }
};
