import { getSystemPath, Path } from '@angular-devkit/core';
import { Plugin, PluginHook, PluginBuilderSchema } from './schema';
import { resolve } from 'path';

export class BuildPlugin {
  private static plugin: Plugin;

  static setPlugin(root: Path, options: PluginBuilderSchema) {
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
