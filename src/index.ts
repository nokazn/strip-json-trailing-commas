export interface Options {
  /** @default true */
  readonly stripWhitespace?: boolean;
}

function isWhitespace(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function isNonKeywordChar(ch: string): boolean {
  return !(
    (ch >= "a" && ch <= "z") ||
    (ch >= "A" && ch <= "Z") ||
    (ch >= "0" && ch <= "9") ||
    ch === "_"
  );
}

function isValidLookbehind(parts: string[], lastNonWsIdx: number): boolean {
  if (lastNonWsIdx < 0) return false;
  const lastChar = parts[lastNonWsIdx];
  if (lastChar === '"' || lastChar === "}" || lastChar === "]") return true;
  if (lastChar >= "0" && lastChar <= "9") return true;
  const tail = parts.slice(Math.max(0, lastNonWsIdx - 4), lastNonWsIdx + 1).join("");
  for (const kw of ["true", "false", "null"]) {
    if (
      tail.endsWith(kw) &&
      (lastNonWsIdx < kw.length || isNonKeywordChar(parts[lastNonWsIdx - kw.length]))
    )
      return true;
  }
  return false;
}

/**
 * Removes trailing commas from a JSON (or JSONC) string.
 *
 * Only commas that immediately precede a closing `}` or `]` — with optional
 * whitespace in between — are removed. Commas inside string values are left
 * untouched. Invalid trailing commas (e.g. in empty objects/arrays, multiple
 * consecutive commas) are also left untouched.
 *
 * @param content - The JSON string to process.
 * @param options - Optional configuration.
 * @param options.stripWhitespace - When `true` (default), whitespace between
 *   the last value and the trailing comma is also removed. Set to `false` to
 *   keep the original whitespace.
 * @returns The input string with trailing commas removed.
 * @example
 * stripJsonTrailingCommas('{"a": 1,}')   // => '{"a": 1}'
 * stripJsonTrailingCommas('[1, 2, 3,]')  // => '[1, 2, 3]'
 */
export default function stripJsonTrailingCommas(content: string, options: Options = {}): string {
  const shouldStripWs = options.stripWhitespace ?? true;
  const parts: string[] = [];
  let lastNonWsOutputIdx = -1;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      parts.push(ch);
      lastNonWsOutputIdx = parts.length - 1;
      continue;
    }

    if (ch === '"') {
      inString = true;
      parts.push(ch);
      lastNonWsOutputIdx = parts.length - 1;
      continue;
    }

    if (ch !== ",") {
      parts.push(ch);
      if (!isWhitespace(ch)) {
        lastNonWsOutputIdx = parts.length - 1;
      }
      continue;
    }

    // Comma outside a string: check whether it is a trailing comma
    let j = i + 1;
    while (j < content.length && isWhitespace(content[j])) j++;
    const isTrailingCandidate = j < content.length && (content[j] === "}" || content[j] === "]");

    if (!isTrailingCandidate || !isValidLookbehind(parts, lastNonWsOutputIdx)) {
      parts.push(ch);
      lastNonWsOutputIdx = parts.length - 1;
      continue;
    }

    if (shouldStripWs) {
      parts.splice(lastNonWsOutputIdx + 1);
    }
  }

  return parts.join("");
}
