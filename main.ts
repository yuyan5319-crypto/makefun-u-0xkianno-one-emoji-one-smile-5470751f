// One Emoji, One Smile — make.fun bounty entry.
//
// The competition asks for exactly one emoji: the one most likely to make
// a stranger smile. My choice is 🫶 (HEART HANDS, U+1FAF6): two hands
// forming a heart. It reads as warm and friendly at a glance, needs no
// context or shared joke, and is a deliberate pick rather than the first
// smiley that comes to mind — a small gesture of warmth from a stranger,
// not intimacy, sarcasm, or flirtation.
//
// This program writes that single emoji — and nothing else — to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), so the
// sealed scorer sees valid UTF-8 text of 1 to 8 characters.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EMOJI = "🫶";

// Guard: the gate requires UTF-8 text of 1 to 8 characters, and the brief
// requires exactly one emoji. A single grapheme cluster is the strictest
// reading of that, so refuse to write anything that is not one.
const graphemes = new Intl.Segmenter("en", { granularity: "grapheme" }).segment(EMOJI);
if ([...graphemes].length !== 1) {
  throw new Error(`expected exactly one emoji, got ${[...graphemes].length} graphemes`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputFile = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputFile, EMOJI, "utf8");
