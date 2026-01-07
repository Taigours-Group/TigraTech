import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Setup ---
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// --- Express Setup ---
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// --- Allowed columns mapping ---
const tableColumns = {
  projects: ['id','title','description','techStack','imageUrl','featured','liveUrl','repoUrl'],
  blogs: ['id','title','excerpt','content','date','author','imageUrl'],
  services: ['id','title','description','icon','category']
};

// --- Generic CRUD ---
const createCrudEndpoints = (entityName) => {

  // GET ALL
  app.get(`/api/${entityName}`, async (req, res) => {
    try {
      const { data, error } = await supabase
        .from(entityName)
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(`[ERROR] GET ${entityName}:`, error);
        return res.status(500).json({ error: error.message });
      }

      res.json(data || []); // always return array
    } catch (err) {
      console.error(`[ERROR] GET ${entityName} server error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // CREATE / UPDATE
  app.post(`/api/${entityName}`, async (req, res) => {
    try {
      const item = req.body;

      if (!item.id) item.id = Date.now().toString();
      else item.id = item.id.toString();

      // Keep only allowed columns
      const filteredItem = {};
      for (const col of tableColumns[entityName]) {
        if (item[col] !== undefined) filteredItem[col] = item[col];
      }

      const { data, error } = await supabase
        .from(entityName)
        .upsert([filteredItem], { onConflict: ['id'] })
        .select();

      if (error) {
        console.error(`[ERROR] ${entityName} upsert failed:`, error);
        return res.status(500).json({ error: error.message, details: error });
      }

      res.json({ success: true, data: data[0] || null });
    } catch (err) {
      console.error(`[ERROR] POST ${entityName} server error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // DELETE
  app.delete(`/api/${entityName}/:id`, async (req, res) => {
    try {
      const { error } = await supabase
        .from(entityName)
        .delete()
        .eq('id', req.params.id);

      if (error) {
        console.error(`[ERROR] DELETE ${entityName}:`, error);
        return res.status(500).json({ error: error.message });
      }

      res.json({ success: true });
    } catch (err) {
      console.error(`[ERROR] DELETE ${entityName} server error:`, err);
      res.status(500).json({ error: 'Server error' });
    }
  });
};

// --- Register endpoints ---
createCrudEndpoints('projects');
createCrudEndpoints('blogs');
createCrudEndpoints('services');

// --- Admin login ---
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.USERNAME_KEY && password === process.env.PASSWORD_KEY) {
    return res.json({ success: true, token: 'simulated-jwt-token-2026', user: { name: 'Admin' } });
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// --- Start server ---
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));