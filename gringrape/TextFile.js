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
}
