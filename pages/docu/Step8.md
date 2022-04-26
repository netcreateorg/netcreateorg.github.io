**Step 8 includes the command `nvm install 10.22`**

If step 8 fails, you may need to check your ``/User/yourname/` folder for a file called `.zshrc` or `.bash_profile` and then edit its contents.

- If you are running MacOS earlier than Catalina *or Digital Ocean*, use: `.bash_profile`
- If you are running MacOS Catalina or later, use: `.zshrc`

These files are hidden by default on MacOS. On Digital Ocean, you will need to use an FTP client to edit these files.

Open your main user directory and press `Command` + `Shift` + `.` (period) to show hidden files.

You will have either `.zshrc` or `.bash_profile` in that folder. Right-click it and use the “Open With” option to open this file with the application “Text Edit”
  - If this file is blank, you need to add four lines of environment variables (copied and pasted below) and then save the file
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```
  - Finally, type “exit” in your terminal window, quit out of the terminal, and then reopen your terminal window.
