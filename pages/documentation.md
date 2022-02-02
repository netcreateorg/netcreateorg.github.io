---
layout: page-fullwidth
title: "Net.Create Documentation"
subheadline: "Getting Started with Net.Create"
teaser: "This documentation is a work in progress."
permalink: "/documentation/"
---

# Getting Started (for folks new to technology)

The first part of this guide will help you install Net.Create and keep it up to date. The second part of the guide documents the files, file formats, and file locations you’ll need to know to run Net.Create on a regular basis.

## The “Command line” or “Command prompt”

When you select or open a folder with your mouse, rename or open a file with a specific piece of software, or change a setting in a piece of software, you’re telling your computer how you want to interact with it. When we use Macs or PCs, we’re using a GUI environment–a graphical user interface that gives us folders and files to click on by using a mouse.

Each mouse click executes a command: “open a folder”, “list the files in that folder”, “use this software to open that file”. Mac computers have a built-in app called Terminal that exposes the keyboard-based versions of those commands.

### Home Directories

One of the most important concepts for users new to the command line is the “home directory”. When you log in to your computer, you’re telling it who you are and where the folder that stores all of your files is located: `/Users/yourusername/` .

### How to Read Paths

A “path” is a fancy way to say that there are folders inside of other folders on your computer, and to find a file, you need to open the right folders in order. Your home directory is expressed as a path: `/Users/yourusername/`.

|	Path element	|	What it means 													|
|	`/`				|   Open the main hard drive on this computer						|
|	`Users`			| 	Inside the main hard drive is a folder called “Users”			|
|	`/`				|   We’re going to look for a file or folder inside “Users” now.	|
|	`yourusername/`	| 	Inside the “Users” folder is a folder labeled with your user name. We know it’s a folder because of the trailing slash, or the slash at the end of the command.			|

So, if you had stored a Microsoft Word document called `MyWordFile.docx` in the `Documents` folder of your main user directory, its path (or storage location) would be: `/Users/yourusername/Documents/MyWordFile.docx` .

Your user directory has a nickname: `~/`

So `/users/yourusername/` and `~/` are references to the same path.

### Opening directories

Instead of double-clicking to open a directory, we `cd` or “change directory” by typing the following line and then pressing “return”:

```
cd /Users/yourusername/Documents
```

```
cd ~/Documents
```

When you type either one of these into the command prompt and hit return, you’ll “move” out of the directory you’re in, and into the Documents directory in your main user folder. The commands you run now will affect the directory you "moved" into.

If you get lost and can't tell which directory you're in, you can use the `pwd` or “print working directory” command to see which directory you’re currently in.

### Running commands

When you double-click on a file, you’re explicitly asking your computer to open that file, but you’re implicitly choosing an application that can open the file too. On the command line, you have to specify an application or a command. There are two general actions we might want to take: seeing what’s in our current directory or manipulating files in our current directory with another program.

The change-directory command is one of those “look and see” commands. So is “ls” or “list” which prints out a list of the files that are in your working or current directory.

If we want to open and manipulate a file, we need to specify the program. That usually requires us to type two different things: an application name and then the file we want to work with, separated by a space.

Word /Users/yourusername/Documents/MyWordFile.docx

Or

Word ./MyWordFile.docx

The first lets us open MyWordFile.docx no matter which directory we currently have open. The second says “./” or “I am in a directory that I know contains a file called MyWordFile.docx so please don’t make me type the whole thing!”.

Software “Environments” and “Dependencies”
------------------------------------------

Software developers use the word “environment” to handwave at a whole bunch of interlocking things: operating system, the software that’s been installed, where certain required software packages (“dependencies”) are installed, and where you keep your data. These environment variables are sometimes invisible. For instance, most software just gets installed in the Applications folder.

For software packages like Net.Create, you’ll need to explicitly control those environment variables by using the command line to control your computer (instead of point-and-click interactions). The instructions here use the command line to install software in specific places, adding configuration information to hidden system files.

# The Net.Create environment and its dependencies
===============================================

Net.Create requires several software packages to run. That is, it has the following dependencies:

-   MacOS or Digital Ocean  (a Linux-based operating system). We suggest Digital Ocean for folks who want to access Net.Create from many different places. Net.Create does not run on Windows machines (yet).
-   NodeJS  is a set of Javascript libraries that build the network nodes and edges, let users drag the graph around and hide/display the Node/Edge tables.
-   Node Package Manager (npm) and Brunch  help keep those libraries up to date
-   XCode  provides the programming infrastructure that helps MacOS run these libraries and javascript packages.

# Choosing Your Net.Create Install Platform
=========================================

Net.Create can run on either MacOS or Digital Ocean. Follow one of those two paths in this section before you move on to the “Installing Net.Create” section.

## Installing Net.Create dependencies on MacOS
-------------------------------------------

Net.Create isn’t double-clickable, either when you run it or when you install it. Instead, it uses a set of commands typed in at the command line. Installing Net.Create requires a number of these commands in sequence. Running it only requires 1.

The Net.Create Wiki has a full set of environment, dependency and code installation instructions:

[https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#installing-the-development-environment](https://www.google.com/url?q=https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide%23installing-the-development-environment&sa=D&source=editors&ust=1643819696081580&usg=AOvVaw37yNBcC_6XtKnjAFb8yxFH) 

If you are running Net.Create on an Apple with an M1 chip (or you’re not sure):

*   Go to your apple menu and choose “About This Mac”
*   Look at the line that starts with “Chip”. If this line reads “Chip Apple M1”, you need to enter an additional command in your terminal: arch -x86\_64 zsh

### For folks new to command-line installs

There are a few points along the way where users less familiar with the command line might run into trouble. Read these first so you can work out which steps you’ll need to modify and how you’ll need to modify them:

- Step 4 varies based on your MacOS version
  - If you are running MacOS earlier than Catalina, use: touch .bash\_profile
  - If you are running Catalina or later, use: touch .zshrc
-  Step 6 has two variations.
  - First check the NVM install page to make sure you are using the most recent version.
  - Then, look for what programmers call a pipe, the vertical line after “install.sh” that looks like this: | . Pipes separate the main part of a command in the command line from an extension of that command that might have some variances from system to system. Adjust what comes after it based on your MacOS.
  - Earlier than Catalina:

  - curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

  - Catalina or later:

  - curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | zsh

  - Remember that spaces also act as separators in the command line. You’ll need a space before and after the pipe.

- If step 8 fails, you may need to check your /User/yourname/ folder for a file called .zshrc or .bash\_profile .

  - These files are hidden by default. Open your main user directory and press Command + Shift + . (period) to show hidden files.
  - You will have either .zshrc or .bash\_profile in that folder. Right click it and use the “Open With” option to open this file with the application “Text Edit”
  - If this file is blank, you need to add four lines of environment variables (copied and pasted below) and then save the file

​​export NVM\_DIR="$HOME/.nvm"

\[ -s "$NVM\_DIR/nvm.sh" \] && . "$NVM\_DIR/nvm.sh"  # This loads nvm

\[ -s "$NVM\_DIR/bash\_completion" \] && . "$NVM\_DIR/bash\_completion"  # This loads nvm bash\_completion

  - Finally, type “exit” in your terminal window, quit out of the terminal, and then reopen your terminal window.

# Configuring Digital Ocean servers with Net.Create dependencies
--------------------------------------------------------------

1.  In Digital Ocean: Create -> Droplet (for full instructions see [https://docs.digitalocean.com/products/droplets/how-to/create/](https://www.google.com/url?q=https://docs.digitalocean.com/products/droplets/how-to/create/&sa=D&source=editors&ust=1643819696085980&usg=AOvVaw04vE3vdefbVxqVxOLIuybQ) ) ![](images/image4.png) 
2.  Select the following settings:

  1.  Ubuntu for the distribution
  2.  Basic for the plan
  3.  Regular Intel for the CPU option
  4.  The $5 per month plan (unless you expect an enormous amount of traffic)
  5.  The default data center with no added storage

3.  For security and access, the “password” option is easier to manage but if you are comfortable with SSH logins, it won’t affect your Net.Create install. You can leave the other information like host name unchanged if you are less familiar with server setups; if you are familiar with server setups, changes here won’t significantly affect your Net.Create install.
4.  Wait for the new droplet to be setup.
    1.  It will appear under the project where it was created, or via the droplet menu on the left.
    2.  The blue bar shows how far along it is in setting up. This should only take a few minutes). ![](images/image3.png) 
5.  Click on the droplet name either in the project or list of droplets
6.  Click on Access on the left
    1.   ![](images/image1.png) 
7.  Click on launch droplet console to access the console
8.  You can now create a folder for your projects
    1.  Enter mkdir dev
    2.  Enter cd dev  to move into that folder
9.  Setup Node Version Manager (NVM)
    1.  Enter sudo apt install curl
    2.  Enter  Curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
    3.  Close the console, reopen it, and reopen the dev folder ( cd dev  t
    4.  Enter nvm all setup
    5.  Enter nvm use 10.22 . NOTE: this is older, but it’s the one Net.Create was written with

Installing Net.Create
=====================

Net.Create uses GitHub to let several software developers work on its code all at once without overwriting each other.

GitHub also lets you download and install a copy of the Net.Create software: [https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#download-and-run-the-source-code](https://www.google.com/url?q=https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide%23download-and-run-the-source-code&sa=D&source=editors&ust=1643819696089841&usg=AOvVaw1eFtBeGkAo8p30y8iBfQZ9)

*   open Terminal
*   cd to the project's build directory: dev/netcreate-2018/build/
*   Then use the command “git” and its setting “clone” to copy the contents of the Net.Create software package from github.com to your local computer:

*   git clone [https://github.com/netcreateorg/netcreate-2018.git](https://www.google.com/url?q=https://github.com/netcreateorg/netcreate-2018.git&sa=D&source=editors&ust=1643819696090543&usg=AOvVaw06dRbejpYsN4ys4z_xM2mC)

*   The next step is to tell your computer which version of Net.Create you want to use: git checkout dev tells your computer that you want to use the command “git” to “checkout” or use the “dev” version of Net.Create, which is the most stable recent version of Net.Create
*   We need to open the directory that has the dev build of Net.Create in it

*   cd netcreate-2018/build

*   And then we need to use node package manager “npm” to compile “ci”, or put together, a version of Net.Create that’s customized for the computer we’re currently using.

*   npm ci

Administering Net.Create
========================

Starting and Stopping Net.Create
--------------------------------

Running Net.Create has two components:

1.  Starting the server in the terminal
2.  Accessing the server from a browser

### Before you start the server for the first time

The \`runtime\` folder that holds your network templates, data, and network-access logs is not created automatically during the Net.Create installation process.

*   On a Mac you can navigate to the build folder in your netcreate-2018 folder and make a folder called runtime.
*   On Digital Ocean

*   Cd to the netcreate-2018/build/ folder
*   Enter mkdir runtime

### Starting the server on a Mac

Note that on MacOS, the Net.Create server will stop when you put your Mac to sleep (or close the laptop lid) but restart when the Mac wakes up.

*   Decide whether you are opening an existing network or creating a new network.

*   If you are opening an existing network, confirm that the network has both a “.loki” and “.template” file. Use the name of the network before the period “.” as the dataset you are opening.
*   If you are creating a new network, choose a network name with no spaces in it that does not already exist.

*   Note the name of the network you will oepn/create. For these examples, we will use “MyNetwork” as the network name.
*   In the terminal, go to netcreate-2018/dev/build
*   Enter ./nc.js --dataset=MyNetwork
*   Watch for the MAIN APP and CLIENT APP lines

*   MAIN APP will usually be [http://localhost:3000](https://www.google.com/url?q=http://localhost:3000&sa=D&source=editors&ust=1643819696096628&usg=AOvVaw2hekkSPXHOfQ2RBtYVb27D)
*   CLIENT APP will vary based on your current IP address (the address you have been assigned on your network, which will be a string of numberS)

### Starting the server on Digital Ocean

 On Digital Ocean, closing the terminal will stop the Net.Create server.

*   Decide whether you are opening an existing network or creating a new network.

Stopping Net.Create
-------------------

You may need to stop Net.Create because you want to control who’s editing it, or because you have a new template to load, or because you’re switching databases.

Either way, the process is simple. Go to your terminal, which should have the Net.Create logging lines printing out. Press CTRL-C to interrupt the Net.Create process and get your command line back.

To get the previous command you typed into the terminal (the one that starts the Net.Create network you just stopped), press the “up” arrow on your keyboard.

Using Net.Create is fairly easy and documentation on how to add nodes and edges is in video form at XXXX. To give users access to Net.Create, to delete nodes, and to set up node/edge types and notes fields that suit your project, you need a few additional instructions.
