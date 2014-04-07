function lexicalCheck()
		{
			var lexicalCheckString = "Lexical Check:";
			
			
			var lexicalCheckString = lexicalCheckString + "\n\n";
			
			var lexicalCheckString = lexicalCheckString + "Formal Definition Check: \n\n";
			
			var statesSetInput = document.getElementById('statesSet').value;
			
			if(statesSetInput.length > 0 && statesSetInput.match("^(Q[0-9],*)+$"))
			{
				lexicalCheckString = lexicalCheckString + "States Set OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "States Not OK!" + "\n";
			}
			
			var statesSet = statesSetInput.split(",");
			
			
			var alphabetSetInput = document.getElementById('alphabetSet').value;
			
			if(alphabetSetInput.length > 0 &&  alphabetSetInput.match("^([A-Z0-9],*)+$"))
			{
				lexicalCheckString = lexicalCheckString + "Alphabet Set OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Alphabet Not OK!" + "\n";
			}
			
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
				lexicalCheckString = lexicalCheckString + "Blank Symbol OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Blank Symbol Not OK!" + "\n";
			}
			
			
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
				lexicalCheckString = lexicalCheckString + "Input Symbols OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Input Symbols Not OK!" + "\n";
			}
			
			
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
				lexicalCheckString = lexicalCheckString + "Initial State OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Initial State Not OK!" + "\n";
			}
			
			
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
				lexicalCheckString = lexicalCheckString + "Final States OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Final States Not OK!" + "\n";
			}
			
			
			
			
			var lexicalCheckString = lexicalCheckString + "\n\n";
			
			var lexicalCheckString = lexicalCheckString + "Transitions Check: \n\n";
			
			
			var currentStateInput = document.getElementById('currentState').value;
			
			var nextStateInput = document.getElementById('nextState').value;
			
			var scanSymbolInput = document.getElementById('scanSymbol').value;
			
			var printSymbolInput = document.getElementById('printSymbol').value;
			
			var directionInput = document.getElementById('direction').value;
			
			
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
				lexicalCheckString = lexicalCheckString + "Current State OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Current State Not OK!" + "\n";
			}
			
			if(nextStateInput.length > 0 && nextStateFound)
			{
				lexicalCheckString = lexicalCheckString + "Next State OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Next State Not OK!" + "\n";
			}
			
			
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
				lexicalCheckString = lexicalCheckString + "Scan Symbol OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Scan Symbol Not OK!" + "\n";
			}
			
			if(printSymbolInput.length > 0 && printSymbolFound)
			{
				lexicalCheckString = lexicalCheckString + "Print Symbol OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Print Symbol Not OK!" + "\n";
			}
			
			
			if(directionInput.length > 0 && directionInput == "R" || directionInput == "L")
			{
				lexicalCheckString = lexicalCheckString + "Direction OK!" + "\n";
			}
			else
			{
				lexicalCheckString = lexicalCheckString + "Direction Not OK!" + "\n";
			}
			
			
			window.alert(lexicalCheckString);
		}
          