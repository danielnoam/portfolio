/*==============================================
            CHANGE SET MODULE

    Compares the model being edited against the one
    that was loaded, and describes the difference in
    plain language. Publishing shows this list first,
    so nothing reaches the repo that you haven't read
    back in words.
================================================*/

/** Flatten a model into `id -> { section, index, page }` for comparison. */
function indexPages(sections) {
    const pages = new Map();
    sections.forEach(section => {
        section.pages.forEach((page, index) => {
            pages.set(page.id, { section, index, page });
        });
    });
    return pages;
}

function describeSections(before, after, changes) {
    const beforeById = new Map(before.map(section => [section.id, section]));
    const afterById = new Map(after.map(section => [section.id, section]));

    before.forEach(section => {
        if (!afterById.has(section.id)) {
            changes.push({ type: 'remove', text: `Remove the "${section.name}" section` });
        }
    });

    after.forEach(section => {
        const original = beforeById.get(section.id);

        if (!original) {
            changes.push({ type: 'add', text: `Add the "${section.name}" section` });
            return;
        }
        if (original.name !== section.name) {
            changes.push({ type: 'rename', text: `Rename the section "${original.name}" to "${section.name}"` });
        }
        if (original.foldout !== section.foldout) {
            changes.push({
                type: 'edit',
                text: `Make the "${section.name}" section ${section.foldout ? 'collapsible' : 'always expanded'}`
            });
        }
    });

    const beforeOrder = before.filter(s => afterById.has(s.id)).map(s => s.id).join();
    const afterOrder = after.filter(s => beforeById.has(s.id)).map(s => s.id).join();
    if (beforeOrder !== afterOrder) {
        changes.push({ type: 'order', text: 'Reorder the sidebar sections' });
    }
}

function describePages(before, after, changes) {
    const beforePages = indexPages(before);
    const afterPages = indexPages(after);

    beforePages.forEach(({ page, section }, id) => {
        if (!afterPages.has(id)) {
            changes.push({
                type: 'remove',
                text: `Remove the page "${page.title}" from ${section.name}`,
                page
            });
        }
    });

    afterPages.forEach(({ page, section, index }, id) => {
        const original = beforePages.get(id);

        if (!original) {
            changes.push({
                type: 'add',
                text: `Add the page "${page.title}" to ${section.name}`,
                page
            });
            return;
        }

        if (original.page.title !== page.title) {
            changes.push({ type: 'rename', text: `Rename "${original.page.title}" to "${page.title}"` });
        }
        if (original.page.folder !== page.folder) {
            changes.push({
                type: 'edit',
                text: `Point "${page.title}" at ${page.folder} (was ${original.page.folder})`
            });
        }
        if (original.section.id !== section.id) {
            changes.push({
                type: 'move',
                text: `Move "${page.title}" from ${original.section.name} to ${section.name}`
            });
        }
        if (original.page.visible !== page.visible) {
            changes.push({
                type: 'edit',
                text: `${page.visible ? 'Show' : 'Hide'} "${page.title}" in the sidebar`
            });
        }
    });

    describeReordering(before, after, changes);
}

/**
 * Reordering is reported once per section, not once per page. Inserting a
 * single page shifts the index of everything below it, and listing each of
 * those as its own change would bury the edit that actually happened.
 */
function describeReordering(before, after, changes) {
    const beforeById = new Map(before.map(section => [section.id, section]));

    after.forEach(section => {
        const original = beforeById.get(section.id);
        if (!original) return;

        // Compare only the pages this section held both before and after, so
        // arrivals, departures and deletions don't read as a reorder.
        const stayed = new Set(
            section.pages
                .filter(page => original.pages.some(candidate => candidate.id === page.id))
                .map(page => page.id)
        );

        const beforeOrder = original.pages.filter(page => stayed.has(page.id)).map(page => page.id).join();
        const afterOrder = section.pages.filter(page => stayed.has(page.id)).map(page => page.id).join();

        if (beforeOrder !== afterOrder) {
            changes.push({ type: 'order', text: `Reorder the pages in ${section.name}` });
        }
    });
}

/** Every difference between the loaded model and the edited one. */
export function summarize(before, after) {
    const changes = [];
    describeSections(before, after, changes);
    describePages(before, after, changes);
    return changes;
}

/** Pages that existed when the model loaded but are gone now. */
export function removedPages(before, after) {
    const surviving = indexPages(after);
    return [...indexPages(before).values()]
        .filter(({ page }) => !surviving.has(page.id))
        .map(({ page }) => page);
}

/** Pages added during this editing session, which need a content.md. */
export function addedPages(before, after) {
    const original = indexPages(before);
    return [...indexPages(after).values()]
        .filter(({ page }) => !original.has(page.id))
        .map(({ page }) => page);
}
