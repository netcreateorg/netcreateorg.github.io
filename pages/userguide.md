---
layout: page
show_meta: false
title: "Simple Quick-Start Guide for Net.Create Users"
permalink: "/userguide/"
---

### How to use Net.Create to Make Networks

Our [user guide](/netcreate-userdocs/) provides basic information on how to add and edit nodes and edges and how to "read" the network "graph" or visualization.

<p><a class="button tiny radius" href="/netcreate-userdocs/">User Guide</a></p>

<!--
## Before you start

Make sure your Net.Create manager has:.
1. set up a template to reflect the node and edge categories you want to use.
1. given you an editing-access token.

## Log in to Net.Create

1. Enter your access token in the "Login" field in the top right-hand corner of your Net.Create window. If your access token is correct, a green check mark will appear.
1. Press your "return" or "enter" key to reload the page with your access token in place
1. Create a bookmark to save your personal Net.Create data-entry web site address.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ccxgNL_1RkI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Find Nodes and Edges

The left-hand node-information pane provides a quick easy way to determine whether a node is already in the network or not.

1. Find the search field, labeled "Type node name...", in the top left-hand corner of your Net.Create window.
1. Type in the first few letters of your new node.
	1. **If the node already exists in the network**, a drop-down menu will pop up with any matching nodes in the network. You can select your node of interest from that menu or continue typing.
	1. **If no drop-down menu appears,** your node is not yet in the network.

<iframe width="560" height="315" src="https://www.youtube.com/embed/730Hopf6j5I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Add a Node

1. Type your node name/label in the search field at the top of the left-hand node-information pane.
1. Confirm that your node is not in the network. *If it is in the network, a drop-down menu will pop up with any matching nodes in the network.*.
1. Press 'Add New Node' to transfer your new node to the label field in the add-node form at the top of the left-hand node-information pane.
1. ***Optional***Choose the node type from the drop-down menu and enter any other details you have on hand. ***You can also edit the node type and other details later.
1. Press the 'Save' button.
1. Your new node should float to the center of the network visualization and appear in the Nodes Table.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7vUTy9rGkJ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Add an Edge

1. Confirm that both of the nodes you want to connect are already entered.
1. Select one of the nodes.
1. In the left-hand node-information pane, scroll down and find the the 'Add New Edge' button.
1. Press the 'Add New Edge' button and scroll down to see the add-edge form.
1. Choose the edge type from the drop-down menu.
1. Type the first few letters of the second node in the 'Target' field. Like the search field, the Target field uses predictive text to find matching nodes.
1. Select the second node in your interaction from the drop-down menu of matching nodes.
1. Read the new edge as a sentence, from Source to Type to Target. If you want to adjust the order of this edge's "sentence", press the up-down arrow button to swap the Source and Target in the interaction.
1. ***Optional***Enter any other details you have on hand. ***You can also edit edge details later.
1. Press the 'Save' button.
1. A new edge should appear between the Source node and Target node you selected.
Add Edge https://youtu.be/fF1QWSu30Pk

## Use the Node and Edge Data Tables

Network graphs are complex aggregate representations of lots of simple node-to-node data points. The Node and Edge data tables make each one of the individual data points visible in spreadsheet form.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wPRGriuaNX0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Node Tables

Node tables can be sorted by Degree (the number of edges a node has), Label (the node's primary name or identifier), Type (the category assigned to a node), and several other fields that are built into Net.Create's interface.

To edit a node's label, type, or other data from the Node Table, press the "edit" button.

To see a node's list of edges, click the node label itself in the row of data. Each edge for that node will appear on a single line. To see details about the edge, click that line to expand the edge-editing panel.

### Edge Tables

Edge tables can be sorted by Source (the first node in an interaction), Type (the category assigned to an edge), Target (the second node in an interaction), Citation, and several other fields that are built into Net.Create's interface.

To edit a node's source, type, target or other data from the Edge Table, press the "edit" button. The source node's listing will appear in the node-information pane on the left, and the edge will auto-expand at the bottom of the node-information pane.

## Edit a node or edge

1. Select your node from the network graph or the Nodes Table, or select the edge from the Edge Table.
1. Find the "edit" button under either the node or edge you wish to edit.
	1. When you are done editing, press the "Save" button.
	1. If you don't want to save your changes, press the "Cancel" button to release the node for editing by other collaborators.

Because Net.Create was ***designed for simultaneous data entry by many collaborators,*** you either need to ***press the save button or the cancel button*** or the node/edge you selected for editing will remain locked and ***no one else will be able to edit it***.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GLcA2gA37Hs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Understand and filter the network

### Sizing and placement in the network visualization

We've chosen force direction to automatically position and size nodes based on their "degree centrality" or the number of edges that are associated with a node.

Force direction works like planetary gravity. The higher a node's degree centrality, the bigger the node will be. The more variety of connections a node has, the more centrally it will be positioned in the network.

As you drag nodes around, other nodes that are closely connected will quickly "follow" the node you are dragging. Nodes that are less closely connected will stay mostly in place.

### Use filters to see relevant network data more easily

The right-hand "Filter" panel pops out to let you search for nodes and edges that meet specific criteria.

Filtering out nodes that don't have any connections can help you see the "giant component" or the largest set of interconnected nodes in your network.

1. Press "Filters" to open the filter panel.
1. Find the "Degree" filter in the Node filter section.
1. Choose the > (greater than) Degree filter from the drop down menu.
1. Enter "0" (zero) in the Degree-filter text box.
1. The filter will automatically "Highlight" the nodes that meet your filter requirements, and turn nodes with fewer than 1 connection transparent.
1. To hide nodes with fewer than 1 connection (instead of leaving them visible but more transparent), toggle the Higlight/Filter setting by pressing the "Filter" button.

You can use the filter/highlight selections to search for nodes with labels or keywords in the notes fields that match your search terms, or to hide entire categories of node or edge types.

<iframe width="560" height="315" src="https://www.youtube.com/embed/nhupT4VZ7Ag" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
-->