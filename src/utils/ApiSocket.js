// src/utils/ApiSocket.js

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://campushub4293.pythonanywhere.com";

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
  console.log("[API DEBUG] Response Status:", res.status);
  const data = await res.json().catch(() => ({}));
  console.log("[API DEBUG] Response Data:", data);

  if (res.status === 401) {
    console.warn("[API DEBUG] Session expired");
    window.dispatchEvent(new Event("auth:logout"));
    throw new Error("Session expired");
  }

  if (!res.ok) {
    const error = data?.error || `HTTP ${res.status}`;
    console.error("[API DEBUG] Error Response:", error);
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
  const method = (options.method || "GET").toUpperCase();
  const isFormData = options.isFormData || false;

  // ✅ Always read the CSRF token at request time
  const csrfToken = getCookie("csrf_token");
  console.log("[API DEBUG] CSRF Token at request:", csrfToken);

  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  // Attach CSRF header for mutating requests
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    if (csrfToken) {
      headers["X-CSRF-Token"] = csrfToken;
      console.log("[API DEBUG] CSRF Header Set");
    } else {
      console.warn("[API DEBUG] CSRF Token missing for mutating request!");
    }
  }

  const fetchOptions = {
    method,
    headers,
    credentials: "include", // 🔥 send cookies (JWT + CSRF)
    body:
      options.body &&
      !(isFormData && options.body instanceof FormData)
        ? JSON.stringify(options.body)
        : options.body,
  };

  console.log("[API DEBUG] Fetch Options:", fetchOptions);

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, fetchOptions);
    return await handleResponse(res);
  } catch (err) {
    console.error("[API ERROR]", err);
    throw err;
  }
}

// ================================
// Public API helpers
// ================================
export const ApiSocket = {
  get: (path, options = {}) => apiRequest(path, { method: "GET", ...options }),
  post: (path, body, options = {}) => apiRequest(path, { method: "POST", body, ...options }),
  put: (path, body, options = {}) => apiRequest(path, { method: "PUT", body, ...options }),
  patch: (path, body, options = {}) => apiRequest(path, { method: "PATCH", body, ...options }),
  delete: (path, body = null, options = {}) => apiRequest(path, { method: "DELETE", body, ...options }),
};

export default ApiSocket;



// // src/utils/ApiSocket.js

// const API_BASE_URL = import.meta.env.VITE_API_URL || "https://campushub4293.pythonanywhere.com";

// // ================================
// // Device ID handling
// // ================================
// function getOrCreateDeviceId() {
//   let deviceId = localStorage.getItem("device_id");

//   if (!deviceId) {
//     deviceId = crypto.randomUUID();
//     localStorage.setItem("device_id", deviceId);
//   }

//   return deviceId;
// }

// // ================================
// // CSRF token helper
// // ================================
// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// }

// // ================================
// // Unified response handler
// // ================================
// const handleResponse = async (res) => {
//   if (res.status === 401) {
//     // session expired or invalid
//     window.dispatchEvent(new Event("auth:logout"));
//     throw new Error("Session expired");
//   }

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     const error = data?.error || `HTTP ${res.status}`;
//     const e = new Error(error);
//     e.status = res.status;
//     e.data = data;
//     throw e;
//   }

//   return data;
// };

// // ================================
// // Core request wrapper (FETCH)
// // ================================
// async function apiRequest(path, options = {}) {
//   const deviceId = getOrCreateDeviceId();
//   const csrfToken = getCookie("csrf_token");

//   const method = (options.method || "GET").toUpperCase();

//   const headers = {
//     "Content-Type": "application/json",
//     // code 401 bug here below
//     // "X-Device-ID": deviceId,
//     ...(options.headers || {}),
//   };

//   if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
//     if (csrfToken) {
//       headers["X-CSRF-Token"] = csrfToken;
//     }
//   }

//   const fetchOptions = {
//     method,
//     headers,
//     credentials: "include", // 🔥 sends cookies (JWT, CSRF)
//   };

//   if (options.body) {
//     fetchOptions.body = options.body;
//   }

//   try {
//     const res = await fetch(`${API_BASE_URL}${path}`, fetchOptions);
//     return await handleResponse(res);
//   } catch (err) {
//     // ================================
//     // Global error logging
//     // ================================
//     console.error("[API ERROR]", err);
//     throw err;
//   }
// }

// // ================================
// // Public API helpers
// // ================================
// export const ApiSocket = {
//   get: (path) => apiRequest(path, { method: "GET" }),

//   post: (path, body) =>
//     apiRequest(path, {
//       method: "POST",
//       body: JSON.stringify(body),
//     }),

//   put: (path, body) =>
//     apiRequest(path, {
//       method: "PUT",
//       body: JSON.stringify(body),
//     }),

//   patch: (path, body) =>
//     apiRequest(path, {
//       method: "PATCH",
//       body: JSON.stringify(body),
//     }),

//   delete: (path, body = null) =>
//     apiRequest(path, {
//       method: "DELETE",
//       body: body ? JSON.stringify(body) : null,
//     }),
// };

// export default ApiSocket;
