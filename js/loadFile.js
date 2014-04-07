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
				a = reader.result;
				var text = a.split("\n");
                for(x=1;x<text.length;x++){
                    var line = text[x].split(",");
					if(line.length!=5){
						window.alert("Sintax error on line " + x + "\n\nWrong sequence of tokens." + "\nExpected to have 5 tokens but has " + line.length + ";"); 
					}
                    data.push(new Transition(line[0], line[1], line[2], line[3], line[4]));
                    console.log(data[x-1]);
                }
            
        }
        reader.readAsText(file);	
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