var nodes, edges;

nodes = new vis.DataSet();

edges = new vis.DataSet();


var currentColoredNodeId = "";


function addNodes(statesSet) {
    for (var i = 0; i < statesSet.length; i++) {
        if (i == 0) {
            addInitialNode(statesSet[i], statesSet[i]);
        }
        else {
            addNode(statesSet[i], statesSet[i]);
        }
    }
}

function addFinalNodes(finalStates) {
    for (var i = 0; i < finalStates.length; i++) {
        addFinalNode(finalStates[i], finalStates[i]);
    }
}

function addNode(idValue, labelValue) {
    try {
        nodes.add
        (
            {
                id: idValue,
                label: labelValue,
                color: 'blue'
            }
        );
    }
    catch (e) {

    }
}

function addInitialNode(idValue, labelValue) {
    try {
        nodes.add
        (
            {
                id: idValue,
                label: labelValue,
                color: 'yellow'
            }
        );
    }
    catch (e) {

    }
}

function addFinalNode(idValue, labelValue) {
    try {
        nodes.add
        (
            {
                id: idValue,
                label: labelValue,
                color: 'green'
            }
        );
    }
    catch (e) {

    }
}

function addEdge(idValue, fromValue, toValue, labelValue) {
    try {
        edges.add
        (
            {
                id: idValue,
                from: fromValue,
                to: toValue,
                label: labelValue
            }
        );
    }
    catch (e) {

    }
}

function colorNode(nodeId) {
    try {
        if (currentColoredNodeId != "") {
            if (currentColoredNodeId == initialStateInput) {
                nodes.update
                (
                    {
                        id: currentColoredNodeId,
                        color: 'yellow'
                    }
                );
            }
            else {
                var found = false;

                for (var i = 0; i < finalStates.length; i++) {
                    if (currentColoredNodeId == finalStates[i]) {
                        found = true;

                        break;
                    }
                }

                if (found == true) {
                    nodes.update
                    (
                        {
                            id: currentColoredNodeId,
                            color: 'green'
                        }
                    );
                }
                else {
                    nodes.update
                    (
                        {
                            id: currentColoredNodeId,
                            color: 'blue'
                        }
                    );
                }
            }
        }

        if (nodeId == initialStateInput) {
            nodes.update
            (
                {
                    id: nodeId,
                    color: 'orange'
                }
            );
        }
        else {
            var found = false;

            for (var i = 0; i < finalStates.length; i++) {
                if (nodeId == finalStates[i]) {
                    found = true;

                    break;
                }
            }

            if (found == true) {
                nodes.update
                (
                    {
                        id: nodeId,
                        color: 'brown'
                    }
                );
            }
            else {
                nodes.update
                (
                    {
                        id: nodeId,
                        color: 'red'
                    }
                );
            }
        }

        currentColoredNodeId = nodeId;
    }
    catch (e) {
        alert(e);
    }
}

function createGraphVisualization() {
    // create a graph
    var container = document.getElementById('visualization');

    var data =
    {
        nodes: nodes,
        edges: edges
    };

    var options =
    {
        height: '375px',

        edges: {
            style: 'arrow'
        }
    };

    var graph = new vis.Graph(container, data, options);
}
