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
	
	this.alphabetCopy= alphabet;
	this.blankSymbolCopy= blank;
	this.posCopy= pos;
	this.tapeContentCopy= tapeContent;
	
	this.reset = function()
	{
		this.alphabet= this.alphabetCopy;
		this.blankSymbol= this.blankSymbolCopy;
		this.pos= this.posCopy;
		this.tapeContent= this.tapeContentCopy;
	}
	
	//methods
	this.moveRight= function (){
		var tapeLength= (this.tapeContent).length;
		if(this.pos == tapeLength - 1)
			this.tapeContent= this.tapeContent.concat(this.blankSymbol);
		this.pos= this.pos + 1;
			
	}
	this.moveLeft= function (){
		if(this.pos == 0)
			this.tapeContent= this.blankSymbol.concat(this.tapeContent);
		else
			this.pos= this.pos - 1;
							
	}
	//Writes symbol on the tape, at the current position
	//TODO: check if "Symbol" exists in "this.alphabet"
	this.write= function(Symbol){
		this.tapeContent= this.tapeContent.replaceAt(this.pos, Symbol);
	}
	//returns current position tape contents
	this.read= function(){
		return this.tapeContent.charAt(this.pos);
	}
	//Show Tape
	this.show= function(){
		document.write("Tape Alphabet: <br>");
		for(var j= 0; j < alphabet.length; j++)
		{
		
			document.write(j + ": " + alphabet[j] + "; " + "<br>");
		}
		document.write("Blank Symbol: " + this.blankSymbol + "<br>" );
		document.write("Current Pos: " + this.pos + "<br>" );
		document.write("Tape Content: ")
		for(var i= 0; i < tapeContent.length; i++)
		{
			document.write(tapeContent[i]);
			
		}
		document.write("<br>");
	}
	
}

var stepReturn = 2;

var steper = null;

var time = 0;

var timer = null;

var running = false;

//"TuringMachine class"
function TuringMachine(tape, transitionsTable, initialState, finalStates)
{
	this.tape= tape;
	this.transitionsTable= transitionsTable;
	this.initialState= initialState;
	this.finalStates= finalStates;
	//this.blankSymbol= blank; // Necessary???
	this.currentState= initialState;
	this.stepNumber= 0;
	
	this.tapeCopy= tape;
	this.transitionsTableCopy= transitionsTable;
	this.initialStateCopy= initialState;
	this.finalStatesCopy= finalStates;
	this.currentStateCopy= initialState;
	
	this.reset = function()
	{
		this.tape= this.tapeCopy;
		this.transitionsTable= this.transitionsTableCopy;
		this.initialState= this.initialStateCopy;
		this.finalStates= this.finalStatesCopy;
		this.currentState= this.currentStateCopy;
		this.stepNumber= 0;
		
		stepReturn = 2;
		
		
		(this.tape).reset();
	}
	
	this.stop = function()
	{
		clearInterval(steper);
		
		clearInterval(timer);
		
		time = 0;
		
		this.reset();
		
		running = false;

		document.getElementById("runButton").disabled = false;
		document.getElementById("stopButton").disabled = true;		
		document.getElementById("pauseButton").disabled = true;
	}
	
	this.pause = function()
	{
		clearInterval(steper);
		
		clearInterval(timer);
		
		running = false;

		document.getElementById("pauseButton").disabled = true;	
		document.getElementById("resumeButton").disabled = false;
	}
	
	this.resume = function()
	{
		this.run();
		
		running = true;
		
		document.getElementById("pauseButton").disabled = false;
		document.getElementById("resumeButton").disabled = true;
	}
	
	this.step= function(){
	
		stepReturn = 2;
		
		var stepResult = document.getElementById('output');
		
		var stepString= "";
		for(var k= 0; k < (this.tape).tapeContent.length; k++)
		{
			if(k == (this.tape).pos)
				stepString += "<font color='red'>" + (this.tape).tapeContent[k] + "</font>";
			else
				stepString += "<font color='black'>" + (this.tape).tapeContent[k] + "</font>";
		}
		stepString += "<br>";
				
		stepResult.insertAdjacentHTML('beforeend', stepString);
		
		var i;
		document.getElementById('animation').innerHTML ="";
		var elements = new Array();
		elements = stepString.split("</font>");
		//console.log(elements);
		var size = 40;
		var padding = '';
		var anim = true;
		if(elements.length>21 && elements.length<42){
			size = 20;
			padding = "padding-left:5px;padding-bottom:5px;"
		}
		else if(elements.length>42){
			anim = false;
			console.log("anim false");
		}
		if(anim == false){
			document.getElementById('animation').style.fontSize="large";
			document.getElementById('animation').innerHTML="Input too long!";}
		else{
			for(i=0;i<elements.length-1;i++){
				//console.log(i+ ": "+elements[i]);
				if(elements[i].indexOf("red")> -1) 
					document.getElementById('animation').innerHTML += '<div class="tapeanim bs-example1" style="width:'+ size + 'px;'+padding+'outline: 1px dotted #EEA236;background-color:#F0AD4E;font-weight:bolder;" id="anim'+i +'">' + elements[i] +'</font></div>';
				else
					document.getElementById('animation').innerHTML += '<div class="tapeanim bs-example1" style="width:'+size + 'px;'+padding+'outline: 1px dotted #DDC;background-color:#DDD" id="anim'+i +'">' + elements[i] +'</font></div>';
				
			};
		}
		//obtain symbol on the current tape position
		var currentSymbolOnTape= (this.tape).read();
			
		var nextState;
		var nextSymbol;
		var nextDirection;
		
		var transitionFound= false;
		
		for(var i= 0; i < transitionsTable.length; i++)
		{
			if((transitionsTable[i].currentState == this.currentState) &&  (transitionsTable[i].scanSymbol == currentSymbolOnTape))
			{
				nextState= transitionsTable[i].nextState;
				nextSymbol= transitionsTable[i].printSymbol;
				nextDirection= transitionsTable[i].direction;
								
				//write on current tape position "nextSymbol"
				(this.tape).write(nextSymbol);
				
				transitionFound= true;
				
				break;
			}
		}
		
		if(transitionFound)
		{
			//update "currentState" after transition
			this.currentState= nextState;
			
			this.stepNumber += 1;
			
			$('#nsteps').html(this.stepNumber);
			
			//check if a final state have been reached.
			for(var j= 0; j < (this.finalStates).length; j++)
			{
				if(finalStates[j] == this.currentState)
				{
					
					stepString= "<font color=\"green\">" + "Success: finished in a final state!" + "</font><br>";
					//stepString+= "<font color=\"black\">" + "Number of steps= " + this.stepNumber + "</font><br>";
					stepResult.insertAdjacentHTML('beforeend', stepString);
					
					colorNode(turingMachine.currentState);
					
					$('#currentstep').html(this.currentState);
					
					stepReturn = 1;
				}
			}
			
			//update tape position after transition
			if(nextDirection == 'R')
			{
				(this.tape).moveRight();
			}
			else if(nextDirection == 'L')
			{
				(this.tape).moveLeft();
			}
		}
		else
		{
			stepString = "<font color=\"red\">" + "Failure: did not finish on a final state! " + "</font><br>";
			//stepString+= "<font color=\"black\">" + "Number of steps= " + this.stepNumber + "</font><br>";
			stepResult.insertAdjacentHTML('beforeend', stepString);
			
			colorNode(turingMachine.currentState);
			
			$('#currentstep').html(this.currentState);
			
			stepReturn = 0;
		}
		
		
		colorNode(turingMachine.currentState);
		
		$('#currentstep').html(this.currentState);
		
		if($("#chkBreakpoints").is(":checked"))
		{
			var j = 0;
				
			while(j < breakpoints.length)
			{
				if(breakpoints[j].type == "state")
				{
					if(breakpoints[j].where.length > 1)
					{
						if(this.currentState == breakpoints[j].where[breakpoints[j].sequencer])
						{
							breakpoints[j].incrementSequencer();
						}
						else
						{
							breakpoints[j].resetSequencer();
						}
						
						if(breakpoints[j].sequencer == breakpoints[j].where.length)
						{
							breakpoints[j].resetSequencer();
							
							breakpoints[j].incrementCounter();
							
							if(breakpoints[j].counter == breakpoints[j].times)
							{
								$('#output').append("Breakpoint!" + " Current State: " + this.currentState + "; Message: " + breakpoints[j].message + "<br>");
							
								turingMachine.pause();
							}
						}
					}
					else
					{
						if(this.currentState == breakpoints[j].where)
						{
							breakpoints[j].incrementCounter();
							
							if(breakpoints[j].counter == breakpoints[j].times)
							{
								$('#output').append("Breakpoint!" + " Current State: " + this.currentState + "; Message: " + breakpoints[j].message + "<br>");
								
								turingMachine.pause();
							}
						}
					}
				}
				else
				{
					if(breakpoints[j].type == "inputPosition")
					{
						if(breakpoints[j].where.length > 1)
						{
							if(this.tape.pos == breakpoints[j].where[breakpoints[j].sequencer])
							{
								breakpoints[j].incrementSequencer();
							}
							else
							{
								breakpoints[j].resetSequencer();
							}
							
							if(breakpoints[j].sequencer == breakpoints[j].where.length)
							{
								breakpoints[j].resetSequencer();
							
								breakpoints[j].incrementCounter();
								
								if(breakpoints[j].counter == breakpoints[j].times)
								{
									$('#output').append("Breakpoint!" + " Current State: " + this.currentState + "; Message: " + breakpoints[j].message + "<br>");
								
									turingMachine.pause();
								}
							}
						}
						else
						{
							if(this.tape.pos == breakpoints[j].where)
							{
								breakpoints[j].incrementCounter();
								
								if(breakpoints[j].counter == breakpoints[j].times)
								{
									$('#output').append("Breakpoint!" + " Current Tape Position: " + this.tape.pos + "; Message: " + breakpoints[j].message + "<br>");
									
									turingMachine.pause();
								}
							}
						}
					}
				}
				
				j++;
			}
		}
	}
	this.runNsteps= function(numberOfSteps){
	}
	this.run= function(){
		
		document.getElementById("runButton").disabled = true;
		document.getElementById("stopButton").disabled = false;
		document.getElementById("pauseButton").disabled = false;
		
		clearInterval(timer);
		
		running = true;
		
		var timeNull = 0;
		var timeWait = 750;
		var timeBetween = 0;
		if($("#chkRealTime").is(":checked")){
			timeBetween = timeNull;
		}
		else{
			timeBetween = timeWait;
		}
		steper = setInterval(function ()
		{
			if (stepReturn != 2)
			{
				clearInterval(steper);
				clearInterval(timer);
				
				turingMachine.reset();
				
				document.getElementById("runButton").disabled = false;
				document.getElementById("stopButton").disabled = true;
				document.getElementById("pauseButton").disabled = true;
				
				running = false;
				
				time = 0;
				
				
				if(currentInput < inputs.length)
				{
					//create Tape
					tape= new Tape(alphabetSet, blankSymbolInput, 0, inputs[currentInput]);
					
					currentInput++;
			
					//tape.show();
			
					//create Turing Machine
					turingMachine= new TuringMachine(tape, data, initialStateInput, finalStates);
			
					//turingMachine.show();
					
					turingMachine.run();
					
					running = true;
				}
			}
			else
			{
				turingMachine.step();
				var elem = document.getElementById('output');
  elem.scrollTop = elem.scrollHeight;
			}
		}, timeBetween);
		
		timer = setInterval(function ()
		{
			if (stepReturn != 2)
			{
				
			}
			else
			{
				var timeTemp = time + 0.01;
				time= Math.round(timeTemp*100)/100;
				$('#tsteps').html(time + " s");
			}
		}, 10);
	}
	
	
	this.changeSteper = function()
	{
		if(running == true)
		{
			clearInterval(steper);
			
			var timeNull = 0;
			var timeWait = 750;
			var timeBetween = 0;
			if($("#chkRealTime").is(":checked")){
				timeBetween = timeNull;
			}
			else{
				timeBetween = timeWait;
			}
			steper = setInterval(function ()
			{
				if (stepReturn != 2)
				{
					clearInterval(steper);
					clearInterval(timer);
				
					turingMachine.reset();
				
					document.getElementById("runButton").disabled = false;
					document.getElementById("stopButton").disabled = true;
					document.getElementById("pauseButton").disabled = true;
					
					running = false;
					
					time = 0;
					
					
					if(currentInput < inputs.length)
					{
						//create Tape
						tape= new Tape(alphabetSet, blankSymbolInput, 0, inputs[currentInput]);
						
						currentInput++;
				
						//tape.show();
				
						//create Turing Machine
						turingMachine= new TuringMachine(tape, data, initialStateInput, finalStates);
				
						//turingMachine.show();
						
						turingMachine.run();
						
						running = true;
					}
				}
				else
				{
					turingMachine.step();
				}
			}, timeBetween);
		}
	}
	
	this.show= function(){
		document.write("tape... <br>");
		document.write("Initial State= " + this.initialState + "!<br>");
		document.write("Final States: <br>");
		for(var j= 0; j < finalStates.length; j++)
		{
			document.write(finalStates[j] + "; ");
		}
		
		document.write("<br>");
		document.write("Current State: " + this.currentState + "!<br>");
		
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

// Breakpoint Class
function Breakpoint(type, where, times, message)
{
	this.type = type;
	this.where = where;
	this.times = times;
	this.message = message;
	
	this.counter = 0;
	this.sequencer = 0;
	
	this.resetCounter = function()
	{
		this.counter = 0;
	}
	
	this.incrementCounter = function()
	{
		this.counter = this.counter + 1;
	}
	
	this.resetSequencer = function()
	{
		this.sequencer = 0;
	}
	
	this.incrementSequencer = function()
	{
		this.sequencer = this.sequencer + 1;
	}
}