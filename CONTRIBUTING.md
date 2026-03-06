# How to contribute to FPU Cybersecurity Club's Website

*** If you're comfortable with Git, GitHub, and and IDE like VS Code, please refer to [REFERENCE.md](/REFERENCE.md) for a more concise overview of the Git and GitHub workflow for this project.

This document is written slightly in-depth for those whose first time working with Git, GitHub, and an IDE like VS Code.

If you get stuck at any point, please don't hesitate to message Ellie (@aether883) or [#website-discussion](https://discord.com/channels/643928417456095238/1364244601245925547), we are happy to help out!. You are also welcome to refer to [this document](https://github.com/edeberry/Documentation/blob/main/Git/git-github-basics.md), which goes a little more in depth about the Git setup process.

## Install Git and an IDE to edit the code

* Install Git from [https://git-scm.com/install/](https://git-scm.com/install/)
* Install an IDE (Integrated Development Environment) such as VS Code, which can be installed from [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download)
* Ensure you have access to the club's organization on GitHub

## Clone the Repository to your Local Machine

Cloning downloads a full copy of the repository to your computer so that you can edit files locally.

* On the repository's page on GitHub, click the green code button
* Copy the repository's URL
* Open your IDE (like VS Code) and press Ctrl + J to open the terminal

Now **choose where you'd like to have this repository** on your computer's local files. Use VS Code's terminal to [navigate to your chosen location](https://fernando-mc.github.io/python3-workshop/navigating-with-a-terminal.html)

For example, from my home directory, to create the repository folder in a folder called "Code" in my Documents folder, I would run the command:

    cd Documents/Code

Double check you're in the right place by running the command pwd (print working directory).

Then, on the terminal, run the following command:

    git clone https://github.com/RESTOFLINK

(*replace the link with the link you copied from the repository*)

If you've never cloned with Git before, you may be prompted to authenticate your account.

Run the `ls` command and you should see the name of the respository listed.

Now enter this folder for your repository using the cd (change directory) command:

    cd repository-name

Now we have cloned the repository locally and navigated into the repository's folder on our local machine.

## Pull changes from GitHub

Before starting anything, always run

    git checkout main
    git pull

This will pull any changes from GitHub to ensure your files are up to date.

## Branches for Collaboration

A branch in Git is essentially a separate line of development. By default, Git creates a branch named main when you initialize a new repository. When you create a new branch, you're making a copy of the current branch's state so that you can make changes without affecting the original code. (1)

### Why use Branches?

Branches are invaluable for:

* **Feature Development:** Work on new features in isolation.
* Bug Fixes: Fix bugs without risking the stability of the main branch.
* **Collaboration:** Multiple developers can work on different branches simultaneously.

### For this project, you will make a branch to edit the code

Anytime we're editing the code, we make a feature branch.

When you create a new branch, you're making a copy of the current branch's state so that you can make changes without affecting the original code.

### Step 1: Creating a New Branch

To create a new branch, use the following command:

    git checkout -b feature-branchname

This command creates a new branch called feature-branch and switches to it. Now, any changes you make will be recorded in this branch.

**When making a feature branch, name it something descriptive, like feature-mainpage.**

#### Listing Branches

To see all branches in your repository, run:

    git branch

The current branch you're on will be highlighted with an asterisk (*).

It's good practice to run this command **before making changes to any files** to verify you're on your feature branch.

### Step 2: Switching Between Branches

You can switch between branches using:

    git checkout branch-name

(*replace branch-name with the name of the branch you want to switch to*)

### Step 3: Send changes to the main branch

After verifying you're on the feature branch with `git branch`, now is the time to make some edits to files.

If you'd like to see what is different between your branch and main, run the following optional command:

    git diff

(*to exit git diff, press the 'q' key*)

After making some changes to the files, we are ready to send these changes back to the main branch using the following commands:

    git status
    git add .
    git commit –m "CONCISE BUT DESCRIPTIVE MESSAGE HERE"
    git push -u origin feature-branchname

(*remember to replace feature-branchname with the name of the branch*)

**If this is your first time**, you'll be prompted to run the following commands:

    git config –global user.email “you@example.com”
    git config –global user.name “Your Name”

(*make sure to use the email associated with your GitHub account*)

After submitting your email and name, run the `git push -u origin feature-branchname` command again.

Now the changes have been sent to GitHub, but they haven't been merged with the main branch.

Once you have pushed the branch once, you can push new changes without `-u origin`

## Create a Pull Request in GitHub

    "Pull requests are proposals to merge code changes into a project. A pull request lets you discuss and review changes before merging them. This helps teams work together, catch issues early, and maintain code quality."
    
    -GitHub Docs

1. When you push the new branch on the command line, Git will print the URL to create the pull request for the branch. You can also create it on the repository page on GitHub:
    1. Select "Pull Requests -> New pull request"
    1. Use the "compare" dropdown to select your branch
    1. Click "Create pull request"
1. Add a meaningful title and description
1. Verify your changes under the "commits" at the bottom
1. Select "Create pull request"

If you'd like, have someone review your changes (message [#website-discussion](https://discord.com/channels/643928417456095238/1364244601245925547) to get input on your pull request)

Once you are ready to merge the pull request, select "Squash and merge"
    * If the PR says "This branch has conflicts that must be resolved", see [Resolving Conflicts](/REFERENCE.md/#resolving-conflicts)

Add a commit message and click "Confirm squash and merge". Then, the changes will be reflected in the main branch as well.

## DELETE YOUR BRANCH

After submitting a pull request, delete your branch from your local files. You can make a new one later for your next changes.

Run the following command to see your branch's name:

    git branch

To delete a branch, first switch to the main branch:

    git checkout main

Now delete your feature branch:

    git branch -d feature-branchname

## How to rinse and repeat

Now that you've gone through the setup process once, you won't need a lot of the steps from this guide again. From now on, each time you'd like to work on the website's code, I recommend referring to [REFERENCE.md](/REFERENCE.md) to be reminded of the workflow commands.

## References

1. [https://dev.to/imevanc/branching-in-git-collaborate-like-a-pro-1hbl](https://dev.to/imevanc/branching-in-git-collaborate-like-a-pro-1hbl)
