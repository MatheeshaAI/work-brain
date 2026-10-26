const leadListElement = document.getElementById('leadList');
const leadSearchInput = document.getElementById('leadSearch');
const statusFilter = document.getElementById('statusFilter');
const summaryElement = document.getElementById('summary');
const overviewCardsElement = document.getElementById('overviewCards');
const focusBoardElement = document.getElementById('focusBoard');
const priorityBoardElement = document.getElementById('priorityBoard');
const darkModeButton = document.getElementById('toggleDarkMode');
const refreshButton = document.getElementById('refreshDashboard');
const leadCountElement = document.getElementById('leadCount');

const state = {
  leads: [],
  dashboard: null,
  selectedLead: null
};

function setDarkMode(enabled) {
  document.body.classList.toggle('dark', enabled);
  darkModeButton.textContent = enabled ? 'Light mode' : 'Dark mode';
  localStorage.setItem('dashboardDarkMode', enabled ? 'true' : 'false');
}

function applySavedPreferences() {
  const darkMode = localStorage.getItem('dashboardDarkMode');
  setDarkMode(darkMode !== 'false');
}

function escapeHtml(value = '') {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getLeadFilterMatch(lead, filterValue) {
  const status = (lead.status || '').toLowerCase();

  if (filterValue === 'new') {
    return status.includes('new');
  }

  if (filterValue === 'quoted') {
    return status.includes('quoted') || status.includes('followed');
  }

  if (filterValue === 'payment') {
    return ['application', 'payment', 'allocated', 'submitted', 'booking'].some(token => status.includes(token));
  }

  if (filterValue === 'booked') {
    return status.includes('booked') || status.includes('issued') || status.includes('allocated');
  }

  return true;
}

function getFilteredLeads() {
  const query = leadSearchInput.value.trim().toLowerCase();
  const filterValue = statusFilter.value;

  return state.leads.filter(lead => {
    const haystack = [lead.fullName, lead.refId, lead.status, lead.mobile].join(' ').toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesQuery && getLeadFilterMatch(lead, filterValue);
  });
}

function renderLeadList() {
  const items = getFilteredLeads();
  leadCountElement.textContent = String(items.length);
  leadListElement.innerHTML = '';

  if (!items.length) {
    leadListElement.innerHTML = '<p class="muted-message">No leads match this filter.</p>';
    return;
  }

  items.forEach(lead => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lead-card';
    if (state.selectedLead?.refId === lead.refId) {
      button.classList.add('active');
    }

    button.innerHTML = `
      <h3>${escapeHtml(lead.fullName)}</h3>
      <p class="lead-meta">${escapeHtml(lead.refId)} • ${escapeHtml(lead.status || 'Unknown')}</p>
      <p class="lead-meta">${escapeHtml(lead.customerType || 'Unknown')} • ${lead.memberCount || 0} member(s)</p>
    `;

    button.addEventListener('click', () => selectLeadByRefId(lead.refId));
    leadListElement.appendChild(button);
  });
}

function renderOverviewCards() {
  const stats = state.dashboard?.stats;
  if (!stats) {
    overviewCardsElement.innerHTML = '';
    return;
  }

  const cards = [
    { label: 'Lead Files', value: stats.totalLeadFiles, note: 'All lead markdown files in Workspace' },
    { label: 'New Queue', value: stats.newLeads, note: 'Immediate-action leads from pipeline' },
    { label: 'Payment Stage', value: stats.paymentStage, note: 'Applications, payment, and booking flow' },
    { label: 'Open Tasks', value: stats.openTasks, note: `${stats.urgentTasks} urgent tasks need attention` }
  ];

  overviewCardsElement.innerHTML = cards.map(card => `
    <article class="stat-card">
      <span class="stat-label">${escapeHtml(card.label)}</span>
      <strong>${escapeHtml(String(card.value))}</strong>
      <p>${escapeHtml(card.note)}</p>
    </article>
  `).join('');
}

function queueItemMarkup(item, type) {
  if (type === 'task') {
    return `
      <li class="task-item">
        <p class="queue-meta">${escapeHtml(item.bucket || 'Task')}</p>
        <strong>${escapeHtml(item.text || '')}</strong>
        ${item.refId ? `<button type="button" data-ref-id="${escapeHtml(item.refId)}">Open related lead</button>` : ''}
      </li>
    `;
  }

  const refId = item['REF-ID'] || item['Policy #'] || '';
  const title = item.Client || item['REF-ID'] || item['Policy #'] || 'Item';
  const meta = Object.entries(item)
    .filter(([key]) => !['Client', 'REF-ID', 'Policy #'].includes(key))
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${value}`)
    .join(' • ');

  return `
    <li class="queue-item">
      <strong>${escapeHtml(title)}</strong>
      <p class="queue-meta">${escapeHtml(refId)}${meta ? ` • ${escapeHtml(meta)}` : ''}</p>
      ${/^HEA-/.test(refId) ? `<button type="button" data-ref-id="${escapeHtml(refId)}">Open lead</button>` : ''}
    </li>
  `;
}

function renderFocusBoard() {
  const queues = state.dashboard?.queues;
  if (!queues) {
    focusBoardElement.innerHTML = '';
    priorityBoardElement.innerHTML = '';
    return;
  }

  const queueCards = [
    { title: 'New Leads', items: queues.newLeads, note: 'Fresh lead intake and WhatsApp follow-up' },
    { title: 'In Progress', items: queues.inProgress, note: 'Quoted and followed-up leads' },
    { title: 'Payment Stage', items: queues.paymentStage, note: 'Applications, booking, and payment items' },
    { title: 'Renewals', items: queues.renewals, note: 'Active renewal pipeline snapshot' }
  ];

  focusBoardElement.innerHTML = queueCards.map(card => `
    <article class="queue-card">
      <h3>${escapeHtml(card.title)}</h3>
      <p class="queue-meta">${escapeHtml(card.note)}</p>
      <ul class="queue-list">
        ${card.items?.length ? card.items.slice(0, 5).map(item => queueItemMarkup(item, 'queue')).join('') : '<li class="muted-message">Nothing queued.</li>'}
      </ul>
    </article>
  `).join('');

  priorityBoardElement.innerHTML = `
    <article class="task-card">
      <h3>Urgent Tasks</h3>
      <ul class="task-list">
        ${queues.urgentTasks?.length ? queues.urgentTasks.map(item => queueItemMarkup(item, 'task')).join('') : '<li class="muted-message">No urgent tasks parsed.</li>'}
      </ul>
    </article>
    <article class="task-card">
      <h3>Today / Open</h3>
      <ul class="task-list">
        ${queues.tasks?.length ? queues.tasks.map(item => queueItemMarkup(item, 'task')).join('') : '<li class="muted-message">No open tasks found.</li>'}
      </ul>
    </article>
  `;

  [...focusBoardElement.querySelectorAll('button[data-ref-id]'), ...priorityBoardElement.querySelectorAll('button[data-ref-id]')]
    .forEach(button => {
      button.addEventListener('click', () => selectLeadByRefId(button.dataset.refId));
    });
}

function renderLeadSummary(lead) {
  state.selectedLead = lead;
  renderLeadList();

  summaryElement.classList.remove('empty');
  summaryElement.innerHTML = `
    <div class="summary-head">
      <div>
        <p class="eyebrow">Lead Workspace</p>
        <h2>${escapeHtml(lead.fullName)}</h2>
        <p class="hero-copy">${escapeHtml(lead.refId)} • ${escapeHtml(lead.customerType || 'Unknown')} • ${lead.memberCount || 0} member(s)</p>
      </div>
      <span class="status-pill">${escapeHtml(lead.status || 'Unknown')}</span>
    </div>

    <div class="summary-grid">
      <div class="work-stack">
        <section class="info-card">
          <div class="panel-head compact">
            <h2>Customer Snapshot</h2>
          </div>
          <ul class="meta-list">
            <li><span>Mobile</span><strong>${escapeHtml(lead.mobile || 'Not recorded')}</strong></li>
            <li><span>Email</span><strong>${escapeHtml(lead.email || 'Not recorded')}</strong></li>
            <li><span>Nationality</span><strong>${escapeHtml(lead.nationality || 'Unknown')}</strong></li>
            <li><span>Date of Birth</span><strong>${escapeHtml(lead.dob || 'Unknown')}</strong></li>
            <li><span>Gender</span><strong>${escapeHtml(lead.gender || 'Unknown')}</strong></li>
            <li><span>Member Category</span><strong>${escapeHtml(lead.memberCategory || 'Unknown')}</strong></li>
            <li><span>Created</span><strong>${escapeHtml(lead.createdDate || 'Unknown')}</strong></li>
            <li><span>Advisor</span><strong>${escapeHtml(lead.advisor || 'Unknown')}</strong></li>
          </ul>
        </section>

        <section class="info-card">
          <div class="panel-head compact">
            <h2>Files & Documents</h2>
          </div>
          <ul class="meta-list">
            <li><span>Lead File</span><strong>${escapeHtml(lead.fileName || '')}</strong></li>
            <li><span>Lead Path</span><strong>${escapeHtml(lead.filePath || '')}</strong></li>
            <li><span>Document Folder</span><strong>${escapeHtml(lead.documentFolder || 'Not available')}</strong></li>
          </ul>
          <ul class="document-list" style="margin-top: 12px;">
            ${lead.documents.length ? lead.documents.map(renderDocumentItem).join('') : '<li class="muted-message">No documents uploaded yet.</li>'}
          </ul>
        </section>
      </div>

      <div class="work-stack">
        <section class="work-card">
          <div class="panel-head compact">
            <h2>Comments Timeline</h2>
            <span class="mini-pill">${lead.comments.length}</span>
          </div>
          <ul class="comment-list">
            ${lead.comments.length ? lead.comments.map(renderCommentItem).join('') : '<li class="muted-message">No comments yet.</li>'}
          </ul>
        </section>

        <section class="work-card">
          <div class="panel-head compact">
            <h2>Quick Actions</h2>
          </div>
          <div class="action-grid">
            <textarea id="commentInput" placeholder="Add a note, update, or upload description"></textarea>
            <input id="fileInput" type="file" />
            <div class="button-row">
              <button id="saveCommentButton" type="button" class="save-button">Save comment</button>
              <button id="uploadFileButton" type="button" class="upload-button">Upload file</button>
            </div>
            <p class="small-note">Comments are appended directly to the lead markdown file. Uploads go into the matching Workspace Documents folder.</p>
          </div>
        </section>
      </div>
    </div>
  `;

  document.getElementById('saveCommentButton').addEventListener('click', saveComment);
  document.getElementById('uploadFileButton').addEventListener('click', uploadFile);
}

function renderCommentItem(comment) {
  const [timestamp, ...parts] = comment.split(' - ');
  return `
    <li class="comment-item">
      <time>${escapeHtml(timestamp || '')}</time>
      <div>${escapeHtml(parts.join(' - ') || comment)}</div>
    </li>
  `;
}

function renderDocumentItem(doc) {
  return `
    <li class="document-item">
      <a href="${doc.url}" target="_blank" rel="noreferrer">${escapeHtml(doc.name)}</a>
    </li>
  `;
}

async function selectLeadByRefId(refId) {
  if (!refId) {
    return;
  }

  const response = await fetch(`/api/leads/${encodeURIComponent(refId)}`);
  if (!response.ok) {
    summaryElement.classList.remove('empty');
    summaryElement.innerHTML = '<p class="muted-message">Unable to load lead details.</p>';
    return;
  }

  const lead = await response.json();
  renderLeadSummary(lead);
}

async function saveComment() {
  const textarea = document.getElementById('commentInput');
  const comment = textarea?.value.trim();
  if (!comment || !state.selectedLead) {
    return;
  }

  toggleButtons(true);
  const response = await fetch(`/api/leads/${encodeURIComponent(state.selectedLead.refId)}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment })
  });

  toggleButtons(false);
  if (!response.ok) {
    alert('Unable to save comment.');
    return;
  }

  const lead = await response.json();
  renderLeadSummary(lead);
}

async function uploadFile() {
  const fileInput = document.getElementById('fileInput');
  const commentTextarea = document.getElementById('commentInput');
  if (!fileInput?.files?.length || !state.selectedLead) {
    alert('Choose a file first.');
    return;
  }

  toggleButtons(true);
  const formData = new FormData();
  formData.append('document', fileInput.files[0]);
  if (commentTextarea.value.trim()) {
    formData.append('comment', commentTextarea.value.trim());
  }

  const response = await fetch(`/api/leads/${encodeURIComponent(state.selectedLead.refId)}/documents`, {
    method: 'POST',
    body: formData
  });

  toggleButtons(false);
  if (!response.ok) {
    alert('Upload failed.');
    return;
  }

  const result = await response.json();
  renderLeadSummary(result.lead);
}

function toggleButtons(disabled) {
  document.querySelectorAll('.save-button, .upload-button, .queue-item button, .task-item button, .ghost-button, .lead-card')
    .forEach(button => {
      button.disabled = disabled;
    });
}

async function loadDashboard() {
  const [dashboardResponse, leadsResponse] = await Promise.all([
    fetch('/api/dashboard'),
    fetch('/api/leads')
  ]);

  state.dashboard = await dashboardResponse.json();
  state.leads = await leadsResponse.json();

  renderOverviewCards();
  renderFocusBoard();
  renderLeadList();
}

leadSearchInput.addEventListener('input', renderLeadList);
statusFilter.addEventListener('change', renderLeadList);
darkModeButton.addEventListener('click', () => setDarkMode(!document.body.classList.contains('dark')));
refreshButton.addEventListener('click', async () => {
  refreshButton.disabled = true;
  try {
    await loadDashboard();
  } finally {
    refreshButton.disabled = false;
  }
});

applySavedPreferences();
loadDashboard().catch(() => {
  overviewCardsElement.innerHTML = '<p class="muted-message">Unable to load dashboard data.</p>';
  leadListElement.innerHTML = '<p class="muted-message">Unable to load leads.</p>';
});
