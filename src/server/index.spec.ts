import { PluginServerBuilder } from './';

describe('PluginServerBuilder Test', () => {
  const context: any = { workspace: { root: 'root' } };
  let pluginBrowserBuilder: PluginServerBuilder;

  beforeEach(() => {
    pluginBrowserBuilder = new PluginServerBuilder(context);
  });

  it('should be true', () => {
    expect(true).toBeTruthy();
  });
});
