import {
  BuildWebpackServerSchema,
  NormalizedServerBuilderServerSchema
} from '@angular-devkit/build-angular/src/server/schema';
import { PluginBuilderSchema } from '../schema';

export interface PluginServerBuilderSchema extends BuildWebpackServerSchema, PluginBuilderSchema {}
export interface NormalizedPluginServerBuilderSchema extends NormalizedServerBuilderServerSchema, PluginBuilderSchema {}
