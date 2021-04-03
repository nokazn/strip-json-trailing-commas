export interface Options {
  /** @default true */
  stripeWhitespace?: boolean;
}

export default function stripJsonTrailingCommas(content: string, options: Options = {}): string {
  if (options.stripeWhitespace ?? true) {
    /**
     * preceded by number or string '}' or ']'
     * match with 0 or more spaces and ','
     * followed by '}' or ']'
     */
    return content.replace(/(?<=true|false|["\d}\]]\s*)\s*,(?=\s*[}\]])/g, '');
  }

  /**
   * preceded by number or string '}' or ']' (and with 0 or more spaces)
   * match with ','
   * followed by '}' or ']'
   */
  return content.replace(/(?<=true|false|["\d}\]]\s*),(?=\s*[}\]])/g, '');
}
