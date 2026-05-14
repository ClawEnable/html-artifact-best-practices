#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

const externalUrlPattern = '(?:https?:)?//|https?:\\\\/\\\\/';

function hasExternalUrl(value) {
  return new RegExp(externalUrlPattern, 'i').test(value);
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(?:(["'])(.*?)\\1|([^\\s>]+))`, 'i');
  const match = tag.match(pattern);
  return match ? (match[2] || match[3] || '') : '';
}

function checkFixedWidths(html, failures) {
  const widthPattern = /(^|[;{\s])width\s*:\s*(\d+)px\b/gi;
  let match;

  while ((match = widthPattern.exec(html)) !== null) {
    const width = Number(match[2]);
    if (width > 375) {
      failures.push(`Fixed width exceeds mobile viewport: ${width}px`);
    }
  }
}

function checkCssUrls(html, failures) {
  const styleBlocks = html.match(/<style\b[^>]*>[\s\S]*?<\/style>/gi) || [];
  const urlPattern = /url\(\s*(?:(["'])(.*?)\1|([^)]*?))\s*\)/gi;

  for (const styleBlock of styleBlocks) {
    let match;
    while ((match = urlPattern.exec(styleBlock)) !== null) {
      const value = (match[2] || match[3] || '').trim();
      if (hasExternalUrl(value)) {
        failures.push(`External CSS URL: ${value}`);
      }
    }
  }
}

function validateHtml(html) {
  const failures = [];

  if (!/^\s*<!doctype\s+html>/i.test(html)) {
    failures.push('Missing doctype');
  }

  if (!/<meta\s+[^>]*charset\s*=\s*["']?utf-8["']?[^>]*>/i.test(html)) {
    failures.push('Missing charset');
  }

  if (!/<meta\s+[^>]*name\s*=\s*["']viewport["'][^>]*>/i.test(html)) {
    failures.push('Missing viewport');
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch || titleMatch[1].trim().length === 0) {
    failures.push('Empty title');
  }

  const linkTags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of linkTags) {
    const rel = getAttribute(tag, 'rel').toLowerCase();
    const href = getAttribute(tag, 'href');
    if (rel.includes('stylesheet') && hasExternalUrl(href)) {
      failures.push(`External stylesheet: ${href}`);
    }
  }

  const scriptTags = html.match(/<script\b[^>]*>/gi) || [];
  for (const tag of scriptTags) {
    const src = getAttribute(tag, 'src');
    if (src && hasExternalUrl(src)) {
      failures.push(`External script: ${src}`);
    }
  }

  const imageTags = html.match(/<img\b[^>]*>/gi) || [];
  for (const tag of imageTags) {
    const src = getAttribute(tag, 'src');
    if (src && hasExternalUrl(src)) {
      failures.push(`External image: ${src}`);
    }
  }

  if (!html.includes('AI-generated. Verify critical decisions independently.')) {
    failures.push('Missing AI disclaimer');
  }

  if (!/@media\s+print\b/i.test(html)) {
    failures.push('Missing print stylesheet');
  }

  if (!/:focus-visible\b/i.test(html)) {
    failures.push('Missing focus-visible');
  }

  if (/user-select\s*:\s*none/i.test(html)) {
    failures.push('Found user-select: none');
  }

  checkFixedWidths(html, failures);
  checkCssUrls(html, failures);

  return failures;
}

function validateFile(filePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  return validateHtml(html);
}

function main(argv) {
  if (argv.length === 0) {
    console.error('Usage: node scripts/validate-artifact.js <artifact.html> [more.html]');
    return 2;
  }

  let hasFailures = false;

  for (const filePath of argv) {
    const label = path.basename(filePath);

    try {
      const failures = validateFile(filePath);
      if (failures.length === 0) {
        console.log(`${label}: PASS`);
        continue;
      }

      hasFailures = true;
      console.log(`${label}: FAIL`);
      for (const failure of failures) {
        console.log(`  - ${failure}`);
      }
    } catch (error) {
      hasFailures = true;
      console.log(`${label}: FAIL`);
      console.log(`  - ${error.message}`);
    }
  }

  return hasFailures ? 1 : 0;
}

if (require.main === module) {
  process.exitCode = main(process.argv.slice(2));
}

module.exports = {
  validateHtml
};
