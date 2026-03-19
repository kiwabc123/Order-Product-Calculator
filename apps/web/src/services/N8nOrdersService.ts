/**
 * N8n Orders Service - Fetches order data from n8n API endpoint
 */

export interface OrderRecord {
  name: string;
  price: number;
  quantity: number;
  discount: number;
  total: number;
  timestamp: string;
}

class N8nOrdersService {
  /**
   * Fetch all orders from n8n GET /orders endpoint
   */
  static async fetchOrders(): Promise<OrderRecord[]> {
    try {
      const baseUrl = import.meta.env.REACT_APP_N8N_URL || 'http://localhost:5678';
      const response = await fetch(`${baseUrl}/webhook/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(`Failed to fetch orders: ${response.status}`);
        return this.getMockData();
      }

      const data = await response.json();

      // Parse response from n8n
      if (data.success && Array.isArray(data.data)) {
        return data.data
          .slice(1) // Skip header row
          .map((row: any) => ({
            name: row.json?.name || row[0] || '',
            price: parseFloat(row.json?.price || row[1]) || 0,
            quantity: parseInt(row.json?.quantity || row[2]) || 0,
            discount: parseFloat(row.json?.discount || row[3]) || 0,
            total: parseFloat(row.json?.total || row[4]) || 0,
            timestamp: row.json?.timestamp || row[5] || new Date().toISOString(),
          }));
      }

      return this.getMockData();
    } catch (error) {
      console.error('Error fetching orders from n8n:', error);
      return this.getMockData();
    }
  }

  /**
   * Mock data for development/testing
   */
  static getMockData(): OrderRecord[] {
    return [
      {
        name: 'Orange',
        price: 228,
        quantity: 2,
        discount: 12,
        total: 228,
        timestamp: '2026-03-10T05:40:43.590-04:00',
      },
      {
        name: 'Purple',
        price: 90,
        quantity: 2,
        discount: 6.206896552,
        total: 173.7931034,
        timestamp: '2026-03-10T05:44:54.033-04:00',
      },
    ];
  }
}

export { N8nOrdersService };
