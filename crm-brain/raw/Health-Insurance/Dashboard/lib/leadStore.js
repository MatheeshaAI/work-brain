import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..', '..');
const workspaceDir = path.join(rootDir, 'Workspace');
const leadsDir = path.join(workspaceDir, 'Leads');
const documentsDir = path.join(workspaceDir, 'Documents');
const pipelinePath = path.join(workspaceDir, 'PIPELINE.md');

const FIELD_PATTERNS = {
  refId: /^\s*- \*\*Ref-ID:\*\*\s*(HEA-[A-Z0-9]+)\s*$/mi,
  fullName: /^\s*- \*\*Full Name:\*\*\s*(.+)\s*$/mi,
  status: /^\s*- \*\*Status:\*\*\s*(.+)\s*$/mi,
  customerType: /^\s*- \*\*Customer Type:\*\*\s*(.+)\s*$/mi,
  createdDate: /^\s*- \*\*Created Date:\*\*\s*(.+)\s*$/mi,
  mobile: /^\s*- \*\*Mobile:\*\*\s*(.+)\s*$/mi,
  email: /^\s*- \*\*Email:\*\*\s*(.+)\s*$/mi,
  nationality: /^\s*- \*\*Nationality:\*\*\s*(.+)\s*$/mi,
  gender: /^\s*- \*\*Gender:\*\*\s*(.+)\s*$/mi,
  dob: /^\s*- \*\*DOB:\*\*\s*(.+)\s*$/mi,
  memberCategory: /^\s*- \*\*Member Category:\*\*\s*(.+)\s*$/mi,
  advisor: /^\s*- \*\*Advisor:\*\*\s*(.+)\s*$/mi
};

function safeFolderName(name) {
  return name.replace(/[\\/:*?"<>|]+/g, '').trim().replace(/\s+/g, '-');
}

function stripMarkdown(text = '') {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/__/g, '')
    .replace(/`/g, '')
    .replace(/~~/g, '')
    .replace(/^\s*>\s*/gm, '')
    .trim();
}

function parseLeadMetadata(content) {
  const metadata = {};
  for (const [key, pattern] of Object.entries(FIELD_PATTERNS)) {
    metadata[key] = stripMarkdown(pattern.exec(content)?.[1] || '');
  }

  metadata.status = metadata.status || 'Unknown';
  metadata.customerType = metadata.customerType || 'Unknown';
  metadata.createdDate = metadata.createdDate || 'Unknown';
  metadata.fullName = metadata.fullName || 'Unknown';
  metadata.memberCount = extractMemberCount(content);

  return metadata;
}

function extractMemberCount(content) {
  const tableMatch = content.match(/## Member Details\s*\n([\s\S]*?)(?:\n## |\s*$)/m);
  if (!tableMatch) {
    return 0;
  }

  const lines = tableMatch[1]
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.startsWith('|') && !line.includes(':---') && !line.includes('---'));

  return Math.max(0, lines.length - 1);
}

function ensureWorkspaceDirs() {
  if (!fs.existsSync(documentsDir)) {
    fs.mkdirSync(documentsDir, { recursive: true });
  }
}

function listLeadFiles() {
  if (!fs.existsSync(leadsDir)) {
    return [];
  }

  return fs.readdirSync(leadsDir, { withFileTypes: true })
    .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
    .map(entry => path.join(leadsDir, entry.name));
}

function readLeadFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  return {
    filePath,
    fileName: path.basename(filePath),
    content,
    metadata: parseLeadMetadata(content)
  };
}

export function getAllLeads() {
  return listLeadFiles()
    .map(readLeadFile)
    .map(({ filePath, fileName, metadata }) => ({
      fileName,
      path: filePath,
      refId: metadata.refId || '',
      fullName: metadata.fullName || path.basename(filePath, '.md'),
      status: metadata.status,
      customerType: metadata.customerType,
      createdDate: metadata.createdDate,
      memberCount: metadata.memberCount,
      mobile: metadata.mobile
    }))
    .filter(lead => lead.refId)
    .sort((a, b) => a.fullName.localeCompare(b.fullName));
}

function findLeadRecord(refId) {
  return listLeadFiles()
    .map(readLeadFile)
    .find(({ metadata }) => metadata.refId === refId);
}

export function getLeadByRefId(refId) {
  const leadRecord = findLeadRecord(refId);
  if (!leadRecord) {
    return null;
  }

  const { filePath, fileName, content, metadata } = leadRecord;
  const comments = extractComments(content);
  const documentFolder = findDocumentFolder(refId, metadata.fullName);
  const documents = listDocuments(documentFolder);

  return {
    refId: metadata.refId,
    fullName: metadata.fullName,
    status: metadata.status,
    customerType: metadata.customerType,
    createdDate: metadata.createdDate,
    mobile: metadata.mobile,
    email: metadata.email,
    nationality: metadata.nationality,
    gender: metadata.gender,
    dob: metadata.dob,
    memberCategory: metadata.memberCategory,
    advisor: metadata.advisor,
    memberCount: metadata.memberCount,
    fileName,
    filePath,
    comments,
    documentFolder,
    documents
  };
}

function extractComments(content) {
  const commentSection = content.split(/^## Comments\s*$/m)[1];
  if (!commentSection) {
    return [];
  }

  return commentSection
    .trim()
    .split(/^\n(?=\d{4}-\d{2}-\d{2}T)/m)
    .map(line => line.trim())
    .filter(Boolean);
}

function findDocumentFolder(refId, fullName) {
  ensureWorkspaceDirs();

  const existing = fs.readdirSync(documentsDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .find(dir => dir.name.includes(refId));

  if (existing) {
    return path.join(documentsDir, existing.name);
  }

  const folderName = `${refId}-${safeFolderName(fullName || refId)}`;
  const folderPath = path.join(documentsDir, folderName);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
}

function listDocuments(folderPath) {
  if (!folderPath || !fs.existsSync(folderPath)) {
    return [];
  }

  return fs.readdirSync(folderPath, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => ({
      name: entry.name,
      url: `/documents/${encodeURIComponent(path.relative(documentsDir, path.join(folderPath, entry.name)).replace(/\\/g, '/'))}`
    }));
}

export function getDocumentsForLead(refId) {
  const lead = getLeadByRefId(refId);
  if (!lead) {
    return [];
  }

  return listDocuments(lead.documentFolder);
}

export function appendComment(refId, commentText) {
  const lead = getLeadByRefId(refId);
  if (!lead) {
    throw new Error(`Lead not found for refId: ${refId}`);
  }

  const timestamp = new Date().toISOString();
  const commentBlock = `${timestamp} - ${commentText.trim()}`;
  const content = fs.readFileSync(lead.filePath, 'utf-8');

  let updated;
  if (/^## Comments\s*$/m.test(content)) {
    updated = content.replace(/^## Comments\s*$/m, `## Comments\n${commentBlock}\n`);
  } else if (/^## Lead Status\s*$/m.test(content)) {
    updated = content.replace(/^## Lead Status\s*$/m, `## Comments\n${commentBlock}\n\n## Lead Status`);
  } else if (/^## Payment Details\s*$/m.test(content)) {
    updated = content.replace(/^## Payment Details\s*$/m, `## Comments\n${commentBlock}\n\n## Payment Details`);
  } else {
    updated = `${content.trim()}\n\n## Comments\n${commentBlock}\n`;
  }

  fs.writeFileSync(lead.filePath, updated, 'utf-8');
  return getLeadByRefId(refId);
}

export function createDocumentFolder(refId) {
  const lead = getLeadByRefId(refId);
  if (!lead) {
    throw new Error(`Lead not found for refId: ${refId}`);
  }

  return lead.documentFolder;
}

function parseMarkdownTable(lines, startIndex) {
  const rows = [];
  const headerLine = lines[startIndex];
  const separatorLine = lines[startIndex + 1];

  if (!headerLine?.includes('|') || !separatorLine?.includes('|')) {
    return { rows, endIndex: startIndex };
  }

  const headers = headerLine
    .split('|')
    .map(cell => stripMarkdown(cell))
    .filter(Boolean);

  let index = startIndex + 2;
  while (index < lines.length && lines[index].trim().startsWith('|')) {
    const rawCells = lines[index]
      .split('|')
      .map(cell => stripMarkdown(cell))
      .filter((_, cellIndex, arr) => !(cellIndex === 0 && arr[0] === '') && !(cellIndex === arr.length - 1 && arr[arr.length - 1] === ''));

    const row = {};
    headers.forEach((header, headerIndex) => {
      row[header] = rawCells[headerIndex] || '';
    });

    rows.push(row);
    index += 1;
  }

  return { rows, endIndex: index - 1 };
}

function parsePendingTasks(lines, startIndex) {
  const tasks = [];
  let bucket = 'Today';

  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];

    if (line.startsWith('## ') && !line.includes('Pending Tasks')) {
      break;
    }

    if (line.startsWith('### ')) {
      bucket = stripMarkdown(line.replace(/^###\s+/, ''));
      continue;
    }

    const taskMatch = line.match(/^- \[( |x)\]\s+(.+)$/);
    if (!taskMatch) {
      continue;
    }

    const done = taskMatch[1].toLowerCase() === 'x';
    const text = stripMarkdown(taskMatch[2]);
    const refId = text.match(/HEA-[A-Z0-9]+/i)?.[0] || null;

    tasks.push({
      bucket,
      done,
      text,
      refId,
      priority: /priority|urgent|top priority/i.test(text)
    });
  }

  return tasks;
}

function findSectionTable(lines, sectionName) {
  for (let index = 0; index < lines.length; index += 1) {
    if (lines[index].startsWith('## ') && lines[index].includes(sectionName)) {
      for (let inner = index + 1; inner < lines.length; inner += 1) {
        if (lines[inner].trim().startsWith('|')) {
          return parseMarkdownTable(lines, inner).rows;
        }
        if (lines[inner].startsWith('## ')) {
          break;
        }
      }
    }
  }

  return [];
}

function parsePipeline() {
  if (!fs.existsSync(pipelinePath)) {
    return {
      productionSummary: [],
      newLeads: [],
      inProgress: [],
      paymentStage: [],
      booked: [],
      renewals: [],
      tasks: []
    };
  }

  const lines = fs.readFileSync(pipelinePath, 'utf-8').split(/\r?\n/);
  const productionSummary = findSectionTable(lines, 'Production Summary');
  const newLeads = findSectionTable(lines, 'New Leads');
  const inProgress = findSectionTable(lines, 'In Progress');
  const paymentStage = findSectionTable(lines, 'Application / Payment Stage');
  const booked = findSectionTable(lines, 'Policy Booked');
  const renewals = findSectionTable(lines, 'Renewals');

  const pendingTasksIndex = lines.findIndex(line => line.startsWith('## ') && line.includes('Pending Tasks'));
  const tasks = pendingTasksIndex >= 0 ? parsePendingTasks(lines, pendingTasksIndex) : [];

  return { productionSummary, newLeads, inProgress, paymentStage, booked, renewals, tasks };
}

export function getDashboardData() {
  const leads = getAllLeads();
  const pipeline = parsePipeline();
  const openTasks = pipeline.tasks.filter(task => !task.done);
  const urgentTasks = openTasks.filter(task => task.priority);

  return {
    stats: {
      totalLeadFiles: leads.length,
      newLeads: pipeline.newLeads.length,
      inProgress: pipeline.inProgress.length,
      paymentStage: pipeline.paymentStage.length,
      booked: pipeline.booked.length,
      renewals: pipeline.renewals.length,
      openTasks: openTasks.length,
      urgentTasks: urgentTasks.length
    },
    productionSummary: pipeline.productionSummary,
    queues: {
      newLeads: pipeline.newLeads.slice(0, 10),
      inProgress: pipeline.inProgress.slice(0, 10),
      paymentStage: pipeline.paymentStage.slice(0, 10),
      renewals: pipeline.renewals.slice(0, 8),
      tasks: openTasks.slice(0, 14),
      urgentTasks: urgentTasks.slice(0, 6)
    }
  };
}
