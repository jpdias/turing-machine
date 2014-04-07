function lexicalCheck()
		{
		
			var output = document.getElementById('output');
			output.innerHTML = "";
			var outputChildNodes = output.childNodes;
			
			
			var lexicalCheckString = "Formal Definition Lexical Check: " + "<br>";
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			var statesSetInput = document.getElementById('statesSet').value;
			
			if(statesSetInput.length > 0 && statesSetInput.match("^(Q[0-9](,Q[0-9])*)+$"))
			{
				lexicalCheckString = "<font color=\"green\">" + "States Set OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "States Set Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			var statesSet = statesSetInput.split(",");
			
			
			var alphabetSetInput = document.getElementById('alphabetSet').value;
			
			if(alphabetSetInput.length > 0 &&  alphabetSetInput.match("^([A-Z0-9](,[A-Z0-9])*)$"))
			{
				lexicalCheckString = "<font color=\"green\">" + "Alphabet Set OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "Alphabet Set Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			var alphabetSet = alphabetSetInput.split(",");
			
			
			var blankSymbolInput = document.getElementById('blankSymbol').value;
			
			var blankSymbolInputFound = false;
			
			for(var i = 0; i < alphabetSet.length; i++)
			{
				if(alphabetSet[i] == blankSymbolInput)
				{
					blankSymbolInputFound = true;
				}
			}
			
			if(blankSymbolInput.length > 0 && blankSymbolInputFound)
			{
				lexicalCheckString = "<font color=\"green\">" + "Blank Symbol OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "Blank Symbol Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			
			var inputSymbolsInput = document.getElementById('inputSymbols').value;
			
			var inputSymbols = inputSymbolsInput.split(",");
			
			var inputSymbolsInputFound = true;
			
			for(var i = 0; i < inputSymbols.length; i++)
			{
				var inputSymbolInputFound = false;
				
				for(var j = 0; j < alphabetSet.length; j++)
				{
					if(alphabetSet[j] == inputSymbols[i])
					{
						inputSymbolInputFound = true;
					}
				}
				
				if(inputSymbolInputFound == false)
					inputSymbolsInputFound = false;
			}
			
			if(inputSymbolsInput.length > 0 && inputSymbolsInputFound)
			{
				lexicalCheckString = "<font color=\"green\">" + "Input Symbols OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "Input Symbols Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			
			var initialStateInput = document.getElementById('initialState').value;
			
			var initialStateInputFound = false;
			
			for(var i = 0; i < statesSet.length; i++)
			{
				if(statesSet[i] == initialStateInput)
				{
					initialStateInputFound = true;
				}
			}
			
			if(initialStateInput.length > 0 && initialStateInputFound)
			{
				lexicalCheckString = "<font color=\"green\">" + "Initial State OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "Initial State Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			
			var finalStatesInput = document.getElementById('finalStates').value;
			
			var finalStates = finalStatesInput.split(",");
			
			var finalStatesInputFound = true;
			
			for(var i = 0; i < finalStates.length; i++)
			{
				var finalStateInputFound = false;
				
				for(var j = 0; j < statesSet.length; j++)
				{
					if(statesSet[j] == finalStates[i])
					{
						finalStateInputFound = true;
					}
				}
				
				if(finalStateInputFound == false)
					finalStatesInputFound = false;
			}
			
			if(finalStatesInput.length > 0 && finalStatesInputFound)
			{
				lexicalCheckString = "<font color=\"green\">" + "Final States OK!" + "</font><br>";
			}
			else
			{
				lexicalCheckString = "<font color=\"red\">" + "Final States Not OK!" + "</font><br>";
			}
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
			
			
			
			
			/*
			var currentStateInput = document.getElementById('currentState').value;
			
			var nextStateInput = document.getElementById('nextState').value;
			
			var scanSymbolInput = document.getElementById('scanSymbol').value;
			
			var printSymbolInput = document.getElementById('printSymbol').value;
			
			var directionInput = document.getElementById('direction').value;
			*/
			
			
			lexicalCheckString = "Transitions Lexical Check:" + "<br>";
			
			output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				
			for(var j = 0; j < data.length; j++)
			{
				lexicalCheckString = "Row " + j + "<br>";
			
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				
				var currentStateInput = data[j].currentState;
			
				var nextStateInput = data[j].nextState;
			
				var scanSymbolInput = data[j].scanSymbol;
			
				var printSymbolInput = data[j].printSymbol;
			
				var directionInput = data[j].direction;
			
			
				var currentStateFound = false;
				
				var nextStateFound = false;
				
				for(var i = 0; i < statesSet.length; i++)
				{
					if(statesSet[i] == currentStateInput)
					{
						currentStateFound = true;
					}
					
					if(statesSet[i] == nextStateInput)
					{
						nextStateFound = true;
					}
				}
				
				if(currentStateInput.length > 0 && currentStateFound)
				{
					lexicalCheckString = "<font color=\"green\">" + "Current State OK!" + "</font><br>";
				}
				else
				{
					lexicalCheckString = "<font color=\"red\">" + "Current State Not OK!" + "</font><br>";
				}
				
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				if(nextStateInput.length > 0 && nextStateFound)
				{
					lexicalCheckString = "<font color=\"green\">" + "Next State OK!" + "</font><br>";
				}
				else
				{
					lexicalCheckString = "<font color=\"red\">" + "Next State Not OK!" + "</font><br>";
				}
				
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				var scanSymbolFound = false;
				
				var printSymbolFound = false;
				
				for(var i = 0; i < alphabetSet.length; i++)
				{
					if(alphabetSet[i] == scanSymbolInput)
					{
						scanSymbolFound = true;
					}
					
					if(alphabetSet[i] == printSymbolInput)
					{
						printSymbolFound = true;
					}
				}
				
				if(scanSymbolInput.length > 0 && scanSymbolFound)
				{
					lexicalCheckString = "<font color=\"green\">" + "Scan Symbol OK!" + "</font><br>";
				}
				else
				{
					lexicalCheckString = "<font color=\"red\">" + "Scan Symbol Not OK!" + "</font><br>";
				}
				
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				if(printSymbolInput.length > 0 && printSymbolFound)
				{
					lexicalCheckString = "<font color=\"green\">" + "Print Symbol OK!" + "</font><br>";
				}
				else
				{
					lexicalCheckString = "<font color=\"red\">" + "Print Symbol Not OK!" + "</font><br>";
				}
				
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				if(directionInput.length > 0 && directionInput == "R" || directionInput == "L")
				{
					lexicalCheckString = "<font color=\"green\">" + "Direction OK!" + "</font><br>";
				}
				else
				{
					lexicalCheckString = "<font color=\"red\">" + "Direction Not OK!" + "</font><br>";
				}
				
				output.insertAdjacentHTML('beforeend', lexicalCheckString);
				
				
				// processData();
			}
		}
          