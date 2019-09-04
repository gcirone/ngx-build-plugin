import { Schema as ServerBuilderSchema } from '@angular-devkit/build-angular/src/server/schema';
import { JsonObject } from '@angular-devkit/core';
import { PluginBuilderSchema } from '../schema';

export type PluginServerBuilderSchema = JsonObject & ServerBuilderSchema & PluginBuilderSchema;
