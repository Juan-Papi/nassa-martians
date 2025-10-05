// ORLP AI Integration - Gemini AI API integration for predictions and assistance

class ORLPAI {
    constructor() {
        this.apiKey = null;
        this.isInitialized = false;
        this.chatHistory = [];
        this.maxHistoryLength = 50;
        this.isProcessing = false;
        
        // AI configuration
        this.config = {
            model: 'gemini-pro',
            temperature: 0.7,
            maxTokens: 1000,
            safetySettings: [
                {
                    category: 'HARM_CATEGORY_HARASSMENT',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    category: 'HARM_CATEGORY_HATE_SPEECH',
                    threshold: 'BLOCK_MEDIUM_AND_ABOVE'
                }
            ]
        };
        
        this.init();
    }

    init() {
        // For demo purposes, we'll simulate AI responses
        // In production, you would initialize with actual Gemini API key
        this.apiKey = this.getAPIKey();
        this.isInitialized = true;
        
        this.setupEventListeners();
        this.loadChatHistory();
    }

    getAPIKey() {
        // In production, this would come from environment variables or secure storage
        // For demo, we'll use a placeholder
        return 'demo-api-key-gemini-pro';
    }

    setupEventListeners() {
        // AI Chat modal
        const askAIBtn = document.getElementById('askAI');
        const aiModal = document.getElementById('aiModal');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendMessage');
        const chatMessages = document.getElementById('chatMessages');

        if (askAIBtn) {
            askAIBtn.addEventListener('click', () => {
                ORLPUtils.showModal('aiModal');
            });
        }

        // Close modal
        const modalClose = aiModal?.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                ORLPUtils.hideModal('aiModal');
            });
        }

        // Send message
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Enter key to send
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }

        // Close modal on backdrop click
        if (aiModal) {
            aiModal.addEventListener('click', (e) => {
                if (e.target === aiModal) {
                    ORLPUtils.hideModal('aiModal');
                }
            });
        }
    }

    loadChatHistory() {
        const savedHistory = ORLPUtils.loadFromStorage('orlp_chat_history', []);
        this.chatHistory = savedHistory;
        this.displayChatHistory();
    }

    saveChatHistory() {
        ORLPUtils.saveToStorage('orlp_chat_history', this.chatHistory.slice(-this.maxHistoryLength));
    }

    displayChatHistory() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        chatMessages.innerHTML = '';
        
        this.chatHistory.forEach(message => {
            this.addMessageToChat(message.content, message.role, false);
        });

        // Add welcome message if no history
        if (this.chatHistory.length === 0) {
            this.addMessageToChat(
                "Hello! I'm your AI assistant for orbital recycling and space security. How can I help you today?",
                'assistant',
                false
            );
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;

        const message = chatInput.value.trim();
        if (!message || this.isProcessing) return;

        // Clear input
        chatInput.value = '';
        
        // Add user message
        this.addMessageToChat(message, 'user', true);
        this.chatHistory.push({ role: 'user', content: message, timestamp: new Date().toISOString() });

        // Show typing indicator
        this.showTypingIndicator();

        // Process message
        this.isProcessing = true;
        
        try {
            const response = await this.processMessage(message);
            this.hideTypingIndicator();
            this.addMessageToChat(response, 'assistant', true);
            this.chatHistory.push({ role: 'assistant', content: response, timestamp: new Date().toISOString() });
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessageToChat(
                "I apologize, but I'm experiencing technical difficulties. Please try again later.",
                'assistant',
                true
            );
            console.error('AI processing error:', error);
        }

        this.isProcessing = false;
        this.saveChatHistory();
        this.scrollToBottom();
    }

    addMessageToChat(content, role, animate = true) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const messageDiv = ORLPUtils.createElement('div', `message ${role}-message`);
        
        const avatarDiv = ORLPUtils.createElement('div', 'message-avatar');
        avatarDiv.innerHTML = role === 'user' ? '<i class="fas fa-user-astronaut"></i>' : '<i class="fas fa-robot"></i>';
        
        const contentDiv = ORLPUtils.createElement('div', 'message-content');
        contentDiv.innerHTML = this.formatMessageContent(content);
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        if (animate) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(20px)';
        }
        
        chatMessages.appendChild(messageDiv);
        
        if (animate) {
            setTimeout(() => {
                messageDiv.style.transition = 'all 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    formatMessageContent(content) {
        // Format markdown-like content
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;

        const typingDiv = ORLPUtils.createElement('div', 'message assistant-message typing-message');
        
        const avatarDiv = ORLPUtils.createElement('div', 'message-avatar');
        avatarDiv.innerHTML = '<i class="fas fa-robot"></i>';
        
        const contentDiv = ORLPUtils.createElement('div', 'message-content');
        contentDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        typingDiv.id = 'typing-indicator';
        
        chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    async processMessage(message) {
        // For demo purposes, we'll simulate AI responses
        // In production, this would call the actual Gemini API
        
        const lowerMessage = message.toLowerCase();
        
        // Check for specific topics and provide contextual responses
        if (lowerMessage.includes('orbital') && lowerMessage.includes('recycling')) {
            return this.getOrbitalRecyclingResponse(message);
        } else if (lowerMessage.includes('jamming') || lowerMessage.includes('spoofing')) {
            return this.getThreatResponse(message);
        } else if (lowerMessage.includes('nist') || lowerMessage.includes('iso') || lowerMessage.includes('regulation')) {
            return this.getRegulationResponse(message);
        } else if (lowerMessage.includes('simulation') || lowerMessage.includes('simulator')) {
            return this.getSimulationResponse(message);
        } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
            return this.getAIResponse(message);
        } else if (lowerMessage.includes('help') || lowerMessage.includes('assist')) {
            return this.getHelpResponse();
        } else {
            return this.getGeneralResponse(message);
        }
    }

    getOrbitalRecyclingResponse(message) {
        const responses = [
            "**Orbital recycling** is a critical aspect of space sustainability. The current space debris population includes over 34,000 objects larger than 10cm, with millions of smaller pieces. AI-driven recycling systems can help identify, track, and remove debris more efficiently than traditional methods.\n\nKey considerations for orbital recycling include:\n• **Debris identification** using machine learning algorithms\n• **Trajectory prediction** for optimal capture paths\n• **Energy optimization** to minimize fuel consumption\n• **Risk assessment** for collision avoidance",
            
            "**Space debris recycling** involves several innovative approaches:\n\n1. **Active Debris Removal (ADR)**: Using spacecraft to capture and deorbit debris\n2. **In-situ Resource Utilization**: Converting debris into useful materials\n3. **AI-Powered Optimization**: Machine learning algorithms to improve efficiency\n4. **Predictive Analytics**: Forecasting debris behavior and collision risks\n\nOur simulator allows you to experiment with different recycling strategies and see how AI can optimize the process in real-time.",
            
            "**Orbital recycling efficiency** depends on several factors:\n\n• **Debris characteristics**: Size, composition, and orbital parameters\n• **Recycler capabilities**: Speed, range, and energy capacity\n• **AI optimization**: Machine learning for path planning and resource allocation\n• **Environmental conditions**: Solar activity, atmospheric drag, and collision risks\n\nTry adjusting the parameters in our simulator to see how these factors affect overall performance!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getThreatResponse(message) {
        const responses = [
            "**Space security threats** are becoming increasingly sophisticated. Here are the main categories:\n\n🚨 **Spoofing Attacks**: False GPS signals that can mislead navigation systems\n📡 **Jamming**: Intentional interference with satellite communications\n💻 **Cyber Attacks**: Hacking ground stations and satellite systems\n🛰️ **Physical Threats**: Anti-satellite weapons and space debris\n\nOur courses cover detection, mitigation, and response strategies for each threat type. Would you like to learn about specific defense mechanisms?",
            
            "**Jamming detection** requires sophisticated signal processing techniques:\n\n• **Spectral analysis** to identify interference patterns\n• **Machine learning algorithms** for anomaly detection\n• **Real-time monitoring** of signal quality metrics\n• **Collaborative networks** for threat intelligence sharing\n\nOur simulation modules let you practice detecting and countering different types of jamming attacks in a controlled environment.",
            
            "**Spoofing attacks** are particularly dangerous because they can provide false but believable information. Countermeasures include:\n\n• **Multi-constellation navigation** (GPS + Galileo + BeiDou)\n• **Signal authentication** using cryptographic techniques\n• **Receiver autonomous integrity monitoring** (RAIM)\n• **Ground-based augmentation systems** (GBAS)\n\nI can help you understand the technical details of any of these approaches!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getRegulationResponse(message) {
        const responses = [
            "**Space regulations** are evolving rapidly to address new challenges:\n\n📋 **NIST Cybersecurity Framework**: Provides guidelines for protecting space systems\n🌍 **ISO/IEC 27001**: Information security management for space operations\n🚀 **ITU Regulations**: Spectrum allocation and orbital slot coordination\n🛡️ **National Security Directives**: Country-specific space security policies\n\nOur certification programs help professionals understand and implement these frameworks effectively.",
            
            "**NIST Framework** adaptation for space systems involves:\n\n1. **Identify**: Catalog space assets and assess vulnerabilities\n2. **Protect**: Implement security controls and access management\n3. **Detect**: Monitor for anomalies and security incidents\n4. **Respond**: Develop incident response procedures\n5. **Recover**: Plan for system restoration and lessons learned\n\nEach function requires space-specific considerations due to the unique operational environment.",
            
            "**ISO/IEC 27001** for space operations includes additional controls for:\n\n• **Remote system management** and secure communications\n• **Environmental threats** (radiation, temperature, vacuum)\n• **Supply chain security** for space-grade components\n• **Long-term data retention** and archival procedures\n• **International cooperation** and information sharing protocols\n\nWould you like me to explain any specific aspect of these regulations?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getSimulationResponse(message) {
        const responses = [
            "**Simulation parameters** significantly impact orbital recycling performance:\n\n🎯 **Orbit Height**: Lower orbits have higher collision risk but require less energy\n⚡ **Recycler Speed**: Higher speed improves coverage but increases energy consumption\n🗑️ **Debris Count**: More debris requires more sophisticated AI coordination\n⚡ **Energy Budget**: Limited energy requires optimal path planning\n\nTry different combinations in our simulator to see how AI can optimize these trade-offs!",
            
            "**AI optimization** in orbital recycling involves several algorithms:\n\n• **Genetic algorithms** for path optimization\n• **Neural networks** for debris behavior prediction\n• **Reinforcement learning** for adaptive strategies\n• **Swarm intelligence** for multi-recycler coordination\n\nOur simulator uses simplified versions of these techniques to demonstrate their effectiveness in real-time.",
            
            "**Simulation results** can be analyzed to improve real-world operations:\n\n📊 **Efficiency metrics**: Debris removal rate vs. energy consumption\n🎯 **Coverage analysis**: How well recyclers cover the orbital environment\n⚡ **Energy optimization**: Minimizing fuel usage while maximizing results\n🔄 **Iterative improvement**: Using simulation data to refine algorithms\n\nEach simulation run provides valuable data for improving AI models!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getAIResponse(message) {
        const responses = [
            "**AI in space operations** is revolutionizing how we manage orbital environments:\n\n🧠 **Machine Learning**: Pattern recognition in debris behavior\n🔮 **Predictive Analytics**: Forecasting collision risks and debris evolution\n🤖 **Autonomous Systems**: Self-managing satellites and debris removal\n📊 **Data Fusion**: Combining multiple data sources for better decisions\n\nOur platform demonstrates these AI capabilities through interactive simulations and real-time analysis.",
            
            "**Gemini AI** (the model powering this assistant) excels at:\n\n• **Natural language understanding** for complex technical queries\n• **Code generation** for space mission planning\n• **Multimodal analysis** of satellite imagery and telemetry data\n• **Reasoning** about complex orbital mechanics problems\n\nI can help you understand orbital dynamics, plan missions, or analyze simulation results using advanced AI reasoning.",
            
            "**Future AI developments** in space operations include:\n\n🚀 **Quantum machine learning** for ultra-fast optimization\n🌐 **Federated learning** across satellite constellations\n🧬 **Evolutionary algorithms** for adaptive mission planning\n🔗 **Blockchain integration** for secure space data sharing\n\nThese technologies will enable more autonomous and efficient space operations!"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getHelpResponse() {
        return "I'm here to help with your space education journey! Here's what I can assist with:\n\n🎓 **Course Guidance**: Explain concepts, provide examples, and clarify difficult topics\n🔬 **Simulation Analysis**: Help interpret results and suggest parameter optimizations\n📚 **Study Support**: Recommend learning paths and provide additional resources\n🤖 **AI Insights**: Explain how artificial intelligence applies to space operations\n📋 **Regulations**: Clarify NIST, ISO, and other space security frameworks\n\nJust ask me about any topic related to space security, orbital recycling, or our platform features!";
    }

    getGeneralResponse(message) {
        const responses = [
            "That's an interesting question! While I specialize in space security and orbital recycling, I can help with a wide range of topics related to our platform. Could you provide more context about what specific aspect you'd like to explore?",
            
            "I'd be happy to help! For the best assistance, could you let me know if you're asking about:\n• Course content or learning materials\n• Simulation parameters or results\n• Platform features or navigation\n• Space security concepts\n• Orbital recycling techniques\n\nThis will help me give you the most relevant and helpful response!",
            
            "Great question! I'm designed to help with space education topics. If you're looking for information about our courses, simulations, or space security concepts, I can provide detailed explanations and guidance. What specific area would you like to explore?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Method to get AI predictions for simulations
    async getSimulationPredictions(parameters) {
        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const { orbitHeight, debrisCount, recyclerSpeed, energyBudget } = parameters;
        
        // Generate realistic predictions based on parameters
        const efficiency = Math.min(95, Math.max(60, 
            85 - (debrisCount - 100) * 0.1 + (recyclerSpeed - 5) * 2 - Math.abs(orbitHeight - 400) * 0.02
        ));
        
        const energyEfficiency = Math.max(0.3, 1 - (debrisCount / energyBudget) * 0.5);
        
        return {
            predictedEfficiency: Math.round(efficiency),
            predictedEnergyUsage: Math.round(energyBudget * (1 - energyEfficiency)),
            recommendations: this.generateRecommendations(parameters, efficiency),
            confidence: Math.random() * 0.2 + 0.8 // 80-100% confidence
        };
    }

    generateRecommendations(parameters, efficiency) {
        const recommendations = [];
        
        if (parameters.debrisCount > 200) {
            recommendations.push("Consider reducing debris count or increasing recycler capacity for better efficiency");
        }
        
        if (parameters.recyclerSpeed > 7) {
            recommendations.push("Lower recycler speed may improve precision and reduce energy consumption");
        }
        
        if (parameters.orbitHeight < 300 || parameters.orbitHeight > 800) {
            recommendations.push("Orbit height outside 300-800km range may impact efficiency");
        }
        
        if (efficiency > 90) {
            recommendations.push("Excellent parameter combination! This should yield high performance");
        }
        
        return recommendations;
    }

    // Method to clear chat history
    clearChatHistory() {
        this.chatHistory = [];
        this.saveChatHistory();
        this.displayChatHistory();
        ORLPUtils.showNotification('Chat history cleared', 'success');
    }

    // Method to export chat history
    exportChatHistory() {
        const chatData = {
            exportDate: new Date().toISOString(),
            messageCount: this.chatHistory.length,
            messages: this.chatHistory
        };
        
        const dataStr = JSON.stringify(chatData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `orlp-chat-history-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        ORLPUtils.showNotification('Chat history exported', 'success');
    }
}

// Initialize AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.orlpAI = new ORLPAI();
});

// Export for use in other modules
window.ORLPAI = ORLPAI;
