import { resolve } from 'path';
import vscode from 'vscode';

import evalFile from './aeScript';
import CompositionOutlineProvider from './compositionOutline';
import { JSX_DIR } from './constants';
import JsxModuleDefinitionProvider from './jsxModuleDefinitionProvider';

async function test() {
    const scriptPath = resolve(JSX_DIR, 'getCompOutlineData.jsx');
    const result = await evalFile(scriptPath);
    console.log(result);
}

export function activate(context: vscode.ExtensionContext) {
    console.log(`Activate extension ${context.extension.id}`);

    const jsxModuleDefinitionProvider = vscode.languages.registerDefinitionProvider(
        ['javascript'],
        new JsxModuleDefinitionProvider(),
    );
    context.subscriptions.push(jsxModuleDefinitionProvider);

    const compositionOutlineProvider = new CompositionOutlineProvider();
    vscode.window.registerTreeDataProvider('aeCompositionOutline', compositionOutlineProvider);
    vscode.commands.registerCommand('adobeExtensionDevtools.refreshAeCompositionOutline', () =>
        compositionOutlineProvider.refresh(),
    );
}

// this method is called when your extension is deactivated
export function deactivate() {
    // nothing to do for now
}
