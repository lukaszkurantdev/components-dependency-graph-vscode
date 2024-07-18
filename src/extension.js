const vscode = require("vscode");
const component_analysis = require("components-dependency-graph/dist/ComponentGraphAnalyzer");
const gen_diag = require("components-dependency-graph/dist/src/utils/generateDiagram");

const editor = vscode.window.activeTextEditor;

const createGraph = async () => {
  const path = editor.document.fileName;
  console.log(path)

  const edges = component_analysis.fileBasedAnalyze(path)



  const graph = await gen_diag.generateGraphVizDiagram(edges, undefined, false)

  return graph;
};

const generateGraph = async () => {
  const svg = await createGraph();

  const panel = vscode.window.createWebviewPanel(
    "components-dependency-graph-vscode",
    "Component Dependency Graph",
    { viewColumn: vscode.ViewColumn.Beside, preserveFocus: true },
    {}
  );
console.log(svg);
  panel.webview.html = `${svg}`;
};

const activate = (context) => {
  const disposable = vscode.commands.registerCommand(
    "components-dependency-graph-vscode.generateGraph",
    () => {
      generateGraph();
    }
  );
  context.subscriptions.push(disposable);
};

module.exports = {
  activate,
};
