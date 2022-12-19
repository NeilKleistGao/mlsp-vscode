import * as path from "path";
import { ExtensionContext } from "vscode";

import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient";

let client: LanguageClient;

export function activate(p_context: ExtensionContext) {
}

export function diactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }

  return client.stop();
}
