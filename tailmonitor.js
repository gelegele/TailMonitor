var $id = function(id) { return document.getElementById(id); }

var fileSize;

function changeHandler(e) {
  var file = e.target.files[0];
  readFile(file);
};

function dispatchChangeEvent() {
  var changeEvent = document.createEvent("HTMLEvents");
  changeEvent.initEvent("change", true, false);
  $id("hiddenButton").dispatchEvent(changeEvent);
}

var readFile = function(file) {
  if (fileSize == file.size) {
    //alert("Not modified");
    return;
  }
  if (!fileSize) { // first time only
    setInterval("dispatchChangeEvent()",1000);
  }
  fileSize = file.size;

  $id("photoCover").value = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    $id("ta").value = e.target.result;
    $id("ta").scrollTop = $id("ta").scrollHeight; // Set scroll position bottom.
  };

  var enc = 'UTF-8';
  if (0 <= location.href.lastIndexOf('#sjis')) {
    enc = 'Shift-JIS';
  }
  reader.readAsText(file, enc);
};

