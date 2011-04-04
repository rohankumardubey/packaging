define(function(){return function(vars){ with(vars||{}) { return "<div class=\"sidebar\"><p class=\"pad\">The Neo4j console allows you to use the <a href=\"http://gremlin.tinkerpop.com\" target=\"_BLANK\">Gremlin graph traversal language</a> for working with your graph. Gremlin is an expressive data flow language that can be used for graph query and manipulation, built on and adding to <a href=\"http://groovy.codehaus.org/Documentation\" target=\"_BLANK\">Groovy</a>.</p><p class=\"pad\">Using Gremlin, you can perform powerful data manipulations. <a href=\"http://gremlin.tinkerpop.com\" target=\"_BLANK\">More information.</a></p><div class=\"foldout\"><h2><a href=\"#\" class=\"foldout_trigger\">Cheat sheet</a></h2><div class=\"foldout_content\"><ul class=\"info_list\"><li><h3>Local graph</h3><p>&gt; g</p></li><li><h3>Set variable</h3><p>&gt; myVar = \"My Value\"</p></li><li><h3>Get node by id</h3><p>&gt; refNode = g.v(0)</p></li><li><h3>Set property on Node</h3><p>&gt; refNode.name = \"Bob\"</p></li><li><h3>List all node properties</h3><p>&gt; refNode.map()</p></li><li><h3>Define a properties map</h3><p>&gt; props = [:]</p></li><li><h3>Add a property to the map</h3><p>&gt; props[\"name\"] = \"Ariel\"</p></li><li><h3>Create a node</h3><p>&gt; secondNode = g.addVertex(props)</p></li><li><h3>Another property map</h3><p>&gt; edgeProps = [\"quality\":\"awesome\"]</p></li><li><h3>Create relation</h3><p>&gt; myRelation = g.addEdge(edgeProps, refNode, secondNode, 'KNOWS')</p></li><li><h3>Remove node or relation</h3><p>&gt; g.removeEdge(myRelation)</p><p>&gt; g.removeVertex(secondNode)</p></li><li><h3>List relations of node</h3></h3><p><ul><li>&gt; refNode.bothE</li><li>&gt; refNode.inE</li><li>&gt; refNode.outE</li><li>&gt; refNode.bothE{it.label=\"relation type\"}</li></ul></p></li><li><h3>List nodes of relation</h3><p><ul><li>&gt; myRelation.bothV</li><li>&gt; myRelation.inV</li><li>&gt; myRelation.outV</li></ul></p></li></ul></div></div></div><div class=\"workarea with-sidebar pad\" id=\"console-base\"><div id=\"console\"></div></div>";}}; });