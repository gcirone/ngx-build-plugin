import { executeServerBuilder } from '@angular-devkit/build-angular';
import { createBuilder } from '@angular-devkit/architect';
import { loadPlugin, executeHook, PluginHook } from '../build-plugin';
import { default as buildWebpackServerPlugin } from './';
import { of } from 'rxjs';

jest.mock('@angular-devkit/build-angular');
jest.mock('@angular-devkit/architect', () => ({ createBuilder: jest.fn(fn => fn) }));
jest.mock('../build-plugin');

describe('BuildWebpackServerPlugin Test', () => {
  const options = { plugin: 'folder/file.plugin.js' };
  const context = { workspaceRoot: 'root' };
  const buildConfig = { mode: 'test' };
  const hookedConfig = { hook: true };
  let webpackConfigurationTransform;

  beforeEach(() => {
    (executeHook as jest.Mock).mockReturnValue(hookedConfig);
    (executeServerBuilder as jest.Mock).mockImplementation((opts, ctx, transforms) => {
      webpackConfigurationTransform = transforms.webpackConfiguration;
      return of({ success: true });
    });
  });

  it('should implement the builder', () => {
    expect(createBuilder).toHaveBeenCalledWith(jasmine.any(Function));
  });

  describe('when the builder is scheduled', () => {
    beforeAll(() => (buildWebpackServerPlugin as any)(options, context).subscribe());

    it('should load the plugin', () => {
      expect(loadPlugin).toHaveBeenCalledWith(context.workspaceRoot, options);
    });

    it('should run the "pre" hook plugin handler', () => {
      expect(executeHook).toHaveBeenCalledWith(PluginHook.PRE, context);
    });

    it('should execute the browser builder', () => {
      expect(executeServerBuilder).toHaveBeenCalledWith(options, context, {
        webpackConfiguration: jasmine.any(Function)
      });
    });

    it('should run the "config" plugin hook and return the new config', () => {
      const expectedConfig = webpackConfigurationTransform(buildConfig);
      expect(executeHook).toHaveBeenCalledWith(PluginHook.CONFIG, buildConfig);
      expect(expectedConfig).toEqual(hookedConfig);
    });

    it('should run the "post" hook plugin handler', () => {
      expect(executeHook).toHaveBeenCalledWith(PluginHook.POST, context);
    });
  });
});
