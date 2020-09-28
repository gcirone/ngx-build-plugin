import { ServerBuilderOutput, executeServerBuilder, ExecutionTransformer } from '@angular-devkit/build-angular';
import { BuilderContext, createBuilder } from '@angular-devkit/architect';
import { PluginServerBuilderSchema } from './schema';
import { loadPlugin, executeHook, PluginHook } from '../build-plugin';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as webpack from 'webpack';

export function buildWebpackServerPlugin(
  options: PluginServerBuilderSchema,
  context: BuilderContext
): Observable<ServerBuilderOutput> {
  loadPlugin(context.workspaceRoot, options);
  executeHook(PluginHook.PRE, context);

  const webpackConfiguration: ExecutionTransformer<webpack.Configuration> = (config) =>
    executeHook(PluginHook.CONFIG, config);

  return executeServerBuilder(options, context, { webpackConfiguration }).pipe(
    tap(() => executeHook(PluginHook.POST, context))
  );
}

export default createBuilder<PluginServerBuilderSchema>(buildWebpackServerPlugin);
