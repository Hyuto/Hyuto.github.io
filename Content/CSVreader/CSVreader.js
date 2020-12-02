function Upload(direc, sep) {
    var fileUpload = document.getElementById("fileUpload");
    let name = fileUpload.value.toLowerCase();
    if (name.substr(name.length-4, name.length-1) == ".csv" || name.substr(name.length-4, name.length-1) == ".txt") {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var cells;
                    if(i == 0){
                        cells = rows[i].replace(/"/g, '').split(sep);
                    }else{
                        cells = rows[i].split(sep);
                    }if (cells.length > 1) {
                        var row = table.insertRow(-1);
                        for (var j = 0; j < cells.length; j++) {
                            var cell = row.insertCell(-1);
                            cell.innerHTML = cells[j];
                        }
                    }
                }
                var dvCSV = document.getElementById(direc);
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}

function Clear(direc, sep){
    var dvCSV = document.getElementById(direc);
    var separator = document.getElementById(sep);
    var fileUpload = document.getElementById("fileUpload");
    separator.value = null;
    fileUpload.value = null;
    dvCSV.innerHTML = null;
}

function run(){
    let sep = document.getElementById("sep");
    if(sep.value == ""){
        alert("[INFO] : Separator is not found ,changging to default ','");
        sep.value = ","
    }
    Upload("dvCSV", sep.value);
}

function clean(){
    Clear("dvCSV", "sep");
}