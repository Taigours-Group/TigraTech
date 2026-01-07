const API_BASE = '/api';

export const dbService = {
  // ---------------- Projects ----------------
  getProjects: async () => {
    try {
      const response = await fetch(`${API_BASE}/projects`);
      if (!response.ok) {
        console.error("Failed to fetch projects, status:", response.status);
        return [];
      }
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error("Failed to fetch projects", e);
      return [];
    }
  },

  saveProject: async (project) => {
    try {
      if (!project.id) project.id = Date.now().toString();
      else project.id = project.id.toString();

      const response = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });

      if (!response.ok) {
        console.error("Failed to save project, status:", response.status);
        return null;
      }

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!data?.success) {
        console.error("Failed to save project:", data);
        return null;
      }

      return data.data || null;
    } catch (e) {
      console.error("Failed to save project", e);
      return null;
    }
  },

  deleteProject: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      if (!response.ok) console.error("Failed to delete project, status:", response.status);
    } catch (e) {
      console.error("Failed to delete project", e);
    }
  },

  // ---------------- Blogs ----------------
  getBlogs: async () => {
    try {
      const response = await fetch(`${API_BASE}/blogs`);
      if (!response.ok) return [];
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error("Failed to fetch blogs", e);
      return [];
    }
  },

  saveBlog: async (blog) => {
    try {
      if (!blog.id) blog.id = Date.now().toString();
      else blog.id = blog.id.toString();

      const response = await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      });

      if (!response.ok) return null;
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!data?.success) return null;
      return data.data || null;
    } catch (e) {
      console.error("Failed to save blog", e);
      return null;
    }
  },

  deleteBlog: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE' });
      if (!response.ok) console.error("Failed to delete blog, status:", response.status);
    } catch (e) {
      console.error("Failed to delete blog", e);
    }
  },

  // ---------------- Services ----------------
  getServices: async () => {
    try {
      const response = await fetch(`${API_BASE}/services`);
      if (!response.ok) return [];
      const text = await response.text();
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error("Failed to fetch services", e);
      return [];
    }
  },

  saveService: async (service) => {
    try {
      if (!service.id) service.id = Date.now().toString();
      else service.id = service.id.toString();

      const response = await fetch(`${API_BASE}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service),
      });

      if (!response.ok) return null;
      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (!data?.success) return null;
      return data.data || null;
    } catch (e) {
      console.error("Failed to save service", e);
      return null;
    }
  },

  deleteService: async (id) => {
    try {
      const response = await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
      if (!response.ok) console.error("Failed to delete service, status:", response.status);
    } catch (e) {
      console.error("Failed to delete service", e);
    }
  },

  // ---------------- Authentication ----------------
  login: async (username, password) => {
    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) return false;

      const text = await response.text();
      const data = text ? JSON.parse(text) : null;

      if (data?.success) {
        localStorage.setItem('tt_auth_token', data.token);
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login failed", e);
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('tt_auth_token');
  },

  isAuthenticated: () => !!localStorage.getItem('tt_auth_token'),
};
