import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import {
  getAllLeads,
  getLeadByRefId,
  appendComment,
  createDocumentFolder,
  getDocumentsForLead,
  getDashboardData
} from './lib/leadStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;
const rootDir = path.resolve(__dirname, '..');
const documentsDir = path.join(rootDir, 'Workspace', 'Documents');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/documents', express.static(documentsDir, { index: false }));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    try {
      const folder = createDocumentFolder(req.params.refId);
      callback(null, folder);
    } catch (error) {
      callback(error);
    }
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage });

app.get('/api/leads', (req, res) => {
  const leads = getAllLeads();
  res.json(leads);
});

app.get('/api/dashboard', (req, res) => {
  res.json(getDashboardData());
});

app.get('/api/leads/:refId', (req, res) => {
  const lead = getLeadByRefId(req.params.refId);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }
  res.json(lead);
});

app.post('/api/leads/:refId/comments', (req, res) => {
  const { comment } = req.body;
  if (!comment || !comment.trim()) {
    return res.status(400).json({ error: 'Comment text is required' });
  }

  try {
    const updatedLead = appendComment(req.params.refId, comment);
    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leads/:refId/documents', upload.single('document'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Document file is required' });
  }

  const { comment } = req.body;
  if (comment && comment.trim()) {
    try {
      appendComment(req.params.refId, `Uploaded document: ${req.file.originalname}. ${comment}`);
    } catch (error) {
      console.error('Failed to append upload comment:', error.message);
    }
  }

  const lead = getLeadByRefId(req.params.refId);
  if (!lead) {
    return res.status(404).json({ error: 'Lead not found after upload' });
  }

  const documents = getDocumentsForLead(req.params.refId);
  res.json({ lead, documents });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.listen(PORT, () => {
  console.log(`Dashboard available at http://localhost:${PORT}`);
});
