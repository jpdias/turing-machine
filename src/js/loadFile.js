var imported = document.createElement('script');
imported.src = 'js/structure.js';
document.head.appendChild(imported);

var data = new Array();

var currentInput = 0;

var inputs = new Array();

var breakpoints = new Array();

function handleFileSelect(evt) {
    clearAll();
	clearLexicalCheck();
	
	evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects. List some properties.
    var file = files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
            readerResult = reader.result;
			
			//read file line by line
            var lines = readerResult.trim().split("\r\n");
			
			$('#editor').val(readerResult); 
			if(!verifyTags(lines))
				return;
			
			var i= 0;
			while(i < lines.length)
			{
				lines[i] = lines[i].replace(" ", "");
			
				if(lines[i].length != 0)
				{
					//Transitions Table
					if(lines[i] == "transitions.start")
					{						
						var e = 1;
						
						i++;
						
						while(lines[i] != "transitions.end")
						{
							lines[i] = lines[i].trim();
							
							if(lines[i].length != 0)
							{
								var line= lines[i].trim().replace(" ", "").split("->");
								
								if(line.length >= 2)
								{
									line[0]= line[0].replace("(", "").replace(")", "");
									line[1]= line[1].replace("(", "").replace(")", "");
									var current= line[0].trim().split(",");
									var nextAux= line[1].trim().split(";");
									var next= nextAux[0].trim().split(",");
									
									if (current.length != 2) {
										document.getElementById('output').style.color = "Red";
										document.getElementById('output').innerHTML = "Syntax error on line: " + i + ". Wrong sequence of tokens, " + "expected to have 2 tokens but has " + current.length + ".";
									}
									
									if (next.length != 3) {
										document.getElementById('output').style.color = "Red";
										document.getElementById('output').innerHTML = "Syntax error on line: " + i + ". Wrong sequence of tokens, " + "expected to have 3 tokens but has " + current.length + ".";
									}
									
									
									var state= current[0];
									var symbol= current[1];
									var nextState= next[0];
									var nextSymbol= next[1];
									var direction= next[2];
									
									data.push(new Transition(state, nextState, symbol, nextSymbol, direction));
									
									addEdge(e.toString(), state, nextState, symbol + " / " + nextSymbol + " , " + direction);

									e++;
								}
							}
							
							i++;
						}
					}

					//Formal Definition
					if(lines[i] == "formalDefinition.start")
					{
						i++;
						
						while(lines[i] != "formalDefinition.end")
						{
							lines[i] = lines[i].trim();
							
							if(lines[i].length != 0)
							{
								var variableDeclaration= lines[i].trim().split(/=(.+)?/);
								
								if(variableDeclaration.length >= 2)
								{
									var variableName= variableDeclaration[0].trim();
									var variableContent= variableDeclaration[1].trim().split(";");
									
									if(variableName == "States")
									{
										document.getElementById('statesSet').value = variableContent[0];
									}
									else if(variableName == "Alphabet")
									{
										document.getElementById('alphabetSet').value = variableContent[0];
									}
									else if(variableName == "BlankSymbol")
									{
										document.getElementById('blankSymbol').value = variableContent[0];
									}
									else if(variableName == "TapeAlphabet")
									{
										document.getElementById('inputSymbols').value = variableContent[0];
									}
									else if(variableName == "InitialState")
									{
										document.getElementById('initialState').value = variableContent[0];
									}
									else if(variableName == "FinalStates")
									{
										document.getElementById('finalStates').value = variableContent[0];
									}
									else
									{
									}
								}
							}						
							
							i++;
						}
					}

					if(lines[i] == "input.start")
					{
						i++;
						
						while(lines[i] != "input.end")
						{
							lines[i] = lines[i].trim();
							
							if(lines[i].length != 0)
							{
								var variableDeclaration= lines[i].trim().split(/=(.+)?/);
								
								if(variableDeclaration.length >= 2)
								{
									var variableName= variableDeclaration[0].trim();
									
									if(variableName == "Input")
									{
										var inputContent= variableDeclaration[1].trim().split(";");
										
										// if input text area is empty do not add ',' before adding the input string
										if(document.getElementById('inputString').value == "")
										{
											document.getElementById('inputString').value = document.getElementById('inputString').value + inputContent[0];
										}
										else
										{
											document.getElementById('inputString').value = document.getElementById('inputString').value + "," + inputContent[0];
										}
										
									}
									else
									{
									}
								}
							}
							
							i++;
						}
					}

					if(lines[i] == "breakpoints.start")
					{
						i++;
						
						while(lines[i] != "breakpoints.end")
						{
							lines[i] = lines[i].trim();
							
							if(lines[i].length != 0)
							{
								if(lines[i].trim().indexOf("state") != -1)
								{
									var whereData = lines[i].trim().split(")")[0].split("(")[1];
									
									var whereDataSplit = whereData.trim().split("->");
									
									var where = new Array();
									
									for(var j = 0; j < whereDataSplit.length; j++)
									{
										where.push(whereDataSplit[j]);
									}
									
									
									var betweenBrackets = lines[i].trim().split("}")[0].split("{")[1];
									
									var betweenBracketsSplit = betweenBrackets.trim().split(";");
									
									
									var j = 0;
									
									var times = 0;
										
									var message = "";
										
									while(j < betweenBracketsSplit.length)
									{
										if(betweenBracketsSplit[j].trim().split(/=(.+)?/).length >= 2)
										{
											var instructionName = betweenBracketsSplit[j].trim().split(/=(.+)?/)[0];
											
											var instructionValue = betweenBracketsSplit[j].trim().split(/=(.+)?/)[1];
											
											
											if(instructionName == "times")
											{
												times = instructionValue;
											}
											else
											{
												if(instructionName == "message")
												{
													message = instructionValue;
												}
											}
											
											j++;
										}
									}
									
									
									breakpoints.push(new Breakpoint("state", where, times, message));
								}
								else
								{
									if(lines[i].trim().indexOf("inputPosition") != -1)
									{
										var whereData = lines[i].trim().split(")")[0].split("(")[1];
									
										var whereDataSplit = whereData.trim().split("->");
										
										var where = new Array();
										
										for(var j = 0; j < whereDataSplit.length; j++)
										{
											where.push(whereDataSplit[j]);
										}
										
										
										var betweenBrackets = lines[i].trim().split("}")[0].split("{")[1];
										
										var betweenBracketsSplit = betweenBrackets.trim().split(";");
										
										
										var j = 0;
										
										var times = 0;
										
										var message = "";
										
										while(j < betweenBracketsSplit.length)
										{
											if(betweenBracketsSplit[j].trim().split(/=(.+)?/).length >= 2)
											{
												var instructionName = betweenBracketsSplit[j].trim().split(/=(.+)?/)[0];
												
												var instructionValue = betweenBracketsSplit[j].trim().split(/=(.+)?/)[1];
												
												if(instructionName == "times")
												{
													times = instructionValue;
												}
												else
												{
													if(instructionName == "message")
													{
														message = instructionValue;
													}
												}
												
												j++;
											}
										}
										
										
										breakpoints.push(new Breakpoint("inputPosition", where, times, message));
									}
								}
							}
							
							i++;
						}
					}
				}
				
				i++;
			}
			
			loadTransitionsTable();
				
			loadBreakpoints();
        }
        reader.readAsText(file);
        var dropZone = document.getElementById('dropzone');
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

function loadBreakpoints()
{
	var stateBreakpoints = "";
	var inputBreakpoints = "";
	
	for(var i = 0; i < breakpoints.length; i++)
	{
        if(breakpoints[i].type == "state")
		{
			for(var j = 0; j < breakpoints[i].where.length; j++)
			{
				$('input[name=breakpointCheckbox]').attr('checked', true);
			}
		}
		else
		{
			if(breakpoints[i].type == "inputPosition")
			{
				var inputBreakpoint = "";
				
				for(var j = 0; j < breakpoints[i].where.length; j++)
				{
					inputBreakpoint = inputBreakpoint + breakpoints[i].where[j];
					
					if(j != breakpoints[i].where.length - 1)
					{
						inputBreakpoint = inputBreakpoint + "->";
					}
				}
				
				inputBreakpoints = inputBreakpoints + inputBreakpoint;
				
				if(i != breakpoints.length - 1)
				{
					inputBreakpoints = inputBreakpoints + ",";
				}
			}
		}
    }
	
	$("#inputBreakpoints").val(inputBreakpoints);
}

// Setup the dnd listeners.
var dropZone = document.getElementById('dropzone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);