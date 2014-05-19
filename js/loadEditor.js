var imported = document.createElement('script');
imported.src = 'js/structure.js';
document.head.appendChild(imported);

var data = new Array();

function loadEditor() {
	$(function() {
			lines = [];
			lines = document.getElementById("editor").value.split(/(?:\\[rn]|[\r\n]+)+/g);
			
		    $(':input:not(#editor)').val('');
			$('#in').val('');
			$('#intable').empty();
			$('#rowToClone tr:not(:first)').not(function(){
				if ($(this).has('th').length){
					return true
				}
			}).remove();
			
			$('#output').html("");
			//console.log($('#output').html());
			$('#visualization').html("");
			variableDeclaration = [];
			variableName = '';
			data = [];
			data = new Array();
            //var lines = document.getElementById("editor").value.split(/(?:\\[rn]|[\r\n]+)+/g);
			
			//console.log(lines[0])			
			var i= 0;
			while(i < lines.length)
			{
				//transitions Table		
				if(lines[i] == "transitions.start")
				{
					var e = 1;
					i++;
					while(lines[i] != "transitions.end")
					{
						var line= lines[i].split("=");
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
						var variableDeclaration= lines[i].split("=");
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
					
						var variableDeclaration= lines[i].split("=");
						var variableName= variableDeclaration[0];
						
						if(variableName == "Input")
						{
							var inputContent= variableDeclaration[1].split(";");
							document.getElementById('inputString').value = inputContent[0];
						}
						else
						{
						}
						
						i++;
					}
				}
				
				
				i++;
			}
		
			loadTransitionsTable();
			   
			   
			   
			   
			   
            });
}

