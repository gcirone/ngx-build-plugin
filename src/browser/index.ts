import { BrowserBuilder } from '@angular-devkit/build-angular';
import { Path, virtualFs } from '@angular-devkit/core';
import { BuilderConfiguration, BuildEvent } from '@angular-devkit/architect';
import { NormalizedPluginBrowserBuilderSchema, PluginBrowserBuilderSchema } from './schema';
import { BuildPlugin } from '../build-plugin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Stats } from 'fs';

export class PluginBrowserBuilder extends BrowserBuilder {
  run(builderConfig: BuilderConfiguration<PluginBrowserBuilderSchema>): Observable<BuildEvent> {
    BuildPlugin.loadPlugin(this.context.workspace.root, builderConfig.options);
    BuildPlugin.runHook(BuildPlugin.PRE_HOOK, builderConfig);

    return super.run(builderConfig).pipe(tap(() => BuildPlugin.runHook(BuildPlugin.POST_HOOK, builderConfig)));
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<Stats>,
    options: NormalizedPluginBrowserBuilderSchema
  ) {
    const webpackConfig = super.buildWebpackConfig(root, projectRoot, host, options);
    return BuildPlugin.runHook(BuildPlugin.CONFIG_HOOK, webpackConfig) || webpackConfig;
  }
}

export default PluginBrowserBuilder;
