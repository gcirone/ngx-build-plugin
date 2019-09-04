import { BrowserBuilderOutput, executeBrowserBuilder, ExecutionTransformer } from '@angular-devkit/build-angular';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { PluginBrowserBuilderSchema } from './schema';
import { loadPlugin, executeHook, PluginHook } from '../build-plugin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as webpack from 'webpack';

export function buildWebpackBrowserPlugin(
  options: PluginBrowserBuilderSchema,
  context: BuilderContext
): Observable<BrowserBuilderOutput> | any {
  loadPlugin(context.workspaceRoot, options);
  executeHook(PluginHook.PRE, context);

  const webpackConfiguration: ExecutionTransformer<webpack.Configuration> = config =>
    executeHook(PluginHook.CONFIG, config);

  return executeBrowserBuilder(options, context, { webpackConfiguration }).pipe(
    tap(() => executeHook(PluginHook.POST, context))
  );
}

export default createBuilder<PluginBrowserBuilderSchema>(buildWebpackBrowserPlugin);
