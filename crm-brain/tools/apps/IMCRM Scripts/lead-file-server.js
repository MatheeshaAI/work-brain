const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3055;
const ROOT = path.resolve(__dirname, '..');
const WORKSPACE = path.join(ROOT, 'Workspace');
const LEADS_DIR = path.join(WORKSPACE, 'Leads');
const MOTOR_LEADS_DIR = path.join(WORKSPACE, 'Leads', 'Motor Insurance');
const DOCUMENTS_DIR = path.join(WORKSPACE, 'Documents');
const PIPELINE_FILE = path.join(WORKSPACE, 'PIPELINE.md');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function sanitizeFilePart(value) {
  return String(value || '')
    .trim()
    .replace(/[\\/:*?"<>|]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '') || 'Unknown';
}

function normalizeRefId(refId) {
  const raw = String(refId || '').trim().toUpperCase();
  if (raw.startsWith('CAR')) {
    const m = raw.match(/CAR-?([A-Z0-9]{6,10})/);
    return m ? `CAR-${m[1]}` : '';
  }
  const m = raw.match(/(?:HEA-)?([A-Z0-9]{6,10})/);
  return m ? `HEA-${m[1]}` : '';
}

function normalizeCreatedDate(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const match = raw.match(/\d{1,2}-[A-Za-z]{3}-\d{4}/);
  if (match) return match[0];
  return raw.split(/\s+/)[0] || raw;
}

function getLead(data) {
  return data && data['Lead Details'] ? data['Lead Details'] : {};
}

function getMembers(data) {
  return data && data['Member Details'] && Array.isArray(data['Member Details'].Members)
    ? data['Member Details'].Members
    : [];
}

function getPlans(data) {
  return data && Array.isArray(data['Available Plans']) ? data['Available Plans'] : [];
}

function customerTypeFromMembers(members) {
  const count = members.length || 1;
  return count > 1 ? `Family (${count})` : 'Individual';
}

function formatLeadMarkdown(data) {
  const lead = getLead(data);
  const members = getMembers(data);
  const plans = getPlans(data);
  const refId = normalizeRefId(lead['Ref-ID']);
  const name = lead['Name'] || 'Unknown';
  const customerType = customerTypeFromMembers(members);

  let md = '';
  md += `# Lead Detail: ${refId} - ${name}\n\n`;
  md += `## General Information\n`;
  md += `- **Ref-ID:** ${refId}\n`;
  md += `- **Customer Type:** ${customerType}\n`;
  md += `- **Created Date:** ${lead['Created Date'] || ''}\n`;
  md += `- **Advisor:** Matheesha Sarathchandra\n`;
  md += `- **Status:** New Lead\n\n`;

  md += `## Customer Profile\n`;
  md += `- **Full Name:** ${name}\n`;
  md += `- **Mobile:** ${lead['Mobile'] || ''}\n`;
  md += `- **Email:** ${lead['Email'] || ''}\n`;
  md += `- **Nationality:** ${lead['Nationality'] || ''}\n`;
  md += `- **Date of Birth:** ${lead['Date of Birth'] || ''}\n`;
  md += `- **Gender:** ${lead['Gender'] || ''}\n`;
  md += `- **Emirate of Visa:** ${lead['Emirate of Visa'] || ''}\n`;
  md += `- **Member Category:** ${lead['Member Category'] || ''}\n\n`;

  md += `## Payment Details\n`;
  md += `- **Total Amount:** Pending\n`;
  md += `- **Status:** Pending\n`;
  md += `- **Payment Method:** Pending\n\n`;

  md += `## Member Details\n`;
  md += `- **Number of Members:** ${members.length || 0}\n`;
  if (members.length) {
    members.forEach((member, index) => {
      md += `\n### Member ${index + 1}\n`;
      md += `- **Member Name:** ${member['Member Name'] || ''}\n`;
      md += `- **Relationship:** ${member['Relationship'] || ''}\n`;
      md += `- **Gender:** ${member['Gender'] || ''}\n`;
      md += `- **Date of Birth:** ${member['Date of Birth'] || ''}\n`;
      md += `- **Nationality:** ${member['Nationality'] || ''}\n`;
      md += `- **Emirates of Visa:** ${member['Emirates of Visa'] || ''}\n`;
      md += `- **Member Category:** ${member['Member Category'] || ''}\n`;
    });
  }

  md += `\n## Available Plans Extracted\n`;
  if (plans.length) {
    md += `- **Number of Plans:** ${plans.length}\n`;
    plans.forEach((plan, index) => {
      md += `\n### Plan ${index + 1}\n`;
      md += `- **Provider:** ${plan['Provider'] || ''}\n`;
      md += `- **Plan Name:** ${plan['Plan Name'] || ''}\n`;
      md += `- **Plan Type:** ${plan['Plan Type'] || ''}\n`;
      md += `- **Network:** ${plan['Network'] || ''}\n`;
      md += `- **Co-pay:** ${plan['Copay'] || ''}\n`;
      md += `- **Price:** ${plan['Price'] || ''}\n`;
      md += `- **Total Price (VAT):** ${plan['Total Price'] || ''}\n`;
    });
  } else {
    md += `- No plans extracted.\n`;
  }

  md += `\n## Documents\n`;
  md += `- Documents folder created.\n\n`;
  md += `## Notes / Status Updates\n`;
  md += `- Created from IMCRM Data Extractor extension.\n`;

  return md;
}

function formatMotorLeadMarkdown(data) {
  const lead = data['Lead Details'] || {};
  const vehicle = data['Vehicle Details'] || {};
  const history = data['Insurance History'] || {};
  const quote = data['Quote Details'] || {};

  const refId = normalizeRefId(lead['Ref-ID'] || '');
  const name = lead['Name'] || 'Unknown Client';
  const carValue = vehicle['Car Value'] ? `${vehicle['Car Value']} AED` : 'Pending';

  return `# Lead Detail: ${refId} - ${name}

## General Information
- **Ref-ID:** ${refId}
- **Insurance Type:** Motor
- **Registration Type:** ${lead['Registration Type'] || ''}
- **Created Date:** ${lead['Created Date'] || ''}
- **Advisor:** Matheesha Sarathchandra
- **Status:** New Lead
- **KYC Status:** ${lead['KYC Status'] || 'Pending'}
- **AML Status:** ${lead['AML Status'] || 'Pending'}

## Customer Profile
- **Full Name:** ${name}
- **Mobile:** ${lead['Mobile'] || ''}
- **Email:** ${lead['Email'] || ''}
- **Date of Birth:** ${lead['Date of Birth'] || ''}
- **Gender:** ${lead['Gender'] || ''}
- **Nationality:** ${lead['Nationality'] || ''}
- **UAE Licence Held For:** ${lead['UAE Licence Held For'] || ''}

## Vehicle Details
- **Car Make:** ${vehicle['Car Make'] || ''}
- **Car Model:** ${vehicle['Car Model'] || ''}
- **Year:** ${vehicle['Car Model Year'] || ''}
- **Trim:** ${vehicle['Trim'] || ''}
- **Vehicle Type:** ${vehicle['Vehicle Type'] || ''}
- **Car Value:** ${carValue}
- **Chassis Number:** ${vehicle['Chassis Number'] || ''}
- **Emirate of Registration:** ${vehicle['Emirate of Registration'] || ''}
- **Type of Insurance:** ${vehicle['Type of Insurance'] || ''}

## Insurance & Claims History
- **Currently Insured With:** ${history['Currently Insured With'] || ''}
- **Claim History:** ${history['Claim History'] || ''}
- **No-Claims Letter Available:** ${history['No-Claims Letter'] || ''}

## Quote & Payment
- **Quote Link:** ${quote['Quote Link'] || ''}
- **Payment Status:** ${quote['Payment Status'] || 'Pending'}

## Documents
- Documents folder created.

## Notes / Status Updates
- Created from IMCRM Data Extractor extension.
`;
}

function findExistingLeadFile(refId) {
  if (!fs.existsSync(LEADS_DIR)) return null;

  function searchDir(dir) {
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isFile() && entry.toUpperCase().startsWith(refId.toUpperCase())) {
          return entry;
        } else if (stat.isDirectory()) {
          const result = searchDir(fullPath);
          if (result) return result;
        }
      }
    } catch (e) {
      // skip unreadable directories
    }
    return null;
  }

  return searchDir(LEADS_DIR);
}

function findExistingMotorLeadFile(refId) {
  if (!fs.existsSync(MOTOR_LEADS_DIR)) return null;
  const files = fs.readdirSync(MOTOR_LEADS_DIR);
  return files.find(f => f.toUpperCase().startsWith(refId.toUpperCase())) || null;
}

function listFolders() {
  const folders = [];

  function walkDir(dir, relativePath = '') {
    try {
      const entries = fs.readdirSync(dir);
      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && !entry.startsWith('.')) {
          const relPath = relativePath ? path.join(relativePath, entry) : entry;
          folders.push(relPath.replace(/\\/g, '/'));
          walkDir(fullPath, relPath);
        }
      }
    } catch (e) {
      // skip unreadable directories
    }
  }

  if (fs.existsSync(LEADS_DIR)) {
    walkDir(LEADS_DIR);
  }

  return folders.sort();
}

function updatePipeline(data) {
  const lead = getLead(data);
  const members = getMembers(data);
  const refId = normalizeRefId(lead['Ref-ID']);
  const name = lead['Name'] || 'Unknown';
  const type = customerTypeFromMembers(members);
  const created = normalizeCreatedDate(lead['Created Date']);
  const row = `| ${refId} | ${name} | ${type} | ${created} | Await WhatsApp response — get insurance requirements |`;

  if (!fs.existsSync(PIPELINE_FILE)) {
    throw new Error(`PIPELINE.md not found at ${PIPELINE_FILE}`);
  }

  const pipeline = fs.readFileSync(PIPELINE_FILE, 'utf8');
  if (pipeline.includes(refId)) {
    return 'Already in pipeline';
  }

  const sectionMarker = '## 🔴 New Leads (Needs Immediate Action)';
  const sectionIndex = pipeline.indexOf(sectionMarker);

  if (sectionIndex === -1) {
    throw new Error('Could not find New Leads section in PIPELINE.md');
  }

  const sectionText = pipeline.slice(sectionIndex);
  const headerRegex = /\|\s*REF-ID\s*\|\s*Client\s*\|\s*Type\s*\|\s*Created\s*\|\s*Pending Action\s*\|\r?\n\|[-|\s]+\|/;
  const headerMatch = sectionText.match(headerRegex);

  if (!headerMatch || typeof headerMatch.index !== 'number') {
    throw new Error('Could not find New Leads table in PIPELINE.md');
  }

  const insertAt = sectionIndex + headerMatch.index + headerMatch[0].length;
  const newline = pipeline.includes('\r\n') ? '\r\n' : '\n';
  const updated = pipeline.slice(0, insertAt) + `${newline}${row}` + pipeline.slice(insertAt);
  fs.writeFileSync(PIPELINE_FILE, updated, 'utf8');
  return 'Added to New Leads';
}

function updateMotorPipeline(data) {
  const lead = data['Lead Details'] || {};
  const vehicle = data['Vehicle Details'] || {};

  const refId = normalizeRefId(lead['Ref-ID'] || '');
  const name = lead['Name'] || 'Unknown';
  const carLabel = [vehicle['Car Make'], vehicle['Car Model'], vehicle['Car Model Year']]
    .filter(Boolean).join(' ');
  const carValue = vehicle['Car Value'] || '';

  // Format date: "20-05-2026 12:04:17" → "20-May-2026"
  const rawDate = lead['Created Date'] || '';
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let created = rawDate;
  const dateParts = rawDate.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (dateParts) {
    created = `${dateParts[1]}-${months[parseInt(dateParts[2], 10) - 1]}-${dateParts[3]}`;
  }

  const row = `| ${refId} | ${name} | ${carLabel} | ${carValue} | ${created} | Quoted — await response |`;

  if (!fs.existsSync(PIPELINE_FILE)) return 'Pipeline file not found';

  let pipeline = fs.readFileSync(PIPELINE_FILE, 'utf8');

  // Duplicate check
  if (pipeline.includes(refId)) return 'Already in pipeline';

  const motorHeader = '| REF-ID | Client | Car | Value (AED) | Created | Pending Action |';
  const motorSeparator = '|--------|--------|-----|-------------|---------|----------------|';
  const motorSection = `\n## 🚗 Motor Leads\n\n${motorHeader}\n${motorSeparator}\n`;

  if (pipeline.includes('## 🚗 Motor Leads')) {
    // Section exists — insert row after separator line
    const headerRegex = /(\| REF-ID \| Client \| Car \| Value.*?\|\s*\n\|[-| ]+\|)/;
    pipeline = pipeline.replace(headerRegex, `$1\n${row}`);
  } else {
    // Create section — insert before "## 🟡 In Progress"
    const anchor = '## 🟡 In Progress';
    if (pipeline.includes(anchor)) {
      pipeline = pipeline.replace(anchor, `${motorSection}${row}\n\n---\n\n${anchor}`);
    } else {
      // Fallback: append before ## Notes
      const notesAnchor = '## Notes';
      if (pipeline.includes(notesAnchor)) {
        pipeline = pipeline.replace(notesAnchor, `${motorSection}${row}\n\n---\n\n${notesAnchor}`);
      } else {
        pipeline += `\n${motorSection}${row}\n`;
      }
    }
  }

  fs.writeFileSync(PIPELINE_FILE, pipeline, 'utf8');
  return 'Added to Motor section';
}

function createLead(data) {
  const lead = getLead(data);
  const refId = normalizeRefId(lead['Ref-ID']);
  const name = String(lead['Name'] || '').trim();
  const targetFolder = String(data.targetFolder || '').trim();

  if (!refId) throw new Error('Missing or invalid Ref-ID');
  if (!name) throw new Error('Missing lead name');

  fs.mkdirSync(LEADS_DIR, { recursive: true });
  fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });

  const nameParts = name.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'Unknown';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Client';
  const baseName = `${refId}-${sanitizeFilePart(firstName)}-${sanitizeFilePart(lastName)}`;

  const targetLeadsDir = targetFolder ? path.join(LEADS_DIR, targetFolder) : LEADS_DIR;
  const leadFile = path.join(targetLeadsDir, `${baseName}.md`);
  const documentsFolder = path.join(DOCUMENTS_DIR, baseName);

  const existing = findExistingLeadFile(refId);
  const duplicate = Boolean(existing);

  if (!duplicate) {
    fs.mkdirSync(targetLeadsDir, { recursive: true });
    fs.writeFileSync(leadFile, formatLeadMarkdown(data), 'utf8');
  }

  fs.mkdirSync(documentsFolder, { recursive: true });
  const pipelineStatus = updatePipeline(data);

  return {
    success: true,
    duplicate,
    message: duplicate ? `Lead file already exists for ${refId}` : `Lead created for ${refId}`,
    leadFile: duplicate ? path.join(LEADS_DIR, existing) : leadFile,
    documentsFolder,
    pipelineStatus
  };
}

function createMotorLead(data) {
  const lead = data['Lead Details'] || {};
  const refId = normalizeRefId(lead['Ref-ID'] || '');
  if (!refId) return { success: false, message: 'Could not determine Ref-ID from extracted data' };

  const name = lead['Name'] || 'Unknown Client';
  const nameParts = name.split(/\s+/).filter(Boolean);
  const firstName = nameParts[0] || 'Unknown';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Client';
  const baseName = `${refId}-${sanitizeFilePart(firstName)}-${sanitizeFilePart(lastName)}`;

  const leadFile = path.join(MOTOR_LEADS_DIR, `${baseName}.md`);
  const documentsFolder = path.join(DOCUMENTS_DIR, baseName);

  // Duplicate check
  const existingFile = findExistingMotorLeadFile(refId);
  if (existingFile) {
    return {
      success: false,
      duplicate: true,
      message: `Lead already exists: ${existingFile}`,
      leadFile: path.join(MOTOR_LEADS_DIR, existingFile)
    };
  }

  // Create directories
  fs.mkdirSync(MOTOR_LEADS_DIR, { recursive: true });
  fs.mkdirSync(documentsFolder, { recursive: true });

  // Write lead file
  const content = formatMotorLeadMarkdown(data);
  fs.writeFileSync(leadFile, content, 'utf8');

  // Update pipeline
  const pipelineStatus = updateMotorPipeline(data);

  return {
    success: true,
    message: `Motor lead created: ${baseName}`,
    leadFile,
    documentsFolder,
    pipelineStatus
  };
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    return sendJson(res, 200, { ok: true });
  }

  if (req.method === 'GET' && req.url === '/list-folders') {
    const folders = listFolders();
    return sendJson(res, 200, { success: true, folders });
  }

  if (req.method !== 'POST' || req.url !== '/create-lead') {
    return sendJson(res, 404, { success: false, error: 'Endpoint not found' });
  }

  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (body.length > 5 * 1024 * 1024) {
      req.destroy();
    }
  });

  req.on('end', () => {
    try {
      const data = JSON.parse(body || '{}');
      const result = (data.insuranceType === 'motor')
        ? createMotorLead(data)
        : createLead(data);
      sendJson(res, 200, result);
    } catch (error) {
      sendJson(res, 400, { success: false, error: error.message });
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Lead file server running at http://localhost:${PORT}`);
  console.log('Keep this window open while using the Chrome extension.');
});
