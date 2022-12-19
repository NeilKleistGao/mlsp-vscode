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

  const server_option: ServerOptions = () => {
    return new Promise<ChildProcess>((p_resolve, p_reject) => {
      try {
        const child = spawn("java", ["-jar", p_context.asAbsolutePath(path.join("server", "mlsp.jar"))]);
        p_resolve(child);
      }
      catch {
        p_reject("can't create mlsp server.");
      }
    });
  };

  client = new LanguageClient(
    "mlsp", server_option, client_option
  );

  client.start();
}

export function diactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
