// src/utils/ApiSocket.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://192.168.100.2:5000";

// ================================
// Device ID handling
// ================================
function getOrCreateDeviceId() {
  let deviceId = localStorage.getItem("device_id");

  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem("device_id", deviceId);
  }

  return deviceId;
}

// ================================
// CSRF token helper
// ================================
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// ================================
// Unified response handler
// ================================
const handleResponse = async (res) => {
  if (res.status === 401) {
    // session expired or invalid
    window.dispatchEvent(new Event("auth:logout"));
    throw new Error("Session expired");
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = data?.error || `HTTP ${res.status}`;
    const e = new Error(error);
    e.status = res.status;
    e.data = data;
    throw e;
  }

  return data;
};

// ================================
// Core request wrapper (FETCH)
// ================================
async function apiRequest(path, options = {}) {
  const deviceId = getOrCreateDeviceId();
  const csrfToken = getCookie("csrf_token");

  const method = (options.method || "GET").toUpperCase();

  const headers = {
    "Content-Type": "application/json",
    "X-Device-ID": deviceId,
    ...(options.headers || {}),
  };

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
    }
  }

  const fetchOptions = {
    method,
    headers,
    credentials: "include", // 🔥 sends cookies (JWT, CSRF)
  };

  if (options.body) {
    fetchOptions.body = options.body;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, fetchOptions);
    return await handleResponse(res);
  } catch (err) {
    // ================================
    // Global error logging
    // ================================
    console.error("[API ERROR]", err);
    throw err;
  }
}

// ================================
// Public API helpers
// ================================
export const ApiSocket = {
  get: (path) => apiRequest(path, { method: "GET" }),

  post: (path, body) =>
    apiRequest(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: (path, body) =>
    apiRequest(path, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  patch: (path, body) =>
    apiRequest(path, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  delete: (path, body = null) =>
    apiRequest(path, {
      method: "DELETE",
      body: body ? JSON.stringify(body) : null,
    }),
};

export default ApiSocket;
