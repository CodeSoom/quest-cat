import Parser from './Parser';

import TextFile from './TextFile';

const { log: print } = console;

export default async function main(args) {
  try {
    const { options, filePaths } = new Parser().parse(args);

    const files = await Promise.all(
      filePaths.map(TextFile.readFrom),
    );

    files
      .map((file) => options.reduce((currentFile, option) => (
        currentFile.transform(option)
      ), file))
      .reduce((a, b) => a.concat(b))
      .writeWith(print);
  } catch (e) {
    print(e.message);
  }
}
