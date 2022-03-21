import { readFile } from 'fs/promises';

export default class TextFile {
  constructor(content) {
    this.content = content;
  }

  static async readFrom(path) {
    const content = await readFile(path, 'utf-8');

    return new TextFile(content);
  }

  writeWith(writeFunction) {
    writeFunction(this.content);
  }

  concat(textFile) {
    return new TextFile(`${this.content}\n${textFile.content}`);
  }

  transform(option) {
    const lineMappers = {
      numberEachLine: (numberString, line) => `${numberString} ${line}`,
      numberNonBlankLine: (numberString, line) => (
        line.trim() ? `${numberString} ${line}` : line
      ),
    };

    return new TextFile(this.content
      .split('\n')
      .map((line, index) => {
        const numberString = `${index + 1}`.padStart(6, ' ');
        return lineMappers[option](numberString, line);
      })
      .join('\n'));
  }
}
