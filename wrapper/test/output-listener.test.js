const OutputListener = require('../lib/output-listener');

describe('output-listener', () => {
  it('receives and exposes data', () => {
    const listener = new OutputListener();
    const listen = listener.listener;
    listen(Buffer.from('foo'));
    listen(Buffer.from('bar'));
    listen(Buffer.from('baz'));
    expect(listener.contents).toEqual('foobarbaz');
  });
});
