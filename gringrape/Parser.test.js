import Parser from './Parser';

describe('parse', () => {
  it('parses arguments into options and filepaths', () => {
    const parser = new Parser();
    const { options, filePaths } = parser.parse(['-n', 'foo.txt', 'bar.txt']);

    expect(options).toEqual(['numberEachLine']);
    expect(filePaths).toEqual(['foo.txt', 'bar.txt']);
  });

  it('parses consecutive option arguments into options', () => {
    const parser = new Parser();
    const { options } = parser.parse(['-nb', 'foo.txt', 'bar.txt']);

    expect(options).toEqual(['numberNonBlankLine']);
  });

  it('parses arguments into options', () => {
    const parser = new Parser();
    const { options } = parser.parse(['-n', '-b', 'foo.txt', 'bar.txt']);

    expect(options).toEqual(['numberNonBlankLine']);
  });

  it('without duplicate options', () => {
    const parser = new Parser();
    const { options } = parser.parse(['-n', '-b', '-nb', 'foo.txt', 'bar.txt']);

    expect(options).toEqual(['numberNonBlankLine']);
  });
});
