import { DevServerBuilder } from '@angular-devkit/build-angular';
import { BuildPlugin } from '../build-plugin';
import { PluginBrowserBuilder } from '../browser';
import { PluginDevServerBuilder } from './';
import { of } from 'rxjs';

jest.mock('../build-plugin');

describe('PluginDevServerBuilder Test', () => {
  let pluginDevServerBuilder: PluginDevServerBuilder;

  const root: any = 'root';
  const devServerPlugin = 'folder/dev-server.plugin.js';
  const browserPlugin = 'folder/browser.plugin.js';
  const context: any = {
    workspace: { root },
    architect: { getBuilderConfiguration: () => {} }
  };
  const devServerConfig: any = {
    root,
    projectType: 'application',
    builder: 'ngx-build-plugin:dev-server',
    options: { plugin: devServerPlugin, browserTarget: 'site:browser' }
  };
  const browserConfig: any = {
    options: { plugin: browserPlugin }
  };

  beforeEach(() => {
    jest.spyOn(DevServerBuilder.prototype, 'run').mockReturnValue(of({ success: true }));
    jest.spyOn(PluginBrowserBuilder.prototype, 'buildWebpackConfig').mockReturnValue({ parent: true });
    jest.spyOn(context.architect, 'getBuilderConfiguration').mockReturnValue(browserConfig);
    pluginDevServerBuilder = new PluginDevServerBuilder(context);
  });

  describe('#run', () => {
    beforeEach(() => {
      jest.spyOn(BuildPlugin, 'loadPlugin').mockReset();
      jest.spyOn(BuildPlugin, 'runHook').mockReset();
      pluginDevServerBuilder.run(devServerConfig).subscribe();
    });

    it('should load the plugin', () => {
      expect(BuildPlugin.loadPlugin).toHaveBeenLastCalledWith(devServerConfig.root, devServerConfig.options);
      expect((BuildPlugin.loadPlugin as any).mock.calls[0][1].plugin).toEqual(devServerPlugin);
    });

    it('should run the "pre" plugin hook before the super run is called', () => {
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(1, BuildPlugin.PRE_HOOK, devServerConfig);
    });

    it('should run the "post" plugin hook after the super run is called', () => {
      expect(BuildPlugin.runHook).toHaveBeenCalledTimes(2);
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(2, BuildPlugin.POST_HOOK, devServerConfig);
    });

    describe('when plugin is not defined in the dev server options', () => {
      beforeEach(() => {
        delete devServerConfig.options.plugin;
        pluginDevServerBuilder.run(devServerConfig).subscribe();
      });

      it('should load the browser plugin option configuration', () => {
        expect((BuildPlugin.loadPlugin as any).mock.calls[0][1].plugin).toEqual(browserPlugin);
      });
    });
  });

  describe('#buildWebpackConfig', () => {
    const configHookReturnValue = { hook: true };
    beforeEach(() => {
      jest
        .spyOn(BuildPlugin, 'runHook')
        .mockReturnValueOnce(configHookReturnValue)
        .mockReturnValueOnce(undefined);
    });

    it('should run the "browser" plugin builder and return the config', () => {
      const webpackConfig = pluginDevServerBuilder.buildWebpackConfig(root, null, null, devServerConfig.options);
      expect(webpackConfig.parent).toBeTruthy();
    });
  });
});
