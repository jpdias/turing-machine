var statesSet;
var alphabetSet;
var blankSymbolInput;
var inputSymbols;
var initialStateInput;
var finalStates;
var inputString;

var turingMachine;
var tape;


var error = false;

var lexicalCheckString = "Formal Definition Lexical Check: " + "<br>";
	
var lexicalCheckErrorsString = "";

var lexicalCheckRunned = false;


function lexicalCheck()
{
    clearLexicalCheck();
	$('#output').html("");
	//console.log($('#output').html());
	$('#visualization').html("");

	var output = document.getElementById('output');
	
	// output.innerHTML = "";
	
	var outputChildNodes = output.childNodes;
	
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	var statesSetInput = document.getElementById('statesSet').value;
	
	statesSetInput= statesSetInput.replace(/\s/gm, "");
	
	if(statesSetInput.length > 0 )
	{
		lexicalCheckString = "<font color=\"green\">" + "States Set Ok!" + "</font><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "States Set Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "States Set Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	statesSet = statesSetInput.split(",");
	
	
	var alphabetSetInput = document.getElementById('alphabetSet').value;
	
	alphabetSetInput= alphabetSetInput.replace(/\s/gm, "");
		
	if(alphabetSetInput.length > 0)
	{
		lexicalCheckString = "<font color=\"green\">" + "Alphabet Set Ok!" + "</font><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "Alphabet Set Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Alphabet Set Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	alphabetSet = alphabetSetInput.split(",");
	
	
	blankSymbolInput = document.getElementById('blankSymbol').value;
	
	blankSymbolInput= blankSymbolInput.replace(/\s/gm, "");
	
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
		lexicalCheckString = "<font color=\"green\">" + "Blank Symbol Ok!" + "</font><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "Blank Symbol Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Blank Symbol Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	
	var inputSymbolsInput = document.getElementById('inputSymbols').value;
	
	inputSymbolsInput= inputSymbolsInput.replace(/\s/gm, "");
	
	inputSymbols = inputSymbolsInput.split(",");
	
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
		lexicalCheckString = "<font color=\"green\">" + "Input Symbols Ok!" + "</font><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "Input Symbols Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Input Symbols Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	
	initialStateInput = document.getElementById('initialState').value;
	
	initialStateInput= initialStateInput.replace(/\s/gm, "");
	
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
		lexicalCheckString = "<font color=\"green\">" + "Initial State Ok!" + "</font><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "Initial State Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Initial State Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	
	var finalStatesInput = document.getElementById('finalStates').value;
	
	finalStatesInput= finalStatesInput.replace(/\s/gm, "");
	
	finalStates = finalStatesInput.split(",");
	
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
		lexicalCheckString = "<font color=\"green\">" + "Final States Ok!" + "</font><br>";
	}
	else
	{
		console.log(finalStatesInput+'   '+finalStatesInputFound);
		lexicalCheckString = "<font color=\"red\">" + "Final States Error!" + "</font><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Final States Error!" + "</font><br>";
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	
	lexicalCheckString = "<br>" + "Input String Lexical Check: " + "<br>";
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
	inputString = document.getElementById('inputString').value.replace(/\s/gm, "");
	
	inputs = inputString.split(",");
	
	var validInput= true;
	
	var inputStringsErrorMsg= "";
	
	for(k = 0; k < inputs.length; k++)
	{
	
		inputString = inputs[k];
		var inputCharsFound = true;
		
		var errorChars= " at char ";
		
		for(var i = 0; i < inputString.length; i++)
		{
			var inputCharFound = false;
			
			for(var j = 0; j < inputSymbols.length; j++)
			{
				if(inputSymbols[j] == inputString[i])
				{
					inputCharFound = true;
				}
			}
			
			if(inputCharFound == false)
			{
				inputCharsFound = false;
				validInput = false;
				errorChars+= (i + 1) + ", ";
			}
		}
		

		if(!inputCharsFound)
		{
			
			var inputErrorMsg= "<font color=\"red\">" + "Input string error input number " + (k + 1) + errorChars + "</font><br>";
			inputStringsErrorMsg += inputErrorMsg;
		}
	}
	
	
	
	if(inputString.length > 0 && validInput)
	{
		lexicalCheckString = "<font color=\"green\">" + "Input String(s) Ok!" + "</font><br><br>";
	}
	else
	{
		lexicalCheckString = "<font color=\"red\">" + "Input String(s) Error!" + "</font><br><br>";
		
		lexicalCheckErrorsString = lexicalCheckErrorsString + inputStringsErrorMsg;
		
		error = true;
	}
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);

	
	
	var currentStateInputs = document.getElementsByName('currentState');
	
	var nextStateInputs = document.getElementsByName('nextState');
	
	var scanSymbolInputs = document.getElementsByName('scanSymbol');
	
	var printSymbolInputs = document.getElementsByName('printSymbol');
	
	var directionInputs = document.getElementsByName('direction');
	
	
	lexicalCheckString = "Transitions Lexical Check:" + "<br>";
	
	// output.insertAdjacentHTML('beforeend', lexicalCheckString);
	
	
	data.length = 0
	
	for(var j = 0; j < currentStateInputs.length; j++)
	{
		data.push(new Transition(currentStateInputs[j].value.replace(/\s/gm, ""), nextStateInputs[j].value.replace(/\s/gm, ""), scanSymbolInputs[j].value.replace(/\s/gm, ""), printSymbolInputs[j].value.replace(/\s/gm, ""), directionInputs[j].value.replace(/\s/gm, "")));
	}
	
	
	for(var j = 0; j < data.length; j++)
	{
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
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
			lexicalCheckString = "<font color=\"green\">" + "Current State Ok!" + "</font><br>";
		}
		else
		{
			lexicalCheckString = "<font color=\"red\">" + "Current State Error!" + "</font><br>";
			
			lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "<font color=\"red\">" + "Current state error " + " at row " + (j + 1) + ": " + currentStateInput + "</font><br>";
			
			error = true;
		}
		
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
		if(nextStateInput.length > 0 && nextStateFound)
		{
			lexicalCheckString = "<font color=\"green\">" + "Next State Ok!" + "</font><br>";
		}
		else
		{
			lexicalCheckString = "<font color=\"red\">" + "Next State Error!" + "</font><br>";
			
			lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "<font color=\"red\">" + "Next state error " + " at row " + (j + 1) + ": " + nextStateInput + "</font><br>";
			
			error = true;
		}
		
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
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
			lexicalCheckString = "<font color=\"green\">" + "Scan Symbol Ok!" + "</font><br>";
		}
		else
		{
			lexicalCheckString = "<font color=\"red\">" + "Scan Symbol Error!" + "</font><br>";
			
			lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Scan symbol error " + " at row " + (j + 1) + ": " + scanSymbolInput + "</font><br>";
			
			error = true;
		}
		
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
		if(printSymbolInput.length > 0 && printSymbolFound)
		{
			lexicalCheckString = "<font color=\"green\">" + "Print Symbol Ok!" + "</font><br>";
		}
		else
		{
			lexicalCheckString = "<font color=\"red\">" + "Print Symbol Error!" + "</font><br>";
			
			lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Print symbol error " + " at row " + (j + 1) + ": " + printSymbolInput + "</font><br>";
			
			error = true;
		}
		
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
		if(directionInput.length > 0 && directionInput == "R" || directionInput == "L")
		{
			lexicalCheckString = "<font color=\"green\">" + "Direction Ok!" + "</font><br>";
		}
		else
		{
			lexicalCheckString = "<font color=\"red\">" + "Direction Error!" + "</font><br>";
			
			lexicalCheckErrorsString = lexicalCheckErrorsString + "<font color=\"red\">" + "Direction error " + " at row " + (j + 1) + ": " + directionInput + "</font><br>";
			
			error = true;
		}
		
		// output.insertAdjacentHTML('beforeend', lexicalCheckString);
		
		// processData();
	}
	
	if(error == false)
	{
		addFinalNodes(finalStates);
		
		addNodes(statesSet);
		
		loadDataToStructures();
		
		createGraphVisualization();
		
		
		output.innerHTML = "";
		
		lexicalCheckOkString = "<font color=\"green\">" + "Lexical Check Ok!" + "</font><br>";
		
		lexicalCheckOkString = lexicalCheckOkString + "<br>" + "Graph visualization created." + "<br>";
		
		
		output.insertAdjacentHTML('beforeend', lexicalCheckOkString);
		
		
		document.getElementById("stepButton").disabled = false;
		document.getElementById("runButton").disabled = false;
		document.getElementById("stopButton").disabled = false;
	}
	else
	{
		output.insertAdjacentHTML('beforeend', lexicalCheckErrorsString);
	}
	
	
	lexicalCheckRunned = true;
}
		
function loadDataToStructures(){
	currentInput = 0;
	
	//create Tape
	tape= new Tape(alphabetSet, blankSymbolInput, 0, inputs[currentInput]);
	
	currentInput++;
		
	//tape.show();
		
	//create Turing Machine
	turingMachine= new TuringMachine(tape, data, initialStateInput, finalStates);
		
	//turingMachine.show();
}
          