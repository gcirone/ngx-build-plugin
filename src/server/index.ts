import { ServerBuilder } from '@angular-devkit/build-angular';
import { Path, virtualFs } from '@angular-devkit/core';
import { BuilderConfiguration, BuildEvent } from '@angular-devkit/architect';
import { NormalizedPluginServerBuilderSchema } from './schema';
import { BuildPlugin } from '../build-plugin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Stats } from 'fs';

export class PluginServerBuilder extends ServerBuilder {
  run(builderConfig: BuilderConfiguration<NormalizedPluginServerBuilderSchema>): Observable<BuildEvent> {
    BuildPlugin.loadPlugin(this.context.workspace.root, builderConfig.options);
    BuildPlugin.runHook('pre', builderConfig);

    return super.run(builderConfig).pipe(tap(() => BuildPlugin.runHook('post', builderConfig)));
  }

  buildWebpackConfig(
    root: Path,
    projectRoot: Path,
    host: virtualFs.Host<Stats>,
    options: NormalizedPluginServerBuilderSchema
  ) {
    const webpackConfig = super.buildWebpackConfig(root, projectRoot, host, options);
    return BuildPlugin.runHook('config', webpackConfig) || webpackConfig;
  }
}

export default PluginServerBuilder;
