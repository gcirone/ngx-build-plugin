import { BuilderContext } from '@angular-devkit/architect';
import * as webpack from 'webpack';

export interface PluginBuilderSchema {
  plugin: string;
}

export interface Plugin {
  pre?(builderContext: BuilderContext): undefined;
  config?(webpackConfig: webpack.Configuration): webpack.Configuration;
  post?(builderContext: BuilderContext): undefined;
}
