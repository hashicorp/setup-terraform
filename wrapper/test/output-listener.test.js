/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

const OutputListener = require('../lib/output-listener');

describe('output-listener', () => {
  it('receives and buffers data to .contents', () => {
    const listener = new OutputListener();
    const listen = listener.listener;

    listen(Buffer.from('foo'));
    listen(Buffer.from('bar'));
    listen(Buffer.from('baz'));

    expect(listener.contents).toEqual('foobarbaz');
  });

  it('receives and writes data to stream immediately', () => {
    const mockWrite = jest.fn();
    const listener = new OutputListener({ write: mockWrite });
    const listen = listener.listener;

    listen(Buffer.from('first write'));
    expect(mockWrite.mock.lastCall[0]).toStrictEqual(Buffer.from('first write'));

    listen(Buffer.from('second write'));
    expect(mockWrite.mock.lastCall[0]).toStrictEqual(Buffer.from('second write'));

    listen(Buffer.from('third write'));
    expect(mockWrite.mock.lastCall[0]).toStrictEqual(Buffer.from('third write'));

    expect(mockWrite).toBeCalledTimes(3);
  });
});
