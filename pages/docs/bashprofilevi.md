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
