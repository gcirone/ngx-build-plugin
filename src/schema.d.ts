import { BrowserBuilderSchema, BuildWebpackServerSchema } from '@angular-devkit/build-angular';
import { BuilderConfiguration } from '@angular-devkit/architect';

export interface PluginBuilderSchema {
  plugin: string;
}

export type BuilderSchema = BrowserBuilderSchema | BuildWebpackServerSchema;

export interface Plugin {
  config?(webpackConfig: object): object;
  pre?(builderConfig: BuilderConfiguration<BuilderSchema>): void;
  post?(builderConfig: BuilderConfiguration<BuilderSchema>): void
}

export type PluginHook = 'pre' | 'post' | 'config';
