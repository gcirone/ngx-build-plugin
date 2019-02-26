import { BrowserBuilder } from '@angular-devkit/build-angular';
import { BuildPlugin } from '../build-plugin';
import { PluginBrowserBuilder } from './';
import { of } from 'rxjs';

jest.mock('../build-plugin');

describe('PluginBrowserBuilder Test', () => {
  let pluginBrowserBuilder: PluginBrowserBuilder;

  const context: any = { workspace: { root: 'root' } };
  const config: any = {
    root: 'root',
    projectType: 'application',
    builder: '',
    options: {
      plugin: 'folder/file.plugin.js'
    }
  };

  beforeEach(() => {
    jest.spyOn(BrowserBuilder.prototype, 'run').mockReturnValue(of({ success: true }));
    jest.spyOn(BuildPlugin, 'loadPlugin').mockReset();
    jest.spyOn(BuildPlugin, 'runHook').mockReset();

    pluginBrowserBuilder = new PluginBrowserBuilder(context);
  });

  describe('#run', () => {
    beforeEach(() => pluginBrowserBuilder.run(config).subscribe());

    it('should load the plugin', () => {
      expect(BuildPlugin.loadPlugin).toHaveBeenLastCalledWith(config.root, config.options);
    });

    it('should run the "pre" plugin hook', () => {
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(1, 'pre', config);
    });

    it('should run the "post" plugin hook', () => {
      expect(BuildPlugin.runHook).toHaveBeenCalledTimes(2);
      expect(BuildPlugin.runHook).toHaveBeenNthCalledWith(2, 'post', config);
    });
  });

  it('should be true2', () => {
    console.log('pluginBrowserBuilder');
    pluginBrowserBuilder.run(config);

    expect(BuildPlugin.loadPlugin).toHaveBeenLastCalledWith(config.root, config.options);
    expect(BuildPlugin.runHook).toHaveBeenLastCalledWith('pre', config);
  });
});
