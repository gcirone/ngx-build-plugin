import { BrowserBuilder } from '@angular-devkit/build-angular';
import { BuildPlugin } from '../build-plugin';
import { PluginDevServerBuilder } from './';
import { of } from 'rxjs';

jest.mock('../build-plugin');

describe('PluginBrowserBuilder Test', () => {
  let pluginDevServerBuilder: PluginDevServerBuilder;

  const root: any = 'root';
  const plugin = 'folder/file.plugin.js';
  const context: any = { workspace: { root } };
  const config: any = {
    root,
    projectType: 'application',
    builder: 'ngx-build-plugin:dev-server',
    options: { plugin }
  };

  beforeEach(() => {
    jest.spyOn(BrowserBuilder.prototype, 'run').mockReturnValue(of({ success: true }));
    jest.spyOn(BrowserBuilder.prototype, 'buildWebpackConfig').mockReturnValue({ parent: true });
    pluginDevServerBuilder = new PluginDevServerBuilder(context);
  });

  describe('#run', () => {
    it('should load the plugin', () => {
      expect('TBD').toEqual('TBD');
    });
  });
});
