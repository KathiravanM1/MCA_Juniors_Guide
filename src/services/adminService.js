const API_BASE_URL = 'http://localhost:5002/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

export const adminService = {
  // Get pending senior approvals
  getPendingSeniors: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/pending-seniors`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending seniors');
      }

      const data = await response.json();
      return { success: true, data: data.pendingSeniors };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Approve senior user
  approveSenior: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/approve-senior/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to approve senior');
      }

      const data = await response.json();
      return { success: true, data: data.user, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Reject senior user
  rejectSenior: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/reject-senior/${userId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to reject senior');
      }

      const data = await response.json();
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/admin/users`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      return { success: true, data: data.users };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};