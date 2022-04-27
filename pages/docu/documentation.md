---
layout: page-fullwidth
title: "Net.Create Documentation"
subheadline: "Getting Started with Net.Create"
teaser: "This documentation is a work in progress."
permalink: "/documentation/tempindex.html"
---

* TOC
{:toc}

Make choices				
	Choose your level		Beginner	Expert
	Choose your platform		MacOS	Digital Ocean
	Choose your model		Single	Multiplex
				
Install				
	Prep dependencies			
	Prep shell		zshell	bash
	Test shell and dependencies			
	Get and install multiplex			
	Get Net.Create code			
	Install Net.Create code			
				
Quickstart				
	Make new DB			
	Edit template			
	Make access codes			
	Edit			
				
Troubleshoot				
	Node Deletion and Merging			
	Locked nodes/edges			
	Export			
	Import			
				
Humanists Guide to Net.Create				
	Choosing node/edge types			
	Choosing attributes			
	Using attributes for effective filtering			
	Analysis			
	
	
# Net.Create Technical Details

Net.Create is a webapp that runs on a local area network (LAN) on MacOS (or on an Ubuntu server at Digital Ocean).

v 1.4 UPDATED 04/25/2022: tested on macOS 12.0.1 (Monterey) system / Digital Ocean Ubuntu / Node 10.22

## The Basics of Running Net.Create

### Initial Setup

- You will **install** code from GitHub on a server computer (the "appserver" running on MacOS or Digital Ocean)
- The appserver is **run** using the **Terminal** app by entering command-line instructions.
- People access the app from client computers using the Chrome browser. If you are running on MacOS, users must be on the same local-area network (LAN), but can be PC or Mac.

### Maintenance

- After **initial setup**, you'll need to **run** and occasionally **update** the software.

# Choose Your Platform and Type of Use

| Are you:                               | Will you be using: | Do you have:         |
|----------------------------------------|--------------------|----------------------|
| - New to the command line?             | - MacOS?           | - A single network?  |
| - Familiar with command-line software? | - Digital Ocean?   | - Multiple networks? |

Are you:
- New to the command line?
- Familiar with command-line software?

Will you be using:
- MacOS?
- Digital Ocean?

Do you have:
- A single network?
- Multiple networks?

***If you are new to the command line or would like some entry-level guidance,*** we have a [Getting Started For Folks New To Technology guide](http://netcreate.org/beginnersguide/) available that will offers some tips and tricks for installation and troubleshooting. Some initial documentation on Digital Ocean installation is available in the Getting-Started documentation.


# The Net.Create environment and its dependencies

Net.Create requires several software packages to run. That is, it has the following dependencies:

- MacOS or Digital Ocean  (a Linux-based operating system). We suggest Digital Ocean for folks who want to access Net.Create from many different places. Net.Create does not run on Windows machines (yet).
- NodeJS  is a set of Javascript libraries that build the network nodes and edges, let users drag the graph around and hide/display the Node/Edge tables.
- Node Package Manager (npm) and Brunch  help keep those libraries up to date
- XCode provides the programming infrastructure that helps MacOS run these libraries and javascript packages.

# Choosing Your Net.Create Install Platform: MacOS or WindowsDigital Ocean

Net.Create can run locally on your computer *if you have a Mac.* If your personal computing device is a Windows machine, you'll need to use Digital Ocean, a cloud server (~$5/month). Follow one of those two paths in this section before you move on to the “Installing Net.Create” section.

## If your personal computer is a Mac...

You can install Net.Create on your Mac directly.

Net.Create isn’t double-clickable, either when you run it or when you install it. Instead, it uses a set of commands typed in at the command line. Installing Net.Create requires a number of these commands in sequence. Running it only requires 1.

The Net.Create Wiki has a full set of environment, dependency and code installation instructions:

[https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#installing-the-development-environment](https://www.google.com/url?q=https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide%23installing-the-development-environment&sa=D&source=editors&ust=1643819696081580&usg=AOvVaw37yNBcC_6XtKnjAFb8yxFH) 

If you are running Net.Create on an Apple with an M1 chip (or you’re not sure):

- Go to your apple menu and choose “About This Mac”
- Look at the line that starts with “Chip”. If this line reads “Chip Apple M1”, you need to enter an additional command in your terminal: `arch -x86_64 zsh`


# Installing the Development Environment

If you are installing on a clean system, you will need to install **[`Git`](https://git-scm.com/)** and **[`Node`](https://nodejs.org/en/)** (as managed by **[`nvm`](https://github.com/creationix/nvm/#installation)**). 

1. open **Terminal** app
2. enter `xcode-select --install` (accept dialog box, then wait for install to complete)
3. enter `cd ~; mkdir dev` (creates a 'dev' directory in your user folder)
4. enter `touch .zshrc` (if you are running macos earlier than Catalina, use `touch .bash_profile` instead)
5. enter `mkdir .nvm` (creates important folder for next step)
6. enter `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | zsh` (install nvm; double-check that this is up-to-date on [official nvm install page](https://github.com/creationix/nvm#installation)). (if you are running macos earlier than Catalina, replace the `zsh` at the end of this command with `bash`)
7. enter `cd dev` (switch to your 'dev' folder)
8. enter `nvm install 10.22` (install our required version of NodeJS)
9. enter `nvm use 10.22` (tell system to use NodeJS 10.22 for this directory)
10. enter `nvm default 10.22` so nvm remembers your choice for every session

This project requires **[`brunch`](http://brunch.io/)**, a command-line build tool for managing code compilation. You'll need to install the brunch tool **once**:

* enter `npm install -g brunch@^2.0.0` (Net.Create uses Brunch v2, so we specify the latest version 2.x.x here. Brunch 3.x.x is not compatible.)

Here are the [supplemental notes](Installation-Notes-(Supplemental)) on the installation process and other useful dev tools. Or just contact Dave or Ben.

## Download and Run the Source Code

### First-Time Source Code Installation

In Terminal change your working directory to where you will be keeping the Net.Create code. I use `~/dev` here as the example. 

Clone the repo from Github:

1. open **Terminal** app
2. enter `cd ~/dev`
3. enter `git clone https://github.com/netcreateorg/netcreate-2018.git` (you may be prompted to enter your github user/password)
4. enter `cd netcreate-2018`
5. enter `git checkout dev`
6. enter `cd build`
7. enter `npm ci`

This should load all the dependencies from the Internet. It may take several minutes. This takes care of the installation of the code, so you will just be running and updating the project from this point on.

### Creating a data folder

Before you run Net.Create for the first time, you also need to create a `runtime` directory in the `build` directory, which contains your individual user data and template files. The install process does not automatically create this directory.

1. enter `cd ~/dev/netcreate-2018/build/`
2. enter `mkdir runtime`

The template and data files for any networks you create are stored in this runtime folder. 

### Running Net.Create

To run the project from the `build` directory.

* open **Terminal** and `cd` to the project's `build` directory (e.g. `cd ~/dev/netcreate-2018/build`
* enter `./nc.js --dataset=MyNetwork` where "MyNetwork" is either the name of a network with existing loki/template files in the runtime directory or a new network for which you would like to create these files. See the [User Guide](/daveseah/netcreate-2018/wiki/User-Guide) for more information.
    * Deprecated: To run a default network, use `npm run dev`. The template/loki files for a default network will not be automatically created and this command will likely return `error: Initialization error - Cannot find module` response and Net.Create will not run.
* open Chrome on the same computer and browse to **localhost:3000**
* optionally open Chrome on another computer on the same LAN and browser to the "client" address shown on the terminal output (you may need to scroll up to see it)

**Reporting Problems:** For status messages, both Terminal and the Chrome Javascript console will emit information that may be helpful. If you **encounter a problem**, please grab a **screenshot of the problem** that shows the problem with the Terminal and console information and contact us.

### Advanced Options

#### Heartbeat

Both the server and client sides will listen for a hearbeat from each other every 10 seconds (default).  You can change this value by editing `build/app/unisys/common-defs.js` line 13: `DEFS.SERVER_HEARTBEAT_INTERVAL = 10000;`  For example, to set it to 3 seconds, change the line to `DEFS.SERVER_HEARTBEAT_INTERVAL = 3000;`


## Updating the Source Code

When the dev team releases a code update, you can use **Terminal** to do an update:

* open **Terminal** and `cd` to the project `build` directory.
* be sure you are in the right "branch" by entering `git status` (we use `dev` for latest test release)
* enter `git pull` to update the source code
* enter `npm run clean` to erase old compiled files "just in case"
* Enter `npm ci` in case there are new libraries added
* Enter `npm run dev` to run the project

NOTE: If you have **modified the source code** you will see a warning about losing changes. To do the `git pull` command, you will have to do one of the following first:

* `git stash push` to keep changes you've made
* `git reset --hard HEAD` to delete changes FOREVER

NOTE: You can also do the `git pull` through the **SourceTree** app, which provides a GUI that is a little easier to use than the command line. This is what we actually for our day-to-day.

You should be able follow the RUN instructions at this point.

# Data Entry and User Access

## Giving Users Edit Permissions

### Creating Access Tokens

To create access tokens that will allow users to edit an open Net.Create dataset:
- Open Chrome
- Use the View menu to find the Developer menu item, and choose Javascript Console. The Javascript console functions much like the terminal: commands here are typed in with different variables to tell the computer to do something specific.
- In this case, we'll use the `ncMakeTokens` command to generate access tokens. Access tokens have 4 parts
	- The project name. A short alphanumeric string in single or double quotes (e.g. "team", "projname", "proj1")
	- The group name within this project in single or double quotes (e.g. "blue" or "grp1" or "social"). This allows you to have several sets of groups accessing the same project, so you can track who changed what in the logs)
	- The name of the dataset in single or double quotes. This is the name that precedes the .loki and .template in the actual names of your dataset and template files. It is case-sensitive.
	- The number of tokens you want to generate, not in quotes. This should be a numeric value (50, rather than "fifty")
- Type `ncMakeTokens(‘Project’,’GroupOfUsers’,’datasetname’,NoOfUsers)` and press enter.
- Right click and choose Copy String to copy the list of Access tokens. Save these somewhere for distribution to your users.

### Using Access Tokens

When a user opens the CLIENT APPS url for your Net.Create install, they will need to enter an access token into the field in the upper right corner of the Net.Create app and press enter. They can bookmark the resulting URL for easy ongoing access. 

Access-token-authenticated users can add and edit nodes and edges and delete edges but cannot delete nodes.

### Deleting Nodes

***WARNING:*** Node deletion can create serious data problems for multiple-person research teams. If a node is deleted or merged with another node by one user while a second user is adding an edge for that node (or editing that node), an edge with no corresponding node will be created, which can destabilize the entire dataset. We recommend deleting nodes only when there are no other users editing the network.

A user logged in to Net.Create on the same machine as the Net.Create server using the http://localhost:3000 URL will automatically have node deletion privileges. To give a user node-deletion privileges, add `?admin=true` to the end of the URL after logging in with an access token. 

## Data and Template files

Net.Create uses two files to control each network: a data file (.loki) and a template file (.template.toml) . The data file contains the nodes, edges and notes you've taken. The template file contains node and edge type settings, the name of the network, and the different attributes (fields in the node and edge tables).

These files are stored in `~/dev/netcreate-2018/build/runtime` . Each network you've created will have its own .loki and .template file.

### Change Node and Edge Types

To change your node and edge types, you will need to use a text editor (TextEdit or NotePad++) to edit the .template file for your chosen network.

The Node Types are created in the section of the .template file that begins with "nodePrompts" (approximately line 20 in the file). Each node type has a series of definitions:
```
                 {
                    "id":    "person",
                    "label": "Person",
                    "color": "#aabaf2"
                  },
```
The "id" needs to be a single Western-Roman-character word. The "label" can contain spaces and other characters. The "color" is a [hexadecimal color](https://htmlcolorcodes.com) that you can change at will. ***Please note: the last entry in your node and edge lists should not have the `,` comma after the last of the curly braces `}`***

The Edge Types are created in the section of the .template file that begins with "edgePrompts" (location in the .template file can vary). Each edge type has a series of definitions:
```
                    {
                      "id":    "interacts",
                      "label": "interacts with"
                    },
```
The "id" needs to be a single Western-Roman-character word. The "label" can contain spaces and other characters. Consider making this a partial sentence that will read well with your nodes (e.g. Person "interacts with" another person). ***Please note: the last entry in your node and edge lists should not have the `,` comma after the last of the curly braces `}`***

To make these changes visible to Net.Create end-users, you will need to stop the Net.Create server (`CTRL-C` in your terminal) and restart the Net.Create server using that template (`./nc.js --dataset=YourNetworkName` when you are in the `~/dev/netcreate-2018/build/runtime/` directory in your terminal).
