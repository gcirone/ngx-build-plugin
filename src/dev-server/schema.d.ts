import { DevServerBuilderOptions } from '@angular-devkit/build-angular';
import { PluginBuilderSchema } from '../schema';

export interface PluginDevServerBuilderOptions extends DevServerBuilderOptions, PluginBuilderSchema {}
