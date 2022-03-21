export default class Parser {
  constructor() {
    this.index = 0;
    this.options = [];
    this.filePaths = [];
    this.state = 'lookForOptions';
  }

  takeOption(argument) {
    const optionMap = {
      n: 'numberEachLine',
      b: 'numberNonBlankLine',
    };

    this.index += 1;
    this.options = [...new Set([
      ...this.options,
      ...argument.slice(1).split('').map((i) => {
        const option = optionMap[i];
        if (!option) {
          throw new Error(`illegal option: ${i}`);
        }
        return option;
      }),
    ])];

    if (this.options.includes('numberEachLine') && this.options.includes('numberNonBlankLine')) {
      this.options = this.options.filter((o) => o !== 'numberEachLine');
    }
  }

  takeFilePath(argument) {
    this.index += 1;
    this.filePaths = [
      ...this.filePaths,
      argument,
    ];
  }

  transition(state, argument) {
    const parser = this;

    return {
      lookForOptions() {
        if (argument.startsWith('-')) {
          return {
            state: 'lookForOptions',
            action: parser.takeOption.bind(parser),
          };
        }

        return {
          state: 'lookForFilePaths',
          action: parser.takeFilePath.bind(parser),
        };
      },
      lookForFilePaths() {
        return {
          state: 'lookForFilePaths',
          action: parser.takeFilePath.bind(parser),
        };
      },
    }[state]();
  }

  parse(args) {
    if (this.index >= args.length) {
      return {
        options: this.options,
        filePaths: this.filePaths,
      };
    }

    const argument = args[this.index];

    const { state, action } = this.transition(this.state, argument);
    this.state = state;
    action(argument);

    return this.parse(args);
  }
}
