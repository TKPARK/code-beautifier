
// jQuery Function
$(function() {
  $("#source").linedtextarea();
});

// Reset
function reset() {
  document.getElementById("is_trim").value = 0;
  document.getElementById("add_space").value = '';
  document.getElementById("separator1").value = '';
  document.getElementById("separator2").value = '';
  document.getElementById("source").value = '';
}


// Code Beautifier
function beautifier() {
  // init
  var result = '';
  var field_max_length = 0;
  var value_max_length = 0;
  
  
  // get value
  var space = ' ';
  var is_trim = document.getElementById("is_trim").value;
  var add_space = document.getElementById("add_space").value;
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
    var field = trim(temp[0], is_trim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], is_trim);
    var comment = trim(temp[1], is_trim);
    
    if(field.length > field_max_length) {
      field_max_length = field.length;
    }
    if(value.length > value_max_length) {
      value_max_length = value.length;
    }
  }
  
  
  // 2.최대길이만큼 공백 추가하기
  for(var i=0; i<line.length; i++) {
    if(line[i].indexOf(separator1) == -1 || line[i].indexOf(separator2) == -1 ) {
      result = result + line[i] + '\n';
      continue;
    }
    
    var temp = line[i].split(separator1);
    var field = trim(temp[0], is_trim);
    
    temp = temp[1].split(separator2);
    var value = trim(temp[0], is_trim);
    var comment = trim(temp[1], is_trim);
    
    var diff = field_max_length - field.length;
    for(var j=0; j<diff; j++) {
      field = field + space;
    }
    
    var diff2 = value_max_length - value.length;
    for(var j=0; j<diff2; j++) {
      value = value + space;
    }
    
    line[i] = add_space + field + space + separator1 + space + value + space + separator2 + space + comment;
    result = result + line[i] + '\n';
  }
  
  // 3.출력
  document.getElementById("source").value = result;
  //alert("success");
}


// 공백제거
function trim(str, value) {
  if(value == 1) {
    return str.replace(/(\s*)/g, ""); // 전체 공백제거
  }else {
    return str.replace(/^\s*|\s*$/g, ""); // 앞,뒤 공백제거
  }
}

