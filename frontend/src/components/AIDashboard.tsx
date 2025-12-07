import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Database, Brain, Send, MessageCircle, Sparkles, Loader2 } from 'lucide-react';
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

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedCrops?: Array<{ id: string; common_name: string; scientific_name: string }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const suggestedQuestions = [
  'What crops can I grow in tropical climates?',
  'Tell me about rice cultivation',
  'What vegetables are best for temperate regions?',
  'List popular spices and their uses',
  'Which fruits grow in subtropical areas?',
];

export function AIDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [aiModels, setAiModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'overview' | 'models' | 'analytics'>('chat');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `👋 Hello! I'm your AI Crop Advisor. I can help you with:\n\n• **Crop recommendations** - What crops to grow based on your climate\n• **Growing information** - How to cultivate specific crops\n• **Climate suitability** - Which crops suit tropical, temperate, or arid regions\n\nJust ask me anything about agriculture!`,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchAIModels();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim();
    if (!text) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await axios.post('/api/ai/chat', {
        message: text,
        history: messages.slice(-5).map(m => ({ role: m.role, content: m.content })),
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date(),
        relatedCrops: response.data.relatedCrops,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e0e0e0', backgroundColor: '#ffffff' }}>
        <h1 style={{ margin: 0, color: '#1976d2', fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Brain size={32} />
          AI Crop Advisor
        </h1>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '4px', padding: '16px 24px', backgroundColor: '#ffffff', borderBottom: '1px solid #e0e0e0' }}>
        {(['chat', 'overview', 'models', 'analytics'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: activeTab === tab ? '#1976d2' : '#f5f5f5',
              color: activeTab === tab ? '#ffffff' : '#666',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? '600' : '400',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
            }}
          >
            {tab === 'chat' && <MessageCircle size={18} />}
            {tab === 'overview' && <Activity size={18} />}
            {tab === 'models' && <Brain size={18} />}
            {tab === 'analytics' && <TrendingUp size={18} />}
            {tab === 'chat' ? 'AI Chat' : tab}
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflow: 'auto', padding: activeTab === 'chat' ? 0 : '24px' }}>
        {/* AI Chat Tab */}
        {activeTab === 'chat' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Messages Area */}
            <div style={{ flex: 1, overflow: 'auto', padding: '20px', backgroundColor: '#fafafa' }}>
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'flex',
                      justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                      marginBottom: '16px',
                    }}
                  >
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: '14px 18px',
                        borderRadius: message.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        backgroundColor: message.role === 'user' ? '#1976d2' : '#ffffff',
                        color: message.role === 'user' ? '#ffffff' : '#333',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      {message.role === 'assistant' && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: '#1976d2' }}>
                          <Sparkles size={16} />
                          <span style={{ fontWeight: '600', fontSize: '14px' }}>AI Advisor</span>
                        </div>
                      )}
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                        {message.content.split('**').map((part, i) =>
                          i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                        )}
                      </div>
                      {message.relatedCrops && message.relatedCrops.length > 0 && (
                        <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e0e0e0' }}>
                          <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>Related Crops:</div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {message.relatedCrops.map(crop => (
                              <span
                                key={crop.id}
                                style={{
                                  padding: '4px 10px',
                                  backgroundColor: '#e3f2fd',
                                  color: '#1976d2',
                                  borderRadius: '12px',
                                  fontSize: '12px',
                                  fontWeight: '500',
                                }}
                              >
                                {crop.common_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666' }}
                >
                  <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                  <span>AI is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length <= 2 && (
              <div style={{ padding: '12px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '10px' }}>Try asking:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {suggestedQuestions.map((q, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSendMessage(q)}
                      style={{
                        padding: '8px 14px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '20px',
                        backgroundColor: '#ffffff',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div style={{ padding: '16px 20px', backgroundColor: '#ffffff', borderTop: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about crops, growing conditions, or recommendations..."
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '24px',
                    resize: 'none',
                    fontSize: '15px',
                    lineHeight: '1.4',
                    minHeight: '50px',
                    maxHeight: '120px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  rows={1}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping}
                  style={{
                    width: '50px',
                    height: '50px',
                    border: 'none',
                    borderRadius: '50%',
                    backgroundColor: inputMessage.trim() ? '#1976d2' : '#e0e0e0',
                    color: '#ffffff',
                    cursor: inputMessage.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && dashboardData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <StatCard title="Total Recommendations" value={dashboardData.overview.totalRecommendations} icon={<Database size={24} />} trend="up" />
              <StatCard title="Weather Queries" value={dashboardData.overview.totalWeatherQueries} icon={<Activity size={24} />} trend="up" />
              <StatCard title="Recent Queries (7d)" value={dashboardData.overview.recentWeatherQueries} icon={<TrendingUp size={24} />} trend="up" />
              <StatCard title="AI Models" value={aiModels.length} icon={<Brain size={24} />} trend="neutral" />
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
                    <Pie data={dashboardData.sustainabilityStats} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={100} label>
                      {dashboardData.sustainabilityStats.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </motion.div>
        )}

        {/* Models Tab */}
        {activeTab === 'models' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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
                      {model.description && <p style={{ margin: '0 0 12px 0', color: '#666' }}>{model.description}</p>}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
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
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon, trend }: { title: string; value: number; icon: React.ReactNode; trend: 'up' | 'down' | 'neutral' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
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
          {trend === 'up' ? <TrendingUp size={16} color="#4caf50" /> : <TrendingDown size={16} color="#f44336" />}
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
