
// jQuery Function
$(function() {
  $("#source").linedtextarea();
});



// Reset
function reset() {
  document.getElementById("isTrim").value = 0;
  document.getElementById("addSpace").value = '';
  document.getElementById("separator1").value = '';
  document.getElementById("separator2").value = '';
  document.getElementById("source").value = '';
}



// Code Beautifier
function beautifier() {
  // init
  var result = '';
  var fieldMaxLength = 0;
  var valueMaxLength = 0;
  
  
  // get value
  var space = ' ';
  var isTrim = document.getElementById("isTrim").value;
  var addSpace = document.getElementById("addSpace").value;
  var separator1 = document.getElementById("separator1").value;
  var separator2 = document.getElementById("separator2").value;
  var source = document.getElementById("source").value;
  var line = new Array();
  line = source.split('\n');
  
  
  // 1.최대길이 구하기
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(separator1) == -1 || line[i].indexOf(separator2) == -1 ) {
      continue;
    }
    
    var temp = line[i].split(separator1);
    var field = trim(temp[0], isTrim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], isTrim);
    var comment = trim(temp[1], isTrim);
    
    if(field.length > fieldMaxLength) {
      fieldMaxLength = field.length;
    }
    if(value.length > valueMaxLength) {
      valueMaxLength = value.length;
    }
  }
  
  
  // 2.최대길이만큼 공백 추가하기
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(separator1) == -1 || line[i].indexOf(separator2) == -1 ) {
      result = result + line[i] + '\n';
      continue;
    }
    
    var temp = line[i].split(separator1);
    var field = trim(temp[0], isTrim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], isTrim);
    var comment = trim(temp[1], isTrim);
    
    var diff = fieldMaxLength - field.length;
    for(var j=0; j<diff; j++) {
      field = field + space;
    }
    
    var diff2 = valueMaxLength - value.length;
    for(var j=0; j<diff2; j++) {
      value = value + space;
    }
    
    line[i] = addSpace + field + space + separator1 + space + value + space + separator2 + space + comment;
    result = result + line[i] + '\n';
  }
  
  // 3.출력
  document.getElementById("source").value = result;
  //alert("success");
}



// Code Auto Beautifier
function autoBeautifier() {
  // init
  var type = 0;
  var result = '';
  
  // get value
  var source = document.getElementById("source").value;
  var line = new Array();
  line = source.split('\n');
  
  
  // type check
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(':=') != -1 && line[i].indexOf('--') != -1 ) {
      type = 1;
    } else if(line[i].indexOf('0x00') != -1 && line[i].indexOf('));') != -1 ) {
      type = 2;
    }
  }
  
  
  switch(type) {
    case 1:
      beautifier(':=', '--', 0);
      break;
    case 2:
      beautifier('0x00,', '));', 1);
      break;
  }
  
  
  //alert(type);
}



function beautifier(separator1, separator2, isTrim) {
  // init
  var result = '';
  var fieldMaxLength = 0;
  var valueMaxLength = 0;
  var space = ' ';
  var addSpace = '  ';
  
  // get value
  var source = document.getElementById("source").value;
  var line = new Array();
  line = source.split('\n');
  
  
  // 1.최대길이 구하기
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(separator1) == -1 || line[i].indexOf(separator2) == -1 ) {
      continue;
    }
    
    var temp = line[i].split(separator1);
    var field = trim(temp[0], isTrim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], isTrim);
    var comment = trim(temp[1], isTrim);
    
    if(field.length > fieldMaxLength) {
      fieldMaxLength = field.length;
    }
    if(value.length > valueMaxLength) {
      valueMaxLength = value.length;
    }
  }
  
  
  // 2.최대길이만큼 공백 추가하기
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(separator1) == -1 || line[i].indexOf(separator2) == -1 ) {
      result = result + line[i] + '\n';
      continue;
    }
    
    var temp = line[i].split(separator1);
    var field = trim(temp[0], isTrim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], isTrim);
    var comment = trim(temp[1], isTrim);
    
    var diff = fieldMaxLength - field.length;
    for(var j=0; j<diff; j++) {
      field = field + space;
    }
    
    var diff2 = valueMaxLength - value.length;
    for(var j=0; j<diff2; j++) {
      value = value + space;
    }
    
    line[i] = addSpace + field + space + separator1 + space + value + space + separator2 + space + comment;
    result = result + line[i] + '\n';
  }
  
  // 3.출력
  document.getElementById("source").value = result;
}



// 공백제거
function trim(str, value) {
  if(value == 1) {
    return str.replace(/(\s*)/g, ""); // 전체 공백제거
  }else {
    return str.replace(/^\s*|\s*$/g, ""); // 앞,뒤 공백제거
  }
}


