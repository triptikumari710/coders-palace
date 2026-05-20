const BASE = 'http://localhost:4000/api';

// ── Token helpers ────────────────────────────────────────────
export function getUserToken()  { return localStorage.getItem('cp_user_token'); }
export function getAdminToken() { return localStorage.getItem('cp_admin_token'); }

function userHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getUserToken()}` };
}
function adminHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getAdminToken()}` };
}

// ── User auth ────────────────────────────────────────────────
export async function userSignup(name: string, email: string, password: string, phone?: string) {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Signup failed');
  localStorage.setItem('cp_user_token', data.token);
  localStorage.setItem('cp_user', JSON.stringify(data.user));
  return data;
}

export async function userLogin(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  localStorage.setItem('cp_user_token', data.token);
  localStorage.setItem('cp_user', JSON.stringify(data.user));
  return data;
}

export function userLogout() {
  localStorage.removeItem('cp_user_token');
  localStorage.removeItem('cp_user');
}

export function getStoredUser() {
  const u = localStorage.getItem('cp_user');
  return u ? JSON.parse(u) : null;
}

export function isUserLoggedIn() { return !!getUserToken(); }

// ── Contact / requests ───────────────────────────────────────
export async function submitContact(data: { service?: string; message: string }) {
  const res = await fetch(`${BASE}/contact`, {
    method: 'POST',
    headers: userHeaders(),
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed to submit');
  return json;
}

export async function getMyRequests() {
  const res = await fetch(`${BASE}/my-requests`, { headers: userHeaders() });
  if (!res.ok) throw new Error('Failed to load');
  return res.json();
}

// ── Admin auth ───────────────────────────────────────────────
export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Invalid credentials');
  localStorage.setItem('cp_admin_token', data.token);
  return data;
}

export function adminLogout() { localStorage.removeItem('cp_admin_token'); }
export function isLoggedIn()  { return !!getAdminToken(); }

// ── Admin requests ───────────────────────────────────────────
export async function getRequests(status?: string, search?: string) {
  const params = new URLSearchParams();
  if (status) params.set('status', status);
  if (search) params.set('search', search);
  const res = await fetch(`${BASE}/admin/requests?${params}`, { headers: adminHeaders() });
  if (res.status === 401) throw new Error('Unauthorized');
  return res.json();
}

export async function getStats() {
  const res = await fetch(`${BASE}/admin/stats`, { headers: adminHeaders() });
  if (res.status === 401) throw new Error('Unauthorized');
  return res.json();
}

export async function updateRequest(id: string, data: { status?: string; adminNote?: string }) {
  const res = await fetch(`${BASE}/admin/requests/${id}`, {
    method: 'PATCH', headers: adminHeaders(), body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteRequest(id: string) {
  const res = await fetch(`${BASE}/admin/requests/${id}`, {
    method: 'DELETE', headers: adminHeaders(),
  });
  return res.json();
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${BASE}/admin/change-password`, {
    method: 'POST', headers: adminHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) throw new Error('Wrong current password');
  return res.json();
}

// ── Projects ─────────────────────────────────────────────────
export async function getProjects() {
  const res = await fetch(`${BASE}/projects`);
  return res.json();
}

export async function createProject(data: object) {
  const res = await fetch(`${BASE}/admin/projects`, {
    method: 'POST', headers: adminHeaders(), body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Failed');
  return json;
}

export async function updateProject(id: string, data: object) {
  const res = await fetch(`${BASE}/admin/projects/${id}`, {
    method: 'PATCH', headers: adminHeaders(), body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteProject(id: string) {
  const res = await fetch(`${BASE}/admin/projects/${id}`, {
    method: 'DELETE', headers: adminHeaders(),
  });
  return res.json();
}

export async function analyzeRepo(repoUrl: string) {
  const res = await fetch(`${BASE}/admin/projects/analyze`, {
    method: 'POST', headers: adminHeaders(), body: JSON.stringify({ repoUrl }),
  });
  if (res.status === 401) {
    adminLogout();
    window.location.href = '/admin/login';
    throw new Error('Session expired — please log in again');
  }
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Analysis failed');
  return json;
}
