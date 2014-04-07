String.prototype.replaceAt=function(index, character) 
{
	return this.substr(0, index) + character + this.substr(index+character.length);
}

//"Tape class"
function Tape(alphabet, blank, pos, tapeContent)
{
	//data
	this.alphabet= alphabet;
	this.blankSymbol= blank;
	this.pos= pos;
	this.tapeContent= tapeContent;
	
	//methods
	this.moveRight= function (){
		var tapeLength= tapeContent.length;
		if(pos == tapeLength - 1)
			this.tapeContent= this.tapeContent.concat(this.blankSymbol);
		this.pos= this.pos + 1;
			
	}
	this.moveLeft= function (){
		if(pos == 0)
			this.tapeContent= this.blankSymbol.concat(this.tapeContent);
							
	}
	//Writes symbol on the tape, at the current position
	//TODO: check if "Symbol" exists in "this.alphabet"
	this.write= function(Symbol){
		this.tapeContent= this.tapeContent.replaceAt(pos, Symbol);
	}
	//returns current position tape contents
	this.read= function(){
		return this.tapeContent.charAt(pos);
	}
	
}

//"TuringMachine class"
function TuringMachine(tape, transitionsTable, initialState, finalStates)
{
	this.tape= tape;
	this.transitionsTable= transitionsTable;
	this.initialState= initialState;
	this.finalStates= finalStates;
	//this.blankSymbol= blank; // Necessary???
	this.stepNumber= 0;
	this.step= function(){
	}
	this.runNsteps= function(numberOfSteps){
	}
	this.show= function(){
		document.write("tape... <br>");
		document.write("Initial State= " + this.initialState + "!<br>");
		document.write("Final States: <br>");
		for(var j= 0; j < finalStates.length; j++)
		{
			document.write(finalStates[j] + "; ");
		}
		document.write("<br>Transitions Table: <br>");
		for(var i= 0; i < transitionsTable.length; i++)
		{
			document.write(i + ": " + "currentState= " + transitionsTable[i].currentState +
				"; nextState= " + transitionsTable[i].nextState + 
				"; scanSymbol= " + transitionsTable[i].scanSymbol +
				"; printSymbol= " + transitionsTable[i].printSymbol + 
				"; direction= " + transitionsTable[i].direction + "!<br>");
		}
		document.write("Current Step number= " + this.stepNumber + "! <br> <br>");
		
	}
	
	
}

//"Transition Class"
function Transition(currentState, nextState, scanSymbol, printSymbol, direction)
{
	this.currentState= currentState;
	this.nextState= nextState;
	this.scanSymbol= scanSymbol;
	this.printSymbol= printSymbol;
	this.direction= direction;
}