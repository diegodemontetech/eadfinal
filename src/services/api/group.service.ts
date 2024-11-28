import api from './config';

export const groupService = {
  async getAllGroups() {
    const response = await api.get('/groups');
    return response.data;
  },

  async getGroupById(id: string) {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  async createGroup(data: any) {
    const response = await api.post('/groups', data);
    return response.data;
  },

  async updateGroup(id: string, data: any) {
    const response = await api.put(`/groups/${id}`, data);
    return response.data;
  },

  async deleteGroup(id: string) {
    const response = await api.delete(`/groups/${id}`);
    return response.data;
  }
};