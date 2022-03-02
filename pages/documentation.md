---
layout: page-fullwidth
title: "Net.Create Documentation"
subheadline: "Getting Started with Net.Create"
teaser: "This documentation is a work in progress."
permalink: "/documentation/"
---

If you prefer to follow installation instructions in video form, we have video-based versions of the Net.Create installation process (current as of 1 Feb 2022) in a [Net.Create playlist at YouTube](https://www.youtube.com/playlist?list=PLM39ibhMucXVuhFHzm56OQHQve-35bFTt) . *You can use the text instructions here to copy and paste the installation instructions as you follow along with the video.*


* TOC
{:toc}

# Getting Started (for folks new to technology)

The first part of this guide will help you install Net.Create and keep it up to date. The second part of the guide documents the files, file formats, and file locations you’ll need to know to run Net.Create on a regular basis.

## The “Command line” or “Command prompt”

When you select or open a folder with your mouse, rename or open a file with a specific piece of software, or change a setting in a piece of software, you’re telling your computer how you want to interact with it. When we use Macs or PCs, we’re using a GUI environment–a graphical user interface that gives us folders and files to click on by using a mouse.

Each mouse click executes a command: “open a folder”, “list the files in that folder”, “use this software to open that file”. Mac computers have a built-in app called Terminal that exposes the keyboard-based versions of those commands.

### Home Directories

One of the most important concepts for users new to the command line is the “home directory”. When you log in to your computer, you’re telling it who you are and where the folder that stores all of your files is located: `/Users/yourusername/` .

### How to Read Paths

A “path” is a fancy way to say that there are folders inside of other folders on your computer, and to find a file, you need to open the right folders in order. Your home directory is expressed as a path: `/Users/yourusername/`.

| Path element    |	What it means |
| `/`             |   Open the main hard drive on this computer |
| `Users`         | 	Inside the main hard drive is a folder called “Users” |
| `/`             |   We’re going to look for a file or folder inside “Users” now. |
| `yourusername/` | 	Inside the “Users” folder is a folder labeled with your user name. We know it’s a folder because of the trailing slash, or the slash at the end of the command. |

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

The change-directory command is one of those “look and see” commands. So is `“ls”` or `“list”` which prints out a list of the files that are in your working or current directory.

If we want to open and manipulate a file, we need to specify the program. That usually requires us to type two different things: an application name and then the file we want to work with, separated by a space.

`Word /Users/yourusername/Documents/MyWordFile.docx`

Or

`Word ./MyWordFile.docx`

The first lets us open `MyWordFile.docx` no matter which directory we currently have open. The second says `“./”` or “I am in a directory that I know contains a file called `MyWordFile.docx` so please don’t make me type the whole thing!”.

## Software “Environments” and “Dependencies”

Software developers use the word “environment” to handwave at a whole bunch of interlocking things: operating system, the software that’s been installed, where certain required software packages (“dependencies”) are installed, and where you keep your data. These environment variables are sometimes invisible. For instance, most software just gets installed in the Applications folder.

For software packages like Net.Create, you’ll need to explicitly control those environment variables by using the command line to control your computer (instead of point-and-click interactions). The instructions here use the command line to install software in specific places, adding configuration information to hidden system files.

# The Net.Create environment and its dependencies

Net.Create requires several software packages to run. That is, it has the following dependencies:

- MacOS or Digital Ocean  (a Linux-based operating system). We suggest Digital Ocean for folks who want to access Net.Create from many different places. Net.Create does not run on Windows machines (yet).
- NodeJS  is a set of Javascript libraries that build the network nodes and edges, let users drag the graph around and hide/display the Node/Edge tables.
- Node Package Manager (npm) and Brunch  help keep those libraries up to date
- XCode  provides the programming infrastructure that helps MacOS run these libraries and javascript packages.

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

### For folks new to command-line installs

There are a few points along the way where users less familiar with the command line might run into trouble. Read these first so you can work out which steps you’ll need to modify and how you’ll need to modify them:

- Step 4 varies based on your MacOS version
  - If you are running MacOS earlier than Catalina *or Digital Ocean*, use: `touch .bash_profile` and `touch .bashrc`
  - If you are running Catalina or later, use: `touch .zshrc`
-  Step 6 has two variations.
   - First check the NVM install page to make sure you are using the most recent version.
   - Then, look for what programmers call a pipe, the vertical line after “install.sh” that looks like this: `|` . Pipes separate the main part of a command in the command line from an extension of that command that might have some variances from system to system. Adjust what comes after it based on your MacOS.
      - Earlier than Catalina:
         - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
       - Catalina or later:
         - `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | zsh`
     - Remember that spaces also act as separators in the command line. You’ll need a space before and after the pipe.
- If step 8 fails, you may need to check your /User/yourname/ folder for a file called `.zshrc` or `.bash_profile`.
  - These files are hidden by default. Open your main user directory and press `Command` + `Shift` + `.` (period) to show hidden files.
  - You will have either `.zshrc` or `.bash_profile` in that folder. Right-click it and use the “Open With” option to open this file with the application “Text Edit”
  - If this file is blank, you need to add four lines of environment variables (copied and pasted below) and then save the file
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
  - Finally, type “exit” in your terminal window, quit out of the terminal, and then reopen your terminal window.

## If your personal computer is a Windows/Linux machine

You'll need to install Net.Create on a cloud server using Digital Ocean (~$5/month) or you need a local Ubuntu install (the later of which we cannot support).

1.  In Digital Ocean: Create -> Droplet . For full instructions see [https://docs.digitalocean.com/products/droplets/how-to/create/](https://docs.digitalocean.com/products/droplets/how-to/create/)
2.  Select the following settings:
    1. Ubuntu for the distribution
    2.  Basic for the plan
    3.  Regular Intel for the CPU option
    4.  The $5 per month plan (unless you expect an enormous amount of traffic)
    5.  The default data center with no added storage
3.  For security and access, the “password” option is easier to manage but if you are comfortable with SSH logins, it won’t affect your Net.Create install. You can leave the other information like host name unchanged if you are less familiar with server setups; if you are familiar with server setups, changes here won’t significantly affect your Net.Create install.
4.  Wait for the new droplet to be setup.
    1.  It will appear under the project where it was created, or via the droplet menu on the left.
    2.  The blue bar shows how far along it is in setting up. This should only take a few minutes).
5.  Click on the droplet name either in the project or list of droplets
6.  Click on Access on the left
7.  Click on launch droplet console to access the console
8.  Create the "shell environment variables" that NodeJS needs to figure out where it needs to install things
    1.  Enter `touch .bashrc`
    2.  Enter `touch .bash_profile`
9.  You can now create a folder for your projects
    1.  Enter `mkdir dev`
    2.  Enter `cd dev` to change directories into the newly created "dev" directory
10.  Setup Node Version Manager (NVM)
     1.  Enter `sudo apt install curl`
     2.  Enter `curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash`
     3.  Close the console, reopen it, and reopen the dev folder ( `cd dev` )
     4.  Enter `nvm all setup`
         1. If this line results in an "nvm is not installed" error, you will need to manually edit your `.bash_profile` using "vi", an old-school text editor that uses keyboard commands rather than mouse commands, to include the location of NVM. The 3 lines you need are at [http://netcreate.org/documentation/#for-folks-new-to-command-line-installs](http://netcreate.org/documentation/#for-folks-new-to-command-line-installs) and begin with `export NVM_DIR`.
         2. First, copy and paste the 3 lines that start with `export NVM_DIR` included above in this documentation.
         3. Then, cd to your user root directory `cd ~/`
         4. Then type `vi .bash_profile` to open your bash shell preferences file in the program "vi"
         5. Enter `i` (lower case I) to switch to text-insert mode.
         6. Right-click to bring up a menu that will let you paste the 3 lines that start with `export NVM_DIR`
         7. Press `enter` to add a line return at the end of these three lines
         8. Press `esc` to exit out of text-insert mode and return to save/command mode 
         9. Enter `:wq!` to save, quit and go back to the command line.
         10. Enter `exit` to exit the Digital Ocean console.
         11. Reopen the Digital Ocean console
         12. Enter `cd dev`
         13. Enter `nvm all setup`
     5.  Enter `nvm install 10.22`
     6.  Enter `nvm use 10.22` . NOTE: this is older, but it’s the one Net.Create was written with.

# Installing Net.Create

Net.Create uses GitHub to let several software developers work on its code all at once without overwriting each other.

GitHub also gives users the ability to make a local copy of the Net.Create software.

** A full installation guide is available at [https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#download-and-run-the-source-code](https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#download-and-run-the-source-code).**

## If you are a first-time command-line user using MacOS

These directions explain in more detail each step in the "download and run the source code" section of the [full installation guide](https://github.com/netcreateorg/netcreate-2018/wiki/Installation-Guide#download-and-run-the-source-code)

- Open Terminal on your Mac.
- `cd` to the project's build directory: `dev/netcreate-2018/build/`
- Use the command “git” and its setting “clone” to copy the contents of the Net.Create software package from github.com to your local computer:
  - `git clone https://github.com/netcreateorg/netcreate-2018.git`
- The next step is to tell your computer which version of Net.Create you want to use. You want to use the command “git” to “checkout” or use the “dev” version of Net.Create, which is the most stable recent version of Net.Create
  - `git checkout dev`
- We need to open the directory that has the dev build of Net.Create in it
  - `cd netcreate-2018/build`
- And then we need to use node package manager “npm” to compile “ci”, or put together, a version of Net.Create that’s customized for the computer we’re currently using.
  - `npm ci`

# Administering Net.Create

## Starting and Stopping Net.Create

Running Net.Create has two components:

1.  Starting the server in the terminal
2.  Accessing the server from a browser

### Before you start the server for the first time

The `\runtime\` folder that holds your network templates, data, and network-access logs is not created automatically during the Net.Create installation process.

- On a Mac you can navigate to the build folder in your netcreate-2018 folder and make a folder called runtime.
- On Digital Ocean
  - `cd` to the `netcreate-2018/build/` folder
  - Enter `mkdir runtime`

### Starting the server on a Mac

Note that on MacOS, the Net.Create server will stop when you put your Mac to sleep (or close the laptop lid) but restart when the Mac wakes up.

- Decide whether you are opening an existing network or creating a new network.
  - If you are opening an existing network, confirm that the network has both a `.loki` and `.template` file. Use the name of the network before the period `.` as the dataset you are opening.
  - If you are creating a new network, choose a network name with no spaces in it that does not already exist.
- Note the name of the network you will open/create. For these examples, we will use “MyNetwork” as the network name.
  - In the terminal, `cd` to `~/dev/netcreate-2018/build`
  - Enter `./nc.js --dataset=MyNetwork`
  - Watch for the `MAIN APP` and `CLIENT APP` lines
    - MAIN APP will usually be http://localhost:3000
    - CLIENT APP will vary based on your current IP address (the address you have been assigned on your network, which will be a string of numberS)

### Starting the server on Digital Ocean

Starting and stopping the server on Digital Ocean is identical to MacOS, *except that on Digital Ocean, closing the terminal will stop the Net.Create server automatically*. Digital Ocean users will need a pm2 command (provided in separate documentation) to keep their server running after closing the Digital Ocean console

## Stopping Net.Create

You may need to stop Net.Create because you want to control who’s editing it, or because you have a new template to load, or because you’re switching databases.

Either way, the process is simple. Go to your terminal, which should have the Net.Create logging lines printing out. Press `CTRL-C` to interrupt the Net.Create process and get your command line back.

To get the previous command you typed into the terminal (the one that starts the Net.Create network you just stopped), press the `up` arrow on your keyboard.

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

Net.Create uses two files to control each network: a data file (.loki) and a template file (.template) . The data file contains the nodes, edges and notes you've taken. The template file contains node and edge type settings, the name of the network, and the different attributes (fields in the node and edge tables).

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
