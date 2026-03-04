# Git and GitHub Workflow Overview

This document will give a quick overview on to contribute to FPU Cybersecurity Club's Website.

*** If you haven't worked with Git, GitHub, and an IDE like VS Code before, I reccomend referring to [CONTRIBUTING.md](/CONTRIBUTING.md) for a more in-depth overview including Git setup.

This guide also assumes you've already cloned the repository to your local files. If you haven't, refer to the document linked above.

## Step 1: Navigate to the repository

Open your chosen IDE (such as VS Code, press Ctrl + J to open the terminal). Using the terminal, navigate to where you cloned the repository's folder using the `cd` command.

Make sure you're IN the repository's folder by running the command `pwd` (print working directory). You should see something like

    /Users/USERNAME/Documents/Code/flpolycyber.github.io

Mine looks like this because I keep the repository in a folder called Code that's in my Documents folder.

## Step 2: Create a branch to edit the code in

Do not edit code on the main branch. Make a branch to make changes in using the following command:

    git checkout -b feature-branchname

Name your branch something descriptive based on what feature you will be working on, like `feature-mainpage`.

## Step 3: Edit the code

Before editing code, always verify you're in your feature branch, NOT the main branch using

    git branch

If needed, you can switch between branches using

    git checkout branch-name

Now make the changes you'd like to the code.

## Step 4: Send changes to the main branch

Verify you're on your feature branch with `git branch`

Optional command to see what is different between your branch and main:

    git diff

(*to exit git diff, press the 'q' key*)

Now send the changes to the main branch using the following commands:

    git status
    git add .
    git commit –m "CONCISE BUT DESCRIPTIVE MESSAGE HERE"
    git push -u origin feature-branchname

(*remember to replace feature-branchname with the name of the branch*)

## Step 5: Create a Pull Request in GitHub

Go to the repository on GitHub and create a pull request. Try to include a description.

If you'd like, you can message [#website-discussion](https://discord.com/channels/643928417456095238/1364244601245925547) to get input on your pull request.

When everything looks good, you can go to the "Pull requests" tab on the repository, click on your PR, and "Squash and merge". Then, the changes will be reflected in the main branch as well.

## Step 6: DELETE YOUR BRANCH

After submitting a pull request, delete your branch from your local files. You can make a new one later for your next changes.

Run the following command to see your branch's name:

    git branch

To delete a branch, first switch to the main branch:

    git checkout main

Now delete your feature branch:

    git branch -d feature-branchname
