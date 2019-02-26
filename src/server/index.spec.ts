import { ServerBuilder } from '@angular-devkit/build-angular';
import { BuildPlugin } from '../build-plugin';
import { PluginServerBuilder } from './';
import { of } from 'rxjs';

jest.mock('../build-plugin');

describe('PluginServerBuilder Test', () => {
  let pluginServerBuilder: PluginServerBuilder;

  const root: any = 'root';
  const plugin = 'folder/file.plugin.js';
  const context: any = { workspace: { root } };
  const config: any = {
    root,
    projectType: 'application',
    builder: 'ngx-build-plugin:server',
    options: { plugin }
  };

  beforeEach(() => {
    jest.spyOn(ServerBuilder.prototype, 'run').mockReturnValue(of({ success: true }));
    jest.spyOn(ServerBuilder.prototype, 'buildWebpackConfig').mockReturnValue({ parent: true });
    pluginServerBuilder = new PluginServerBuilder(context);
  });

  describe('#run', () => {
    beforeEach(() => {
      jest.spyOn(BuildPlugin, 'loadPlugin').mockReset();
      jest.spyOn(BuildPlugin, 'runHook').mockReset();
      pluginServerBuilder.run(config).subscribe();
    });

    it('should load the plugin', () => {
      expect(BuildPlugin.loadPlugin).toHaveBeenLastCalledWith(config.root, config.options);
    });

    it('should run the "pre" plugin hook before the super run is called', () => {
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(1, 'pre', config);
    });

    it('should run the "post" plugin hook after the super run is called', () => {
      expect(BuildPlugin.runHook).toHaveBeenCalledTimes(2);
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(2, 'post', config);
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

    it('should run the "config" plugin hook and return the new config', () => {
      const webpackConfig = pluginServerBuilder.buildWebpackConfig(root, null, null, config.options);
      expect(webpackConfig).toEqual(configHookReturnValue);
    });

    it('should run the "config" plugin hook and return the super config if method return undefined', () => {
      const webpackConfig = pluginServerBuilder.buildWebpackConfig(root, null, null, config.options);
      expect(webpackConfig.parent).toBeTruthy();
    });
  });
});
