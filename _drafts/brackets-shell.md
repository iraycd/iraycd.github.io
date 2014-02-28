---
layout: post
title:  "Brackets-shell: Native Desktop Apps With HTML JS and CSS"
categories: brackets-shell html native apps desktop node
featured_image : https://lh5.googleusercontent.com/-eFkzc7Z7HSo/UxDlauaj0yI/AAAAAAAAJqs/C07lZG_UjxE/w426-h237/hero.png
meta : Develop a desktop application with the skills you have with HTML, JS and CSS.
---

###Prerequisites 

+ Intermediate in web
+ HTML 5
+ Node.js
+ Working with Grunt
+ Using Git
+ To know what is of V8 and Chromium.

###Why do you need HTML apps on the desktop?

Recently, when I was starting a new project to develop a native desktop application, I reached for my tried-and-trusted tech of choice: Objective-C and the AppKit libraries. When I thought a moment about the intended audience for the app, it gave me reason to pause: if ever I wanted to reach a wider audience, I’d have to think cross-platform.

There exists many libraries to accomplish this, and they all suck in one way or another. Gtk/wxWidgets/Swing/Mono all have major problems and the level of code reuse leaves a lot to be desired. They have extremely clunky APIs (wx, Gtk), don’t integrate well into the desktop anyway (Gtk, Swing, Mono), or come with bloated runtimes that make them impractical to redistribute (Swing). Not to mention, none of those libraries mentioned can get close to reaching the number of devices as the standard web technologies.

By this point, we all know: if it can run in a web browser, it can work virtually anywhere. On the other hand, it’s still desirable to have native (desktop/mobile) apps. They tend to “just work.” Download a package and double click it. The workflow for such applications is well established and understood by most computer users, and integrate nicely into the target platform.

Control the browser – Bundling your app into an executable allows you to dictate what rendering engine (webkit) will be used for your app.

Cross Platform – HTML runs on all operating systems, so it can be much easier to create a cross platform desktop application.

Build once, run everywhere… – I am a huge fan of the build-once-run-everywhere methodology. While it won’t work for some projects, many applications can see a huge benefit to sharing code between the desktop, web, and mobile space.

Window sizing and control – If you want your app to run at a certain size, or do some more advanced things with popups, you get that control on the desktop. Most solutions also provide a way to access the file system and allow other more advanced controls you wouldn’t get with a regular web app.

Here are all the different options I have researched for creating HTML/JS applications on the desktop, with their pros and cons. Please leave comments if you know of other solutions I should look at.

###Before Bracket

+ TideSDK
+ AppJS
+ Node-webkit
+ Sencha Desktop

###Why Brackets?
Accomplishing native applications with web technologies has been tried many times, and typically rely on frameworks like Adobe Air or a custom built WebKit wrapper. Air applications never turn out well, and Adobe seems to realize it. One of their new projects, Brackets, is a code editor, like Sublime Text, built entirely HTML/JS/CSS. They accomplish this by utilizing a project of their own creation, brackets-shell which is itself a cross-platform wrapper of CEF-3 with an included runtime library.

Brackets-shell is [importantly] more than just a “shell.” It comes with the key functionality required in developing cross-platform desktop apps: a build process. Using brackets it’s possible to create completely self-contained apps and their installers by executing a single command on the target platform. Brackets-shell offers OS-level integration such as integration with the file system, menu systems and some native drawing functionality (think Windows GUI shell), as well as an embedded Node.JS process, which we’ll learn more about later.

Currently, developing with brackets-shell apps seems to be easiest on Mac OS X, presumably because most of the developers are using Mac OS X, however support exists for Windows Vista/7/8 and Ubuntu/Debian Linux as well. Here’s how to get things started on Mac OS X (assuming you already have homebrew and Xcode installed):

     
    # make a directory for your project
    mkdir sampleproject && cd sampleproject
     
    # clone the project into the directory
    git clone --depth=1 git@github.com:adobe/brackets-shell.git

    ## I don't recommand to cloning entire thing for sample project
     
    # make a project for your code
    mkdir -p app/src
     
    # add some dummy content to it
    cat << 'EOF' > app/src/index.html
    <html>
      <head><title>My App!</title></head>
      <body><h1>HELLO WORLD!</h1></body>
    </html>
    EOF
     
    # the build process requires this directory to be a git repo
    git init
    git add .
    git commit -m "initial commit"
     
    #Dependecies for linux

    sudo apt-get install --assume-yes git libnss3-1d libnspr4-0d gyp gtk+-2.0

    # go to brackets and build
    cd brackets-shell
    npm install

    # install git and dev dependencies for linux
    sudo apt-get install --assume-yes git libnss3-1d libnspr4-0d gyp gtk+-2.0
    grunt cef
    grunt node

By following the script above, what we’ve done is install system-level dependencies, create a directory to hold our project, cloned brackets, created a neighboring directory for our app with minimal content and installed bracket-shell dependencies. Next, update the config file to point at our app directory so that brackets-shell knows where to pull the content from. Open up Gruntfile.js and change git.www.repo to ../app. It should look something like this:


    "git": {
        "www": {
            "repo"      : "../app",    // TODO user configurable?
            "branch"    : grunt.option("www-branch") || ""
        },


Now, in the brackets-shell repo, run the following commands. The build process will probably complain about not having a config.json file, but that is safely ignored until later.

    # build the app
    grunt build
    # launch it!
    open installer/mac/staging/Brackets.app


So there you have it. I’m sure you’ll want to take it from here and start developing your app. This post can be thought of as Part 1 of a multi-part (length TBD) series on developing native apps with Brackets, including development/deployment on the web, using the built-in Node.JS server, package and dependency management and more. Stay tuned!


[html5-brackets-shell]: http://clintberry.com/2013/html5-desktop-apps-with-brackets-shell/ "Native Desktop Apps Using Brackets Shell"
[html5-native]: http://clintberry.com/2013/html5-apps-desktop-2013/ "HTML5 Apps on the Desktop in 2013"
[GitHub]: https://github.com/adobe/brackets-shell "Brackets Shell Github"
[CEF]:https://code.google.com/p/chromiumembedded/ "A simple framework for embedding Chromium-based browsers in other applications."
[brackets]: http://brackets.io "An open source code editor for the web, written in JavaScript, HTML and CSS."
[brackets-shell]: https://github.com/adobe/brackets-shell "CEF3-based application shell for Brackets."
