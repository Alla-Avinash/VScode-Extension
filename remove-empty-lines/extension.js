const vscode = require("vscode");

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "removeEmptyLines.run",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selection = editor.selection;
      const text = editor.document.getText(selection);

      const cleaned = text
        .split(/\r?\n/)
        .filter(line => line.trim() !== "")
        .join("\n");

      editor.edit(editBuilder => {
        editBuilder.replace(selection, cleaned);
      });
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};