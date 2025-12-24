import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export function ChatTab() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hello! I\'m your AI agriculture advisor. Ask me anything about crops, farming, weather, or growing conditions!',
            sender: 'ai',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await sendChatMessage(input);

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: 'ai',
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Sorry, I had trouble processing that. Please try again!',
                sender: 'ai',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestedQuestions = [
        'What crops grow best in tropical climates?',
        'How do I improve soil quality?',
        'When should I plant rice?',
        'What are drought-resistant crops?',
    ];

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>💬 AI Agriculture Advisor</h2>
                <p>Ask me anything about crops and farming</p>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message ${msg.sender === 'user' ? 'message-user' : 'message-ai'}`}
                    >
                        <div className="message-content">
                            {msg.text}
                        </div>
                        <div className="message-time">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="message message-ai">
                        <div className="message-content">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
                <div className="suggested-questions">
                    <p>Try asking:</p>
                    {suggestedQuestions.map((q, i) => (
                        <button
                            key={i}
                            onClick={() => setInput(q)}
                            className="suggestion-button"
                        >
                            {q}
                        </button>
                    ))}
                </div>
            )}

            <div className="chat-input-container">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about crops, weather, growing tips..."
                    className="chat-input"
                    rows={2}
                    disabled={loading}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="chat-send-button"
                >
                    {loading ? '...' : '→'}
                </button>
            </div>
        </div>
    );
}
