const LOG_LEVEL = "log";

const NO_OP = (message, ...optionalParams) => {};
/** Logger which outputs to the browser console */
export class ConsoleLogger {
  constructor(options) {
    const { level } = options || {};

    this.error = console.error.bind(console);

    if (level === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;

      return;
    }

    this.warn = console.warn.bind(console);

    if (level === "warn") {
      this.log = NO_OP;
      return;
    }
    this.log = console.log.bind(console);
  }
}

export const logger = new ConsoleLogger({ level: LOG_LEVEL });
