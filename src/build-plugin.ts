import { Plugin, PluginBuilderSchema } from './schema';
import { resolve } from 'path';

export let plugin: Plugin;

export enum PluginHook {
  PRE = 'pre',
  CONFIG = 'config',
  POST = 'post'
}

export function loadPlugin(root: string, options: PluginBuilderSchema) {
  if (options.plugin && !plugin) {
    const pluginPath = resolve(root, options.plugin);
    plugin = require(pluginPath);
  }
}

export function executeHook(hook: PluginHook, data: any) {
  if (plugin && plugin[hook]) {
    return plugin[hook](data);
  }
}
