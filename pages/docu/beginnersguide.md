---
layout: page-fullwidth
title: "Net.Create Beginner's Guide"
subheadline: "Getting Started with Net.Create"
teaser: "A beginner's guide to command-line basics. Read before installing Net.Create if you're more familiar with using mouse clicks than typed commands to tell your computer what to do."
permalink: "/documentation/beginnersguide/"
---

* TOC
{:toc}

If you prefer to follow installation instructions in video form, we have video-based versions of the Net.Create installation process (current as of 1 Feb 2022) in a [Net.Create playlist at YouTube](https://www.youtube.com/playlist?list=PLM39ibhMucXVuhFHzm56OQHQve-35bFTt) . *You can use the text instructions here to copy and paste the installation instructions as you follow along with the video.*

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


