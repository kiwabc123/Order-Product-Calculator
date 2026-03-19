/**
 * N8n Service - Handles integration with n8n workflows
 * Communicates with n8n running on localhost:5678
 */

export interface N8nResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface OrderAnalyticsPayload {
  name: string;
  price: number;
  quantity?: number;
  discount?: number;
  total?: number;
  timestamp?: string;
}

const N8N_BASE_URL = import.meta.env.REACT_APP_N8N_URL || 'http://localhost:5678';

class N8nService {
  /**
   * Send order data to n8n analytics webhook
   */
  static async sendOrderAnalytics(
    payload: OrderAnalyticsPayload
  ): Promise<N8nResponse> {
    try {
      const response = await fetch(
        `${N8N_BASE_URL}/webhook/order-analytics`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            timestamp: payload.timestamp || new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error('N8n Analytics Error:', errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Generic webhook caller for any n8n webhook
   */
  static async callWebhook<T = unknown>(
    webhookPath: string,
    payload: unknown
  ): Promise<N8nResponse<T>> {
    try {
      const response = await fetch(`${N8N_BASE_URL}/webhook/${webhookPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: data as T,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      console.error(`N8n Webhook Error (${webhookPath}):`, errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Check if n8n service is available
   */
  static async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(N8N_BASE_URL, {
        method: 'GET',
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}

export { N8nService };
