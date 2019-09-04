import { Schema as DevServerBuilderSchema } from '@angular-devkit/build-angular/src/dev-server/schema';
import { JsonObject } from '@angular-devkit/core';
import { PluginBuilderSchema } from '../schema';

export type PluginDevServerBuilderSchema = JsonObject & DevServerBuilderSchema & PluginBuilderSchema;
