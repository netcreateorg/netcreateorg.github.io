**Step 6 includes a command that starts with `curl -o-`**

First check the NVM install page to make sure you are using the most recent version.

Then, look for what programmers call a pipe, the vertical line after “install.sh” that looks like this: `|` . Pipes separate the main part of a command in the command line from an extension of that command that might have some variances from system to system. Adjust what comes after it based on your MacOS.
- If you are running MacOS earlier than Catalina *or Digital Ocean*, use:
	- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash`
- If you are running MacOS Catalina or later, use:
	- `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | zsh`
- Remember that spaces also act as separators in the command line. You’ll need a space before and after the pipe.
