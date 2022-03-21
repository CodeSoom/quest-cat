import TextFile from './TextFile';

describe('TextFile', () => {
  it('writes its content', async () => {
    const print = jest.fn();

    const textFile = await TextFile.readFrom('fixture/foo.txt');

    textFile.writeWith(print);

    expect(print).toBeCalledWith('FOO');
  });

  it('concats another files', () => {
    const textFile1 = new TextFile('foo');
    const textFile2 = new TextFile('bar');

    expect(textFile1.concat(textFile2))
      .toEqual(new TextFile('foo\nbar'));
  });
});
