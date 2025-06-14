const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const DATA_PATH = path.join(__dirname, 'src', 'lib', 'data.json');

app.use(cors());
app.use(express.json());

// TEAM ENDPOINTS
app.get('/api/team', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  res.json(data.team);
});
app.post('/api/team', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = Date.now();
  const member = { ...req.body, id };
  data.team.push(member);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(member);
});
app.put('/api/team/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  const idx = data.team.findIndex(m => m.id === id);
  if (idx !== -1) {
    data.team[idx] = { ...req.body, id };
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.json(data.team[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
app.delete('/api/team/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  data.team = data.team.filter(m => m.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// FAQ ENDPOINTS
app.get('/api/faqs', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  res.json(data.faqs);
});
app.post('/api/faqs', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = Date.now();
  const faq = { ...req.body, id };
  data.faqs.push(faq);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(faq);
});
app.put('/api/faqs/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  const idx = data.faqs.findIndex(f => f.id === id);
  if (idx !== -1) {
    data.faqs[idx] = { ...req.body, id };
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.json(data.faqs[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
app.delete('/api/faqs/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  data.faqs = data.faqs.filter(f => f.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// PROJECTS ENDPOINTS
app.get('/api/projects', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  res.json(data.projects);
});
app.post('/api/projects', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = Date.now();
  const project = { ...req.body, id };
  data.projects.push(project);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json(project);
});
app.put('/api/projects/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  const idx = data.projects.findIndex(p => p.id === id);
  if (idx !== -1) {
    data.projects[idx] = { ...req.body, id };
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    res.json(data.projects[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});
app.delete('/api/projects/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  const id = parseInt(req.params.id, 10);
  data.projects = data.projects.filter(p => p.id !== id);
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});