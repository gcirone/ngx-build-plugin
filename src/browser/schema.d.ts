import { Schema as BrowserBuilderSchema } from '@angular-devkit/build-angular/src/browser/schema';
import { JsonObject } from '@angular-devkit/core';
import { PluginBuilderSchema } from '../schema';

export type PluginBrowserBuilderSchema = JsonObject & BrowserBuilderSchema & PluginBuilderSchema;
