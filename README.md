
# VS Code Extension

# Remove Empty Lines (Selection)

This VS Code extension removes empty lines from selected text using a keyboard shortcut.

---

## Prerequisites on How to make a VScode Extension

Install:
- Node.js (LTS)
- Visual Studio Code

Open VScode 
Open a folder with the extension name
and create the below folder structure

Expected structure:
    remove-empty-lines
        package.json
        extension.js

many people want to use type script and use Yeoman (yo - which is a build tool for type script, to compile type script into js format)
but you can also just simply do this in javascript with no complications




---

## Step 1: Add Extension Logic

Open the file:
    extension.js

And add the logic you want the extension to implement 

Best resources to guide you 
https://code.visualstudio.com/api/get-started/your-first-extension
https://code.visualstudio.com/api/references/vscode-api 

The above resources gives you functionality in using the VSCode API's
When you want to:
    Get selected text
    Modify the editor
    Add commands
    Listen to events

what sections of the above resources should you read?? you only refer to what you want to implement... and work in the following steps
    - Decide what you want to do
        “Modify selected text”
    - Find the API object involved
        window.activeTextEditor
    - Look up its methods
        editor.selection
        editor.document.getText()
    - Combine small pieces


---

## Step 2: Register Command and Shortcut

Open package.json and add the required configuration according to the resources above:

important points:
    - you have to mention the README.md in the package.json too for it to be displayed in the about seciton of the extension 
    - specify the correct github repo where anyone can see the source code
    - the publisher name must be the same name as the publisher name in the 


---

## Step 3: Test Locally

Press:
    F5

Test:
1. Open a file
2. Select text with empty lines
3. Press Ctrl + Alt + R

Expected Result:
    Empty lines removed only from selected text


---

## Step 4: Create Publisher Account and PAT with Microsoft Azure Devops(One Time)

You need a Visual Studion Marketplace Publisher account for you to publish your extension to VSCode so that other developers can access your extension and intall it on their PC's. To do this follow the below steps
1. Open Visual Studio Marketplace     --- https://marketplace.visualstudio.com/vscode
2. Sign in with Microsoft account
3. Create a Publisher
4. Save the Publisher ID ---- this will be your publisher name --> "AvinashAlla"
5. Now you can Publish Extensions in VScode         ---- https://marketplace.visualstudio.com/manage/publishers/avinashalla


You can't upload your extension directly using the web UI, VScode only allows you to upload your code with the help of a CLI called vsce (visual studio code extension)

Install the publishing tool (vsce). This is the only tool you need.
using the -g you will install this vsce globally, so you won't create any node modules folder in your directory
~ npm install -g @vscode/vsce



The PAT (Personal Access Token) is what vsce uses to authenticate your publisher account to the VS Code Marketplace
Now you need to create a PAT (Personal Access Token) with Azure Devops 
1. Open Azure Devops ---- https://aex.dev.azure.com/
2. Create an account with the same Microsoft account 
3. On the right-hand side, click your profile → “Security” → “Personal Access Tokens”
4. Create a new PAT
    Click “New Token”
    Give it a name, e.g. vsce-publish-token
    Set Organization: leave default
    Scopes: choose
    Expiration: pick whatever works (30 days)
5. Copy the token
    Once the token is created, copy it immediately
    You won’t be able to see it again
    Store it safely





---

## Step 5: Update Metadata

Edit package.json to include the newly added metadata
    publisher, version, description, engines.vscode
Since this is what the Marketplace uses for
    Compatibility checks, Search results, Updates

    {
      "name": "remove-empty-lines",
      "displayName": "Remove Empty Lines (Selection)",
      "description": "Removes empty lines from selected text using a keyboard shortcut",
      "version": "0.0.1",
      "publisher": "AvinashAlla",        -----> Publisher ID
      "engines": {
        "vscode": "^1.80.0"
      },
      "categories": ["Other"]
    }


---

## Step 6: Login to Marketplace

open the terminal directory which has the vscode extension

    check if the vsce is properly setup...
    vsce --version

    if it is showing some errors or warnings the below worked out for me
    windows powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    vsce --version
    to set back the default permision, run the below command
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Restricted

    vsce login your-publisher-name or YOUR_PUBLISHER_ID 
    vsce login AvinashAlla
    enter the above created PAT
    


---

## Step 7: Package Extension

    package → creates a distributable file
    publish → uploads your extension to the Marketplace
    vsce publish = vsce package + upload to Marketplace (it does not leave a .vsix file on disk)

    vsce package

Output:

    remove-empty-lines-0.0.1.vsix

Optional test install:

    code --install-extension remove-empty-lines-0.0.1.vsix

---

## Step 8: Publish Extension

    vsce publish

---

## Updating the Extension

    ensure that the vsce is with the correct user/publisher account 
    
    whenever you want to update the extension you have to update the extension version in the package.json too 
    this is strictly enforced
    VS Code Marketplace uses publisher + extension name + version as a unique identity

    0.0.1 → first release
    0.0.2 → bug fix
    0.1.0 → small feature
    1.0.0 → stable release

    vsce publish

    vsce publish patch          --> automatically increments the version without any manual increment in the package.json

---

## Mental Model

- extension.js → logic
- package.json → wiring and metadata
- F5 → development testing
- vsce publish → marketplace release


