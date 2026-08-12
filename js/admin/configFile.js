/*==============================================
            CONFIG FILE MODULE

    Reads and rewrites the real repository files
    the panel edits — js/core/config.js, CHANGELOG.md
    and new content.md stubs.

    config.js is hand-written and commented, so it is
    edited surgically: only the `structure` block is
    regenerated, and every comment, setting and blank
    line around it survives untouched.
================================================*/

const CONFIG_PATH = 'js/core/config.js';
const CHANGELOG_PATH = 'CHANGELOG.md';

export const paths = { config: CONFIG_PATH, changelog: CHANGELOG_PATH };

/**
 * Evaluate a fetched config.js and hand back its CONFIG object. The file is
 * a plain declaration list with no side effects — the site itself loads it
 * the same way, via a script tag.
 */
export function parseConfig(source) {
    try {
        return new Function(`${source}\nreturn CONFIG;`)();
    } catch (error) {
        throw new Error(`config.js could not be read: ${error.message}`);
    }
}

/**
 * Locate a top-level `key: { … }` block, skipping over strings and comments
 * so a brace inside either can't throw the depth count off.
 */
function findBlock(source, key) {
    const marker = new RegExp(`(^|\\n)([ \\t]*)${key}\\s*:\\s*\\{`);
    const match = marker.exec(source);
    if (!match) throw new Error(`Could not find "${key}" in config.js.`);

    const start = source.indexOf('{', match.index);
    let depth = 0;

    for (let i = start; i < source.length; i++) {
        const char = source[i];
        const next = source[i + 1];

        if (char === '/' && next === '/') {
            i = source.indexOf('\n', i);
            if (i === -1) break;
            continue;
        }
        if (char === '/' && next === '*') {
            i = source.indexOf('*/', i + 2) + 1;
            if (i === 0) break;
            continue;
        }
        if (char === '"' || char === "'" || char === '`') {
            for (i++; i < source.length; i++) {
                if (source[i] === '\\') i++;
                else if (source[i] === char) break;
            }
            continue;
        }

        if (char === '{') depth++;
        else if (char === '}' && --depth === 0) {
            return { start, end: i + 1, indent: match[2] };
        }
    }

    throw new Error(`Unbalanced braces around "${key}" in config.js.`);
}

/*==============================================
            EDITING MODEL
================================================*/

/**
 * CONFIG.structure is an object keyed by section name, which is awkward to
 * reorder and rename. The panel works on an array-of-sections copy instead,
 * where every section and page carries a stable id so renames and moves stay
 * traceable back to what was originally loaded.
 */
export function toModel(structure) {
    return Object.entries(structure).map(([name, section]) => ({
        id: crypto.randomUUID(),
        name,
        foldout: section.foldout === true,
        pages: (section.pages || []).map(page => ({
            id: crypto.randomUUID(),
            title: page.title,
            folder: page.folder,
            visible: page.visible !== false
        }))
    }));
}

/** Deep copy of the model, used to keep a pristine "as loaded" snapshot. */
export function cloneModel(sections) {
    return sections.map(section => ({
        ...section,
        pages: section.pages.map(page => ({ ...page }))
    }));
}

export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/['’]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'untitled';
}

/** Where a new page's markdown goes, given its section and title. */
export function suggestFolder(sectionName, title) {
    return `content/${slugify(sectionName)}/${slugify(title)}`;
}

export function contentPath(folder) {
    return `${folder.replace(/\/+$/, '')}/content.md`;
}

/*==============================================
            SERIALISATION
================================================*/

function renderPage(page) {
    const parts = [
        `title: ${JSON.stringify(page.title)}`,
        `folder: ${JSON.stringify(page.folder.replace(/\/+$/, ''))}`,
        `visible: ${page.visible !== false}`
    ];
    return `                { ${parts.join(', ')} },`;
}

function renderSection(section) {
    const pages = section.pages.length
        ? `[\n${section.pages.map(renderPage).join('\n')}\n            ]`
        : '[]';

    return [
        `        ${JSON.stringify(section.name)}: {`,
        `            foldout: ${section.foldout === true},`,
        `            pages: ${pages}`,
        '        },'
    ].join('\n');
}

/** Regenerate just the `structure` block inside an existing config.js. */
export function applyStructure(source, sections) {
    const block = findBlock(source, 'structure');
    const body = sections.length
        ? `{\n${sections.map(renderSection).join('\n')}\n    }`
        : '{}';
    return source.slice(0, block.start) + body + source.slice(block.end);
}

export function getVersion(source) {
    const match = source.match(/version:\s*['"]([^'"]+)['"]/);
    if (!match) throw new Error('Could not find the version in config.js.');
    return match[1];
}

export function applyVersion(source, version) {
    return source.replace(/(version:\s*)['"][^'"]+['"]/, `$1'${version}'`);
}

export function bumpPatch(version) {
    const [major = '0', minor = '0', patch = '0'] = version.split('.');
    return `${major}.${minor}.${Number(patch) + 1}`;
}

/**
 * Insert a new release entry above the most recent one, keeping the file's
 * explanatory header on top.
 */
export function prependChangelogEntry(changelog, version, date, bullets) {
    const entry = [
        `## [${version}] - ${date}`,
        '',
        '### Changed',
        '',
        ...bullets.map(line => `- ${line}`),
        '',
        ''
    ].join('\n');

    const firstRelease = changelog.indexOf('\n## [');
    if (firstRelease === -1) return `${changelog.trimEnd()}\n\n${entry}`;

    const insertAt = firstRelease + 1;
    return changelog.slice(0, insertAt) + entry + changelog.slice(insertAt);
}

/** Starter markdown for a page created from the panel. */
export function newPageContent(title) {
    return `---
thumbnail:
shortDescription:
tags: []
---
<div class="page-content">

# ${title}

<div class="project-card">

## Overview

Write the page here.

</div>

</div>
`;
}
