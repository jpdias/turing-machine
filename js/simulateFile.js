var imported = document.createElement('script');
imported.src = 'js/structure.js';
document.head.appendChild(imported);

function loadLocal(arg) {
	$(function() {
		clearAll();
		clearLexicalCheck();
            $.get(arg, function(localData) {
                readerResult = localData;
			$('#editor').val(localData); 

			//read file line by line
            var lines = readerResult.split(/(?:\\[rn]|[\r\n]+)+/g);
			
			//console.log(lines[0]);
			if(!verifyTags(lines))
				return;
			var i= 0;
			while(i < lines.length)
			{
				//Transitions Table
				if(lines[i] == "transitions.start")
				{
					var e = 1;
					i++;
					while(lines[i] != "transitions.end")
					{
						var line= lines[i].trim().split("->");
						line[0]= line[0].replace("(", "").replace(")", "");
						line[1]= line[1].replace("(", "").replace(")", "");
						var current= line[0].split(",");
						var nextAux= line[1].split(";");
						var next= nextAux[0].split(",");
						
						if (current.length != 2) {
							document.getElementById('output').style.color = "Red";
							document.getElementById('output').innerHTML = "Syntax error on line: " + i + ". Wrong sequence of tokens, " + "expected to have 2 tokens but has " + current.length + ".";
							return;
						}
						
						if (next.length != 3) {
							document.getElementById('output').style.color = "Red";
							document.getElementById('output').innerHTML = "Syntax error on line: " + i + ". Wrong sequence of tokens, " + "expected to have 3 tokens but has " + current.length + ".";
							return;
						}
						
						
						var state= current[0];
						var symbol= current[1];
						var nextState= next[0];
						var nextSymbol= next[1];
						var direction= next[2];
						
						data.push(new Transition(state, nextState, symbol, nextSymbol, direction));
						
						addEdge(e.toString(), state, nextState, symbol + " / " + nextSymbol + " , " + direction);

						e++;
						
						i++;
					}
				}

				//Formal Definition
				if(lines[i] == "formalDefinition.start")
				{
					i++;
					while(lines[i] != "formalDefinition.end")
					{
						var variableDeclaration= lines[i].trim().split("=");
						var variableName= variableDeclaration[0];
						var variableContent= variableDeclaration[1].split(";");
						
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
												
						i++;
					}
				}

				if(lines[i] == "input.start")
				{
					i++;
					while(lines[i] != "input.end")
					{
					
						var variableDeclaration= lines[i].trim().split("=");
						var variableName= variableDeclaration[0];
						
						if(variableName == "Input")
						{
							var inputContent= variableDeclaration[1].split(";");
							
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
						
						i++;
					}
				}

				if(lines[i] == "breakpoints.start")
				{
					i++;
					
					
					while(lines[i] != "breakpoints.end")
					{
						if(lines[i].trim().indexOf("state") != -1)
						{
							var whereData = lines[i].trim().split(")")[0].split("(")[1];
							
							var whereDataSplit = whereData.split("->");
							
							var where = new Array();
							
							for(var j = 0; j < whereDataSplit.length; j++)
							{
								where.push(whereDataSplit[j]);
							}
							
							
							var betweenBrackets = lines[i].trim().split("}")[0].split("{")[1];
							
							var betweenBracketsSplit = betweenBrackets.split(";");
							
							
							var j = 0;
							
							var times = 0;
								
							var message = "";
								
							while(j < betweenBracketsSplit.length)
							{
								var instructionName = betweenBracketsSplit[j].split("=")[0];
								
								var instructionValue = betweenBracketsSplit[j].split("=")[1];
								
								
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
							
							
							breakpoints.push(new Breakpoint("state", where, times, message));
						}
						else
						{
							if(lines[i].trim().indexOf("inputPosition") != -1)
							{
								var whereData = lines[i].trim().split(")")[0].split("(")[1];
							
								var whereDataSplit = whereData.split("->");
								
								var where = new Array();
								
								for(var j = 0; j < whereDataSplit.length; j++)
								{
									where.push(whereDataSplit[j]);
								}
								
								
								var betweenBrackets = lines[i].trim().split("}")[0].split("{")[1];
								
								var betweenBracketsSplit = betweenBrackets.split(";");
								
								
								var j = 0;
								
								var times = 0;
								
								var message = "";
								
								while(j < betweenBracketsSplit.length)
								{
									var instructionName = betweenBracketsSplit[j].split("=")[0];
									
									var instructionValue = betweenBracketsSplit[j].split("=")[1];
									
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
								
								
								breakpoints.push(new Breakpoint("inputPosition", where, times, message));
							}
						}
						
						i++;
					}
				}

				i++;
			}
		
			loadTransitionsTable();
			
			loadBreakpoints();
			   
            });
			
        });
}