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

  describe('with "numberEachLine" option', () => {
    it('transforms its content with option', () => {
      const textFile = new TextFile('foo\nbar');

      expect(textFile.transform('numberEachLine'))
        .toEqual(new TextFile('     1 foo\n     2 bar'));
    });
  });

  describe('with "numberNonBlankLine" option', () => {
    it('transforms its content with option', () => {
      const textFile = new TextFile('foo\n \nbar');

      expect(textFile.transform('numberNonBlankLine'))
        .toEqual(new TextFile('     1 foo\n \n     3 bar'));
    });
  });
});
