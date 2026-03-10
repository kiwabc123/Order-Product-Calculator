import { useEffect, useState } from 'react';
import { N8nOrdersService, type OrderRecord } from '../services/N8nOrdersService';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
  const [records, setRecords] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await N8nOrdersService.fetchOrders();
      setRecords(data);
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load orders';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate summary statistics
  const totalRevenue = records.reduce((sum, record) => sum + record.total, 0);
  const totalOrders = records.length;
  const totalQuantity = records.reduce((sum, record) => sum + record.quantity, 0);
  const totalDiscount = records.reduce((sum, record) => sum + record.discount, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Get top items
  const itemStats: Record<string, { count: number; revenue: number }> = {};
  records.forEach((record) => {
    if (!itemStats[record.name]) {
      itemStats[record.name] = { count: 0, revenue: 0 };
    }
    itemStats[record.name].count += record.quantity;
    itemStats[record.name].revenue += record.total;
  });

  const topItems = Object.entries(itemStats)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5);

  return (
    <div className="analytics-page">
      <header className="analytics-header">
        <h2>📊 Order Analytics Dashboard</h2>
        <p>Real-time analytics from n8n workflow</p>
      </header>

      {error && (
        <div className="alert alert-error">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="card-icon">💰</div>
              <div className="card-content">
                <div className="card-value">${totalRevenue.toFixed(2)}</div>
                <div className="card-label">Total Revenue</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">📦</div>
              <div className="card-content">
                <div className="card-value">{totalOrders}</div>
                <div className="card-label">Total Orders</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">🛒</div>
              <div className="card-content">
                <div className="card-value">{totalQuantity}</div>
                <div className="card-label">Items Sold</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">🎁</div>
              <div className="card-content">
                <div className="card-value">-${totalDiscount.toFixed(2)}</div>
                <div className="card-label">Total Discounts</div>
              </div>
            </div>

            <div className="summary-card">
              <div className="card-icon">📈</div>
              <div className="card-content">
                <div className="card-value">${averageOrderValue.toFixed(2)}</div>
                <div className="card-label">Average Order</div>
              </div>
            </div>
          </div>

          {/* Top Items */}
          {topItems.length > 0 && (
            <div className="top-items-container">
              <h3>🏆 Top Selling Items</h3>
              <div className="top-items-grid">
                {topItems.map(([itemName, stats]) => (
                  <div key={itemName} className="top-item-card">
                    <div className="item-name">{itemName}</div>
                    <div className="item-stat">
                      <span className="stat-label">Qty:</span>
                      <span className="stat-value">{stats.count}</span>
                    </div>
                    <div className="item-stat">
                      <span className="stat-label">Revenue:</span>
                      <span className="stat-value">${stats.revenue.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Data Table */}
          <div className="table-container">
            <div className="table-header">
              <h3>Order Details</h3>
              <button className="refresh-btn" onClick={fetchData} disabled={loading}>
                🔄 Refresh
              </button>
            </div>
            {records.length === 0 ? (
              <div className="empty-state">
                <p>📭 No orders yet</p>
                <small>Orders will appear here when placed through the app</small>
              </div>
            ) : (
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="table-row">
                      <td className="name-cell">{record.name}</td>
                      <td className="price-cell">${record.price.toFixed(2)}</td>
                      <td className="qty-cell">{record.quantity}</td>
                      <td className="discount-cell">-${record.discount.toFixed(2)}</td>
                      <td className="total-cell">
                        <strong>${record.total.toFixed(2)}</strong>
                      </td>
                      <td className="timestamp-cell">
                        {new Date(record.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="footer-row">
                    <td colSpan={2}>
                      <strong>TOTAL</strong>
                    </td>
                    <td>
                      <strong>{totalQuantity}</strong>
                    </td>
                    <td>
                      <strong>-${totalDiscount.toFixed(2)}</strong>
                    </td>
                    <td>
                      <strong>${totalRevenue.toFixed(2)}</strong>
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>

          {lastRefresh && (
            <div className="refresh-info">
              Last refreshed: {lastRefresh.toLocaleTimeString()}
            </div>
          )}
        </>
      )}
    </div>
  );
}
