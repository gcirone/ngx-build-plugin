import { BuildPlugin } from './build-plugin';
import * as core from '@angular-devkit/core';
import * as path from 'path';

jest.mock('root/folder/file.plugin.js', () => ({ pre: jest.fn(value => value) }), { virtual: true });
jest.mock('@angular-devkit/core');
jest.mock('path');

describe('BuildPlugin Test', () => {
  const options = { plugin: 'folder/file.plugin.js' };
  const root = 'root';

  beforeAll(() => {
    jest.spyOn(core, 'getSystemPath').mockImplementation(value => value);
    jest.spyOn(path, 'resolve').mockImplementation((...values) => values.join('/'));
  });

  describe('#loadPlugin', () => {
    beforeEach(() => BuildPlugin.loadPlugin(root as any, options));

    it('should resolve the plugin path', () => {
      expect(core.getSystemPath).toHaveBeenLastCalledWith(root);
      expect(path.resolve).toHaveBeenLastCalledWith(root, options.plugin);
    });

    it('should load the plugin correctly', () => {
      expect((BuildPlugin as any).plugin).toEqual({ pre: expect.any(Function) });
    });
  });

  describe('#runHook', () => {
    const data = { sample: true };

    it('should return the value if the hook method exist', () => {
      BuildPlugin.loadPlugin(root as any, options);

      const hookReturnValue = BuildPlugin.runHook('pre', data);
      expect(hookReturnValue).toEqual(data);
    });

    it('should return undefined if the hook method not exist', () => {
      const hookReturnValue = BuildPlugin.runHook('post', data);
      expect(hookReturnValue).toBeUndefined();
    });
  });
});
