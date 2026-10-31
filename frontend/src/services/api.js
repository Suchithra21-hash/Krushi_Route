
const API_BASE_URL = 'http://127.0.0.1:8001';

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `API error: ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

// CROPS
export const getCrops = () => apiRequest('/crops');

export const addCrop = (data) =>
  apiRequest('/crops', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ENQUIRIES
export const getEnquiries = () => apiRequest('/enquiries');

export const createEnquiry = (data) =>
  apiRequest('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const updateEnquiryStatus = (id, status) =>
  apiRequest(`/enquiries/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

// ORDERS
export const getOrders = () => apiRequest('/orders');

export const updateOrderStatus = (id, status) =>
  apiRequest(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export { API_BASE_URL };
export const sendEnquiry = (data) =>
  apiRequest('/enquiries', {
    method: 'POST',
    body: JSON.stringify(data),
  });