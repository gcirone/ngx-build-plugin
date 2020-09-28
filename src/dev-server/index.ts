import { DevServerBuilderOutput, executeDevServerBuilder, ExecutionTransformer } from '@angular-devkit/build-angular';
import { BuilderContext, createBuilder, targetFromTargetString } from '@angular-devkit/architect';
import { PluginDevServerBuilderSchema } from './schema';
import { loadPlugin, executeHook, PluginHook } from '../build-plugin';
import { from, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as webpack from 'webpack';

export function serveWebpackBrowserPlugin(
  options: PluginDevServerBuilderSchema,
  context: BuilderContext
): Observable<DevServerBuilderOutput> {
  const browserTarget = targetFromTargetString(options.browserTarget);

  return from(context.getTargetOptions(browserTarget)).pipe(
    switchMap((browserOptions) => {
      options.plugin = options.plugin || <string>browserOptions.plugin;

      loadPlugin(context.workspaceRoot, options);
      executeHook(PluginHook.PRE, context);

      const webpackConfiguration: ExecutionTransformer<webpack.Configuration> = (config) =>
        executeHook(PluginHook.CONFIG, config);

      return executeDevServerBuilder(options, context, { webpackConfiguration });
    }),
    tap(() => executeHook(PluginHook.POST, context))
  );
}

export default createBuilder<PluginDevServerBuilderSchema>(serveWebpackBrowserPlugin);
