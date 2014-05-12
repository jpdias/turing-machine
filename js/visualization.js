var nodes, edges;

function addNode(idValue, labelValue) 
{
	try
	{
		nodes.add
		(
		{
		id: idValue;
		label: labelValue;
		}
		);
	}
	catch (err)
	{
		alert(err);
	}
}

function addEdge(idValue, fromValue, toValue, labelValue) 
{
	try
	{
		edges.add
		(
		{
		id: idValue;
		from: fromValue;
		to: toValue;
		label: labelValue;
		}
		);
	}
	catch (err)
	{
		alert(err);
	}
}

function createGraphVisualization()
{
	// create a graph
	var container = document.getElementById('visualization');
	
	var data =
	{
		nodes: nodes,
		edges: edges,
	};
	
	var options =
	{
		height: '750px'
	};

	var graph = new vis.Graph(container, data, options);
}
