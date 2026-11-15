/**
 * Sync the single approved external affiliate URL across all site variants.
 * Updates only external click URLs and marked affiliate anchors.
 * Idempotent; safe to re-run after static site generation.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = "https://h0xhaw0za1kg7e.xyz/click/6979c7c96bcc6364c87500ce/7/16899/subaccount";
let examined = 0, updated = 0, replacements = 0;
const oldClickLink = /https?:\/\/(?:www\.)?pdlinkfortysix\.xyz\/click\/[^\s"'<>\\`]+/gi;
function visit(dir) {
  for (const item of fs.readdirSync(dir, {withFileTypes: true})) {
    if (item.isDirectory()) {
      if (!['node_modules', '.git', '.vercel', '.github'].includes(item.name)) visit(path.join(dir, item.name));
      continue;
    }
    if (!item.isFile() || !/\.(?:html|js|mjs)$/i.test(item.name)) continue;
    const file = path.join(dir, item.name);
    let source = fs.readFileSync(file, 'utf8');
    examined++;
    let count = 0;
    let result = source.replace(oldClickLink, () => { count++; return TARGET; });
    // All language variants mark their affiliate buttons with data-affiliate-link.
    result = result.replace(/<a\b[^>]*\bdata-affiliate-link\b[^>]*>/gi, tag => {
      if (!/\bhref\s*=/.test(tag)) return tag;
      const next = tag.replace(/(\bhref\s*=\s*)(["'])([^"']*)\2/i, (_, pre) => pre + '"' + TARGET + '"');
      if (tag !== next) count++;
      return next;
    });
    if (result !== source) {
      fs.writeFileSync(file, result, 'utf8');
      updated++; replacements += count;
      console.log(path.relative(ROOT, file).replaceAll('\\', '/'), count);
    }
  }
}
visit(ROOT);
console.log(JSON.stringify({examined, updated, replacements, target:TARGET}, null, 2));
