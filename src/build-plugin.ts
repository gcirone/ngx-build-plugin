import { getSystemPath, Path } from '@angular-devkit/core';
import { Plugin, PluginHook, PluginBuilderSchema } from './schema';
import { resolve } from 'path';

export class BuildPlugin {
  static readonly PRE_HOOK = 'pre';
  static readonly POST_HOOK = 'post';
  static readonly CONFIG_HOOK = 'config';

  private static plugin: Plugin;

  static loadPlugin(root: Path, options: PluginBuilderSchema) {
    if (options.plugin) {
      const pluginPath = resolve(getSystemPath(root), options.plugin);
      BuildPlugin.plugin = require(pluginPath);
    }
  }

  static runHook(hook: PluginHook, data: any) {
    if (BuildPlugin.plugin && BuildPlugin.plugin[hook]) {
      return BuildPlugin.plugin[hook](data);
    }
  }
}
