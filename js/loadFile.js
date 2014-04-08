var imported = document.createElement('script');
imported.src = 'js/structure.js';
document.head.appendChild(imported);

var data = new Array();

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var file = files[0]
    var textType = /text.*/;

    if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            readerResult = reader.result;
            var lines = readerResult.split("\r\n");

            for (x = 1; x < 9; x++) {
                var line = lines[x].split(",");
                if (x == 1) {
                    document.getElementById('statesSet').value = line;
                } else {
                    if (x == 2) {
                        document.getElementById('alphabetSet').value = line;
                    } else {
                        if (x == 3) {
                            document.getElementById('blankSymbol').value = line;
                        } else {
                            if (x == 4) {
                                document.getElementById('inputSymbols').value = line;
                            } else {
                                if (x == 5) {
                                    document.getElementById('initialState').value = line;
                                } else {
                                    if (x == 6) {
                                        document.getElementById('finalStates').value = line;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (x = 9; x < lines.length - 1; x++) {
                var line = lines[x].split(",");
                if (line.length != 5) {
                    document.getElementById('output').style.color = "Red";
                    document.getElementById('output').innerHTML = "Syntax error on line: " + x + ". Wrong sequence of tokens, " + "expected to have 5 tokens but has " + line.length + ".";
                    return;
                }
                data.push(new Transition(line[0], line[1], line[2], line[3], line[4]));
            }
            
			loadTransitionsTable();
        }
        reader.readAsText(file);
        var dropZone = document.getElementById('drop_zone');
        dropZone.innerHTML = "File upload successfully!";
    } else {
        window.alert("File not supported!");
    }
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

function loadTransitionsTable() {
    for (var i = 1; i < data.length; i++) {
        cloneRow()
    }

    var currentStateInputs = document.getElementsByName('currentState');

    var nextStateInputs = document.getElementsByName('nextState');

    var scanSymbolInputs = document.getElementsByName('scanSymbol');

    var printSymbolInputs = document.getElementsByName('printSymbol');

    var directionInputs = document.getElementsByName('direction');

    for (var i = 0; i < data.length; i++) {
        currentStateInputs[i].value = data[i].currentState;

        nextStateInputs[i].value = data[i].nextState;

        scanSymbolInputs[i].value = data[i].scanSymbol;

        printSymbolInputs[i].value = data[i].printSymbol;

        directionInputs[i].value = data[i].direction;
    }
}

// Setup the dnd listeners.
var dropZone = document.getElementById('dropzone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);