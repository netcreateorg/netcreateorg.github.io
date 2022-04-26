### Troubleshooting Dependency Installs

There are a few points along the way where users less familiar with the command line might run into trouble.

Read these first so you can work out which steps you’ll need to modify and how you’ll need to modify them:

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

