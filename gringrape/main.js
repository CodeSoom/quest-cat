import { readFile } from 'fs/promises';

const { log: print } = console;

export default async function main(args) {
  const [filePath] = args;

  const data = await readFile(filePath, 'utf8');
  print(data);
}
