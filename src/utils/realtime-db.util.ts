import { db } from '@/integrations/thrid-party/firebase.third';

class RealtimeDb {
  async insert(path: string, data: Record<string, any>) {
    try {
      const newRef = db.ref(path).push();
      await newRef.set(data);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  }

  async update(path: string, data: Record<string, any>) {
    try {
      await db.ref(path).update(data);
      console.log('Data updated successfully at path:', path);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async delete(path: string) {
    try {
      await db.ref(path).remove();
      console.log('Data deleted successfully at path:', path);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
}

export default new RealtimeDb();
