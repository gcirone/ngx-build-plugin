import { executeDevServerBuilder } from '@angular-devkit/build-angular';
import { createBuilder, targetFromTargetString } from '@angular-devkit/architect';
import { loadPlugin, executeHook, PluginHook } from '../build-plugin';
import { default as serveWebpackBrowserPlugin } from './';
import { of } from 'rxjs';

jest.mock('@angular-devkit/build-angular');
jest.mock('@angular-devkit/architect', () => ({
  createBuilder: jest.fn((fn) => fn),
  targetFromTargetString: jest.fn()
}));
jest.mock('../build-plugin');

describe('ServeWebpackBrowserPlugin Test', () => {
  const options = { plugin: 'folder/file.plugin.js' };
  const context = { workspaceRoot: 'root', getTargetOptions: jest.fn() };
  const buildConfig = { mode: 'test' };
  const hookedConfig = { hook: true };
  let webpackConfigurationTransform;

  beforeEach(() => {
    (targetFromTargetString as jest.Mock).mockReturnValue({ target: 'test' });
    (context.getTargetOptions as jest.Mock).mockResolvedValue({});
    (executeHook as jest.Mock).mockReturnValue(hookedConfig);
    (executeDevServerBuilder as jest.Mock).mockImplementation((opts, ctx, transforms) => {
      webpackConfigurationTransform = transforms.webpackConfiguration;
      return of({ success: true });
    });
  });

  it('should implement the builder', () => {
    expect(createBuilder).toHaveBeenCalledWith(jasmine.any(Function));
  });

  describe('when the builder is scheduled', () => {
    beforeAll(() => (serveWebpackBrowserPlugin as any)(options, context).subscribe());

    it('should load the plugin', () => {
      expect(loadPlugin).toHaveBeenCalledWith(context.workspaceRoot, options);
    });

    it('should run the "pre" hook plugin handler', () => {
      expect(executeHook).toHaveBeenCalledWith(PluginHook.PRE, context);
    });

    it('should execute the browser builder', () => {
      expect(executeDevServerBuilder).toHaveBeenCalledWith(options, context, {
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
