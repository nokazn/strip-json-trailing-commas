export interface Options {
  /** @default true */
  stripWhitespace?: boolean;
}

function isWhitespace(ch: string): boolean {
  return ch === " " || ch === "\t" || ch === "\n" || ch === "\r";
}

function isValidLookbehind(output: string, lastNonWsIdx: number): boolean {
  if (lastNonWsIdx < 0) return false;
  const lastChar = output[lastNonWsIdx];
  if (lastChar === '"' || lastChar === "}" || lastChar === "]") return true;
  if (lastChar >= "0" && lastChar <= "9") return true;
  if (lastNonWsIdx >= 3 && output.slice(lastNonWsIdx - 3, lastNonWsIdx + 1) === "true") return true;
  if (lastNonWsIdx >= 4 && output.slice(lastNonWsIdx - 4, lastNonWsIdx + 1) === "false")
    return true;
  if (lastNonWsIdx >= 3 && output.slice(lastNonWsIdx - 3, lastNonWsIdx + 1) === "null") return true;
  return false;
}

export default function stripJsonTrailingCommas(content: string, options: Options = {}): string {
  const shouldStripWs = options.stripWhitespace ?? true;
  let output = "";
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
      output += ch;
      lastNonWsOutputIdx = output.length - 1;
      continue;
    }

    if (ch === '"') {
      inString = true;
      output += ch;
      lastNonWsOutputIdx = output.length - 1;
      continue;
    }

    if (ch !== ",") {
      output += ch;
      if (!isWhitespace(ch)) {
        lastNonWsOutputIdx = output.length - 1;
      }
      continue;
    }

    // カンマ（文字列外）: トレイリングカンマ判定
    let j = i + 1;
    while (j < content.length && isWhitespace(content[j])) j++;
    const isTrailingCandidate = j < content.length && (content[j] === "}" || content[j] === "]");

    if (!isTrailingCandidate || !isValidLookbehind(output, lastNonWsOutputIdx)) {
      output += ch;
      lastNonWsOutputIdx = output.length - 1;
      continue;
    }

    if (shouldStripWs) {
      output = output.slice(0, lastNonWsOutputIdx + 1);
    }
  }

  return output;
}
