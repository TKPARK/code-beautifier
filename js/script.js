

// Code Beautifier
function beautifier() {
  var result = '';
  var separator1 = ':=';
  var separator2 = '--';
  var space = ' ';
  var def = ' ';
  var fieldMaxLength = 0;
  var valueMaxLength = 0;
  var source = document.getElementById("source").value;
  var line = new Array();
  line = source.split('\n');
  
  // 1.최대길이 구하기
  for(var i=0; i<line.length; i++) {
    var temp = line[i].split(separator1);
    var field = trim(temp[0]);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0]);
    var comment = trim(temp[1]);
    
    if(field.length > fieldMaxLength) {
      fieldMaxLength = field.length;
    }
    if(value.length > valueMaxLength) {
      valueMaxLength = value.length;
    }
  }
  
  
  // 2.최대길이만큼 공백 추가하기
  for(var i=0; i<line.length; i++) {
    var temp = line[i].split(separator1);
    var field = trim(temp[0]);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0]);
    var comment = trim(temp[1]);
    
    var diff = fieldMaxLength - field.length;
    for(var j=0; j<diff; j++) {
      field = field + space;
    }
    
    var diff2 = valueMaxLength - value.length;
    for(var j=0; j<diff2; j++) {
      value = value + space;
    }
    
    line[i] = def + field + def + separator1 + def + value + def + separator2 + def + comment + '\n';
    result = result + line[i];
  }
  
  // 3.출력
  document.getElementById("source").value = result;
  //alert("success");
}


// 공백제거
function trim(str) {
  //return str.replace(/(^\s*)|(\s*$)/, ""); // 앞,뒤 공백제거
  return str.replace(/(\s*)/g, ""); // 전체 공백제거
}


