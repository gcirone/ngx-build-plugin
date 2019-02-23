import { NormalizedServerBuilderServerSchema } from '@angular-devkit/build-angular/src/server/schema';
import { PluginBuilderSchema } from '../schema';

export interface NormalizedPluginServerBuilderSchema extends NormalizedServerBuilderServerSchema, PluginBuilderSchema {}
