import { validateCli, read, GlobalFlags, setGlobalFlags } from '@1password/op-js';
import * as cache from './cache';
import { CallTemplateFunctionArgs, Context, PluginDefinition } from '@yaakapp/api';
import fs from 'node:fs';
import path from "path";

type PluginConfig = {
  cliPath?: string;
  flags?: Record<string, any>;
  defaultAccount?: string;
  cacheTTL?: number;
};

let config : PluginConfig;

export const plugin: PluginDefinition = {
  templateFunctions: [{
    name: '1Password',
    args: [
        { label: 'Reference', placeholder: 'op://vault-name/item-name/[section-name/]field-name', type: 'text', name: 'path' },
        { label: 'Account', placeholder: 'value from config', optional: true, type: 'text', name: 'account' }
    ],
    async onRender(_ctx: Context, args: CallTemplateFunctionArgs): Promise<string | null> {
      if (!args.values.path) return "noPath";
      
      if (!config) {
        try {
          await loadConfig()
        } catch (err : any) {
          return err.toString();
        }
      }

      try {
        return await fetchEntry(args.values.path, args.values.account);
      } catch (err : any) {
        return err.toString();
      }
    },
  }],
};

async function loadConfig() {
  const configJson = await fs.promises.readFile(path.resolve(__dirname, 'config.json'), 'utf-8');
  config = JSON.parse(configJson) as PluginConfig;

  if (config?.flags) {
    setGlobalFlags(config.flags);
  }

  if (typeof config?.cacheTTL === 'number') {
    cache.setStdTTL(config.cacheTTL);
  }

  await checkCli(config?.cliPath);
}

async function checkCli(cliPath?: string) {
  if (cache.opCliInstalled() !== true) {
    try {
      if (cliPath && !fs.existsSync(cliPath)) {
        throw new Error(`The file at path ${cliPath} does not exist.`);
      }

      let pathToAdd = cliPath;
      if (cliPath) {
        const stats = fs.statSync(cliPath);
        if (stats.isFile()) {
          pathToAdd = path.dirname(cliPath);
        }
      }

      // add the CLI to the PATH
      process.env.PATH = pathToAdd ? `${pathToAdd}:${process.env.PATH}` : process.env.PATH;

      await validateCli();

      cache.writeOpCliInstalled(true);
    } catch (e: any) {
      const error = new Error(
          `There was an issue with the 1Password CLI. If you have the op CLI installed using e.g. Homebrew, please set the '__op_plugin.cliPath' environment variable to the directory containing the 'op' binary. (e.g. /opt/homebrew/bin/op). Error details: ${e.message}`,
      );

      error.stack = e.stack;

      throw error;
    }
  }
}

async function fetchEntry(ref: string, account: string | undefined) : Promise<string> {
  const existing = cache.getEntry(ref);

  if (existing) {
    return existing;
  }

  const args: Partial<GlobalFlags> = {
    account: account ?? config.defaultAccount
  };
  
  // Trim quotes, which will be present if ref is copied by user from 1Password
  ref = ref.replace(/^"|"$/g, '')

  const entry = read.parse(ref, args);
  cache.writeEntry(ref, entry);

  return entry;
}