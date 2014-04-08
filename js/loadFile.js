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
        reader.onload = function(e) {
				readerResult = reader.result;
				var lines = readerResult.split("\r\n");
                for(x=1;x<lines.length ;x++){
                    var line = lines[x].split(",");
					if(line.length!=5){
						document.getElementById('output').style.color = "Red";
						document.getElementById('output').innerHTML="Syntax error on line: " + x + ". Wrong sequence of tokens, " + "expected to have 5 tokens but has " + line.length + "."; 
						return;
					}
                    data.push(new Transition(line[0], line[1], line[2], line[3], line[4]));
                }
            
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

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);