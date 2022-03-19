const { readFile } = require('fs/promises');

const { log: print } = console;

async function main() {
  const [filePath] = process.argv.slice(2);

  const data = await readFile(filePath, 'utf8');
  print(data);
}

main();
