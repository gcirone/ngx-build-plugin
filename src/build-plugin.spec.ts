import { executeHook, loadPlugin, plugin, PluginHook } from './build-plugin';
import * as path from 'path';

jest.mock('root/folder/file.plugin.js', () => ({ pre: jest.fn(value => value) }), { virtual: true });
jest.mock('path');

describe('BuildPlugin Test', () => {
  const options = { plugin: 'folder/file.plugin.js' };
  const root = 'root';

  beforeAll(() => {
    jest.spyOn(path, 'resolve').mockImplementation((...values) => values.join('/'));
  });

  describe('#loadPlugin', () => {
    beforeEach(() => loadPlugin(root, options));

    it('should resolve the plugin path', () => {
      expect(path.resolve).toHaveBeenLastCalledWith(root, options.plugin);
    });

    it('should load the plugin correctly', () => {
      expect(plugin).toEqual({ pre: expect.any(Function) });
    });
  });

  describe('#executeHook', () => {
    const data = { sample: true };

    beforeEach(() => loadPlugin(root, options));

    it('should return the value if the hook method exist', () => {
      const hookReturnValue = executeHook(PluginHook.PRE, data);
      expect(hookReturnValue).toEqual(data);
    });

    it('should return undefined if the hook method not exist', () => {
      const hookReturnValue = executeHook(PluginHook.POST, data);
      expect(hookReturnValue).toBeUndefined();
    });
  });
});
