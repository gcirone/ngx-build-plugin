import { BrowserBuilderSchema, NormalizedBrowserBuilderSchema } from '@angular-devkit/build-angular';
import { PluginBuilderSchema } from '../schema';

export interface PluginBrowserBuilderSchema extends BrowserBuilderSchema, PluginBuilderSchema {}
export interface NormalizedPluginBrowserBuilderSchema extends NormalizedBrowserBuilderSchema, PluginBuilderSchema {}
