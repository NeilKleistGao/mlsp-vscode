import { ChildProcess, spawn } from "child_process";
import * as path from "path";
import { ExtensionContext } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions
} from "vscode-languageclient";

let client: LanguageClient;

export function activate(p_context: ExtensionContext) {
  const client_option: LanguageClientOptions = {
    documentSelector: [{scheme: "file", language: "mlscript"}]
  };

  console.log(path.resolve());
  const server_option: ServerOptions = {
    command: "java",
    args: ['-jar', p_context.asAbsolutePath(path.join("server", "mlsp.jar"))],
  };

  client = new LanguageClient(
    "mlsp", "mls client", server_option, client_option
  );

  client.start();
}

export function diactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
