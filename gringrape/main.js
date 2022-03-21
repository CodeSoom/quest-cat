import TextFile from './TextFile';

const { log: print } = console;

export default async function main(args) {
  const [...filePaths] = args;

  const files = await Promise.all(
    filePaths.map(TextFile.readFrom),
  );

  files
    .reduce((a, b) => a.concat(b))
    .writeWith(print);
}
