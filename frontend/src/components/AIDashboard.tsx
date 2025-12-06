import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Database, Brain, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import axios from 'axios';

interface DashboardData {
  overview: {
    totalRecommendations: number;
    totalWeatherQueries: number;
    recentWeatherQueries: number;
  };
  recommendationsByCrop: Array<{
    _id: string;
    count: number;
    avgSuitability: number;
    avgYield: number;
  }>;
  sustainabilityStats: Array<{
    _id: string;
    count: number;
  }>;
  recentRecommendations: any[];
  dailyRecommendations: Array<{
    _id: string;
    count: number;
  }>;
}

interface AIModel {
  _id: string;
  name: string;
  version: string;
  status: string;
  accuracy?: number;
  description?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function AIDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'analytics'>('overview');

  useEffect(() => {
    fetchDashboardData();
    fetchAIModels();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/analytics/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAIModels = async () => {
    try {
      const response = await axios.get('/api/ai-models');
      setAiModels(response.data);
    } catch (error) {
      console.error('Error fetching AI models:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block' }}
        >
          <Activity size={32} />
        </motion.div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        padding: '24px',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1 style={{ marginTop: 0, marginBottom: '24px', color: '#1976d2', fontSize: '32px' }}>
        AI Dashboard
      </h1>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {(['overview', 'models', 'analytics'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: activeTab === tab ? '#1976d2' : '#ffffff',
              color: activeTab === tab ? '#ffffff' : '#666',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? '600' : '400',
              textTransform: 'capitalize',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {tab}
          </motion.button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && dashboardData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              title="Total Recommendations"
              value={dashboardData.overview.totalRecommendations}
              icon={<Database size={24} />}
              trend="up"
            />
            <StatCard
              title="Weather Queries"
              value={dashboardData.overview.totalWeatherQueries}
              icon={<Activity size={24} />}
              trend="up"
            />
            <StatCard
              title="Recent Queries (7d)"
              value={dashboardData.overview.recentWeatherQueries}
              icon={<TrendingUp size={24} />}
              trend="up"
            />
            <StatCard
              title="AI Models"
              value={aiModels.length}
              icon={<Brain size={24} />}
              trend="neutral"
            />
          </div>

          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <ChartCard title="Recommendations by Crop">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dashboardData.recommendationsByCrop}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Sustainability Distribution">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.sustainabilityStats}
                    dataKey="count"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {dashboardData.sustainabilityStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Daily Recommendations Chart */}
          <ChartCard title="Daily Recommendations (Last 7 Days)">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.dailyRecommendations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      )}

      {/* AI Models Tab */}
      {activeTab === 'models' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ display: 'grid', gap: '16px' }}>
            {aiModels.map((model, index) => (
              <motion.div
                key={model._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  padding: '20px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', color: '#1976d2' }}>
                      {model.name} v{model.version}
                    </h3>
                    {model.description && (
                      <p style={{ margin: '0 0 12px 0', color: '#666' }}>{model.description}</p>
                    )}
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                      <StatusBadge status={model.status} />
                      {model.accuracy !== undefined && (
                        <span style={{ color: '#666' }}>
                          Accuracy: <strong>{model.accuracy.toFixed(2)}%</strong>
                        </span>
                      )}
                    </div>
                  </div>
                  <Brain size={32} color="#1976d2" />
                </div>
              </motion.div>
            ))}
            {aiModels.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                <Brain size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p>No AI models configured yet</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && dashboardData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ChartCard title="Crop Performance Metrics">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={dashboardData.recommendationsByCrop}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="avgSuitability" fill="#1976d2" name="Avg Suitability" />
                <Bar yAxisId="right" dataKey="avgYield" fill="#00C49F" name="Avg Yield Index" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </motion.div>
      )}
    </motion.div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string; value: number; icon: React.ReactNode; trend: 'up' | 'down' | 'neutral' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
        <div style={{ color: '#666', fontSize: '14px' }}>{title}</div>
        <div style={{ color: '#1976d2' }}>{icon}</div>
      </div>
      <div style={{ fontSize: '32px', fontWeight: '700', color: '#1976d2' }}>{value.toLocaleString()}</div>
      {trend !== 'neutral' && (
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend === 'up' ? (
            <TrendingUp size={16} color="#4caf50" />
          ) : (
            <TrendingDown size={16} color="#f44336" />
          )}
          <span style={{ fontSize: '12px', color: '#666' }}>Active</span>
        </div>
      )}
    </motion.div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', color: '#1976d2' }}>{title}</h3>
      {children}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: '#4caf50',
    training: '#ff9800',
    deprecated: '#f44336',
  };

  return (
    <span
      style={{
        padding: '4px 12px',
        borderRadius: '12px',
        backgroundColor: colors[status] + '20',
        color: colors[status],
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'capitalize',
      }}
    >
      {status}
    </span>
  );
}

