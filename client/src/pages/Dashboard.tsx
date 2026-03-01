import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, AlertCircle, CheckCircle, Zap, Activity } from 'lucide-react';

// Mock data for transaction trends
const transactionTrendData = [
  { date: 'Mon', volume: 45000, successful: 43200, failed: 1800 },
  { date: 'Tue', volume: 52000, successful: 49920, failed: 2080 },
  { date: 'Wed', volume: 48000, successful: 46080, failed: 1920 },
  { date: 'Thu', volume: 61000, successful: 58560, failed: 2440 },
  { date: 'Fri', volume: 75000, successful: 72000, failed: 3000 },
  { date: 'Sat', volume: 68000, successful: 65280, failed: 2720 },
  { date: 'Sun', volume: 55000, successful: 52800, failed: 2200 },
];

// Mock data for gateway health
const gatewayHealthData = [
  { name: 'Stripe', uptime: 99.98, latency: 145, transactions: 125000 },
  { name: 'Adyen', uptime: 99.95, latency: 156, transactions: 98000 },
  { name: 'PayPal', uptime: 99.92, latency: 178, transactions: 65000 },
  { name: 'Square', uptime: 99.88, latency: 192, transactions: 42000 },
];

// Mock data for recent transactions
const recentTransactions = [
  { id: 'TXN001', account: 'Acme Corp', amount: '$2,450.00', status: 'success', time: '2 min ago' },
  { id: 'TXN002', account: 'Tech Startup Inc', amount: '$1,890.50', status: 'success', time: '5 min ago' },
  { id: 'TXN003', account: 'Global Services', amount: '$3,200.00', status: 'success', time: '8 min ago' },
  { id: 'TXN004', account: 'Innovation Labs', amount: '$890.25', status: 'pending', time: '12 min ago' },
  { id: 'TXN005', account: 'Digital Solutions', amount: '$5,600.00', status: 'success', time: '15 min ago' },
];

// Mock data for subscription status
const subscriptionData = [
  { name: 'Active', value: 1250, fill: '#10b981' },
  { name: 'Trialing', value: 340, fill: '#3b82f6' },
  { name: 'Past Due', value: 85, fill: '#f97316' },
  { name: 'Canceled', value: 125, fill: '#ef4444' },
];

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalVolume: '$2.5M',
    successRate: '98.4%',
    activeSubscriptions: '1,250',
    avgLatency: '162ms',
  });

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        totalVolume: `$${(Math.random() * 3 + 2).toFixed(1)}M`,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-transparent border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of payment transactions and gateway health</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Transaction Volume */}
          <div className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label">Total Volume (24h)</p>
                <p className="metric-value font-bold">{metrics.totalVolume}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-sm text-success mt-4 font-medium">↑ 12.5% from yesterday</p>
          </div>

          {/* Success Rate */}
          <div className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label">Success Rate</p>
                <p className="metric-value font-bold">{metrics.successRate}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">12,450 successful transactions</p>
          </div>

          {/* Active Subscriptions */}
          <div className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label">Active Subscriptions</p>
                <p className="metric-value font-bold">{metrics.activeSubscriptions}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Recurring revenue: $125K/mo</p>
          </div>

          {/* Average Latency */}
          <div className="kpi-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="metric-label">Avg Latency</p>
                <p className="metric-value font-bold">{metrics.avgLatency}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Across all gateways</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Transaction Trends */}
          <div className="lg:col-span-2 kpi-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Transaction Trends (7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                  formatter={(value: any) => `$${((value as number) / 1000).toFixed(0)}K`}
                />
                <Legend />
                <Line type="monotone" dataKey="volume" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Total Volume" />
                <Line type="monotone" dataKey="successful" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} name="Successful" />
                <Line type="monotone" dataKey="failed" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} name="Failed" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Subscription Status */}
          <div className="kpi-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Subscription Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {subscriptionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} subs`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 text-sm">
              {subscriptionData.map((item) => (
                <div key={item.name} className="flex justify-between items-center">
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gateway Health & Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gateway Health */}
          <div className="kpi-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Gateway Health Status</h2>
            <div className="space-y-4">
              {gatewayHealthData.map((gateway) => (
                <div key={gateway.name} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-foreground">{gateway.name}</span>
                      <span className="status-badge success">
                        <CheckCircle className="w-4 h-4" />
                        {gateway.uptime}%
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>Latency: {gateway.latency}ms</span>
                      <span>Transactions: {((gateway.transactions as number) / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="kpi-card">
            <h2 className="text-xl font-bold text-foreground mb-6">Recent Transactions</h2>
            <div className="space-y-3">
              {recentTransactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-sm">{tx.id}</span>
                      <span className={`status-badge ${tx.status}`}>
                        {tx.status === 'success' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{tx.account}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
