export interface Options {
  /** @default true */
  stripWhitespace?: boolean;
}

export default function stripJsonTrailingCommas(content: string, options: Options = {}): string {
  if (options.stripWhitespace ?? true) {
    /**
     * preceded by number or string or boolean (true/false) or null or '}' or ']'
     * match with 0 or more spaces and ','
     * followed by '}' or ']'
     */
    return content.replace(/(?<=(true|false|null|["\d}\]])\s*)\s*,(?=\s*[}\]])/g, '');
  }

  /**
   * preceded by number or string or boolean (true/false) or null or '}' or ']' (and with 0 or more spaces)
   * match with ','
   * followed by '}' or ']'
   */
  return content.replace(/(?<=(true|false|null|["\d}\]])\s*),(?=\s*[}\]])/g, '');
}
