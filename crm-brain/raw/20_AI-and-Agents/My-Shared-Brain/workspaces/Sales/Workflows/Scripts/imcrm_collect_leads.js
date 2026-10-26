const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const session = daemon.session();

async function waitForReady(timeoutMs = 30000) {
  const end = Date.now() + timeoutMs;
  while (Date.now() < end) {
    const state = await daemon.evaluateJs("document.readyState");
    if (state === "complete") return;
    await sleep(250);
  }
  throw new Error("Timed out waiting for document.readyState=complete");
}

async function extractPage() {
  return await daemon.evaluateJs(`(() => {
    const normalize = s => (s || '').replace(/\\u00a0/g, ' ').replace(/\\s+/g, ' ').trim();
    const table = document.querySelector('.vue3-easy-data-table');
    if (!table) return { error: 'table not found' };
    const headers = Array.from(table.querySelectorAll('thead th')).map(th => normalize(th.textContent)).filter(Boolean);
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => Array.from(tr.querySelectorAll('td')).map(td => normalize(td.textContent)));
    const next = Array.from(document.querySelectorAll('a')).find(a => normalize(a.textContent) === 'Next');
    const prev = Array.from(document.querySelectorAll('a')).find(a => normalize(a.textContent) === 'Previous');
    const pageInfo = Array.from(document.querySelectorAll('div')).map(d => normalize(d.textContent)).find(t => /^Now displaying:/i.test(t)) || '';
    return {
      url: location.href,
      title: document.title,
      pageInfo,
      headers,
      rows,
      nextHref: next ? next.href : null,
      prevHref: prev ? prev.href : null
    };
  })()`);
}

const visited = new Set();
const pages = [];

for (let i = 0; i < 100; i++) {
  await waitForReady();
  await sleep(500);
  const page = await extractPage();
  if (!page || page.error) throw new Error(page?.error || 'Unknown extraction error');
  if (visited.has(page.url)) break;
  visited.add(page.url);
  pages.push({
    url: page.url,
    title: page.title,
    pageInfo: page.pageInfo,
    rowCount: page.rows.length,
    headers: page.headers,
    rows: page.rows
  });
  if (!page.nextHref) break;
  await session.call('Page.navigate', { url: page.nextHref });
}

const headers = pages[0]?.headers || [];
const allRows = pages.flatMap(p => p.rows);
return {
  content: [{ type: 'text', text: JSON.stringify({ pageCount: pages.length, totalRows: allRows.length, headers, pages: pages.map(p => ({ url: p.url, pageInfo: p.pageInfo, rowCount: p.rowCount })) }, null, 2) }],
  details: { pageCount: pages.length, totalRows: allRows.length, headers, allRows, pages }
};
