// ORLP Simulator - Interactive orbital recycling simulation with AI predictions

class ORLPSimulator {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.isRunning = false;
        this.isPaused = false;
        this.animationId = null;
        this.simulationData = {
            debris: [],
            recyclers: [],
            efficiency: 0,
            debrisRemoved: 0,
            energyUsed: 0,
            timeElapsed: 0
        };
        this.parameters = {
            orbitHeight: 400,
            debrisCount: 100,
            recyclerSpeed: 5,
            energyBudget: 500
        };
        this.particles = [];
        this.lastTime = 0;
        
        this.init();
    }

    init() {
        this.canvas = document.getElementById('simulationCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.initializeSimulation();
        this.resizeCanvas();
        
        // Start render loop
        this.render();
    }

    setupEventListeners() {
        // Control sliders
        const orbitHeightSlider = document.getElementById('orbitHeight');
        const debrisCountSlider = document.getElementById('debrisCount');
        const recyclerSpeedSlider = document.getElementById('recyclerSpeed');

        if (orbitHeightSlider) {
            orbitHeightSlider.addEventListener('input', (e) => {
                this.parameters.orbitHeight = parseInt(e.target.value);
                this.updateSliderValue('orbitHeight', e.target.value + ' km');
                this.regenerateDebris();
            });
        }

        if (debrisCountSlider) {
            debrisCountSlider.addEventListener('input', (e) => {
                this.parameters.debrisCount = parseInt(e.target.value);
                this.updateSliderValue('debrisCount', e.target.value);
                this.regenerateDebris();
            });
        }

        if (recyclerSpeedSlider) {
            recyclerSpeedSlider.addEventListener('input', (e) => {
                this.parameters.recyclerSpeed = parseInt(e.target.value);
                this.updateSliderValue('recyclerSpeed', e.target.value + 'x');
            });
        }

        // Control buttons
        const startBtn = document.getElementById('startSimulation');
        const pauseBtn = document.getElementById('pauseSimulation');
        const resetBtn = document.getElementById('resetSimulation');

        if (startBtn) {
            startBtn.addEventListener('click', () => this.startSimulation());
        }

        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => this.pauseSimulation());
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetSimulation());
        }

        // Window resize
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    initializeSimulation() {
        this.generateDebris();
        this.generateRecyclers();
        this.simulationData = {
            debris: [...this.simulationData.debris],
            recyclers: [...this.simulationData.recyclers],
            efficiency: 0,
            debrisRemoved: 0,
            energyUsed: 0,
            timeElapsed: 0
        };
    }

    generateDebris() {
        this.simulationData.debris = [];
        const count = this.parameters.debrisCount;
        
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
            const radius = this.parameters.orbitHeight / 10 + Math.random() * 50;
            
            this.simulationData.debris.push({
                id: i,
                x: this.centerX + Math.cos(angle) * radius,
                y: this.centerY + Math.sin(angle) * radius,
                angle: angle,
                radius: radius,
                size: Math.random() * 8 + 4,
                speed: Math.random() * 0.02 + 0.01,
                color: this.getRandomDebrisColor(),
                removed: false,
                removalTime: 0
            });
        }
    }

    generateRecyclers() {
        this.simulationData.recyclers = [];
        const recyclerCount = Math.min(3, Math.ceil(this.parameters.debrisCount / 50));
        
        for (let i = 0; i < recyclerCount; i++) {
            const angle = (Math.PI * 2 * i) / recyclerCount;
            const radius = this.parameters.orbitHeight / 8;
            
            this.simulationData.recyclers.push({
                id: i,
                x: this.centerX + Math.cos(angle) * radius,
                y: this.centerY + Math.sin(angle) * radius,
                angle: angle,
                radius: radius,
                speed: 0.03 * this.parameters.recyclerSpeed,
                targetDebris: null,
                energy: this.parameters.energyBudget / recyclerCount,
                efficiency: 0.8,
                range: 30
            });
        }
    }

    getRandomDebrisColor() {
        const colors = [
            '#ff5722', // Orange
            '#795548', // Brown
            '#607d8b', // Blue Grey
            '#9e9e9e', // Grey
            '#ffc107'  // Amber
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    startSimulation() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.lastTime = performance.now();
        
        // Update button states
        this.updateButtonStates();
        
        // Start AI prediction
        this.startAIPrediction();
        
        ORLPUtils.showNotification('Simulation started!', 'success');
    }

    pauseSimulation() {
        if (!this.isRunning) return;
        
        this.isPaused = !this.isPaused;
        this.updateButtonStates();
        
        const message = this.isPaused ? 'Simulation paused' : 'Simulation resumed';
        ORLPUtils.showNotification(message, 'info');
    }

    resetSimulation() {
        this.isRunning = false;
        this.isPaused = false;
        this.simulationData.timeElapsed = 0;
        this.simulationData.debrisRemoved = 0;
        this.simulationData.energyUsed = 0;
        this.simulationData.efficiency = 0;
        
        this.initializeSimulation();
        this.updateMetrics();
        this.updateButtonStates();
        
        ORLPUtils.showNotification('Simulation reset', 'info');
    }

    updateButtonStates() {
        const startBtn = document.getElementById('startSimulation');
        const pauseBtn = document.getElementById('pauseSimulation');
        const resetBtn = document.getElementById('resetSimulation');

        if (startBtn) {
            startBtn.disabled = this.isRunning;
            startBtn.innerHTML = this.isRunning ? '<i class="fas fa-play"></i> Running...' : '<i class="fas fa-play"></i> Start Simulation';
        }

        if (pauseBtn) {
            pauseBtn.disabled = !this.isRunning;
            pauseBtn.innerHTML = this.isPaused ? '<i class="fas fa-play"></i> Resume' : '<i class="fas fa-pause"></i> Pause';
        }

        if (resetBtn) {
            resetBtn.disabled = this.isRunning && !this.isPaused;
        }
    }

    updateSliderValue(sliderId, value) {
        const valueElement = document.querySelector(`#${sliderId} + .slider-value`);
        if (valueElement) {
            valueElement.textContent = value;
        }
    }

    regenerateDebris() {
        if (!this.isRunning) {
            this.generateDebris();
        }
    }

    render() {
        if (!this.canvas || !this.ctx) return;
        
        // Clear canvas
        this.ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background grid
        this.drawGrid();
        
        // Draw central hub (Earth)
        this.drawCentralHub();
        
        // Update and draw simulation objects
        if (this.isRunning && !this.isPaused) {
            this.updateSimulation();
        }
        
        this.drawDebris();
        this.drawRecyclers();
        this.drawParticles();
        
        // Continue animation loop
        this.animationId = requestAnimationFrame(() => this.render());
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 102, 204, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Draw concentric circles
        for (let i = 1; i <= 5; i++) {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, i * 50, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // Draw grid lines
        const spacing = 50;
        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        for (let y = 0; y < this.canvas.height; y += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    drawCentralHub() {
        // Earth representation
        const gradient = this.ctx.createRadialGradient(
            this.centerX - 10, this.centerY - 10, 0,
            this.centerX, this.centerY, 30
        );
        gradient.addColorStop(0, '#4fc3f7');
        gradient.addColorStop(1, '#0066cc');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 30, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowColor = '#0066cc';
        this.ctx.shadowBlur = 20;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 30, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    updateSimulation() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;
        
        this.simulationData.timeElapsed += deltaTime;
        
        // Update debris
        this.updateDebris(deltaTime);
        
        // Update recyclers
        this.updateRecyclers(deltaTime);
        
        // Update metrics
        this.calculateMetrics();
        this.updateMetrics();
    }

    updateDebris(deltaTime) {
        this.simulationData.debris.forEach(debris => {
            if (debris.removed) return;
            
            debris.angle += debris.speed * deltaTime;
            debris.x = this.centerX + Math.cos(debris.angle) * debris.radius;
            debris.y = this.centerY + Math.sin(debris.angle) * debris.radius;
        });
    }

    updateRecyclers(deltaTime) {
        this.simulationData.recyclers.forEach(recycler => {
            // Update position
            recycler.angle += recycler.speed * deltaTime;
            recycler.x = this.centerX + Math.cos(recycler.angle) * recycler.radius;
            recycler.y = this.centerY + Math.sin(recycler.angle) * recycler.radius;
            
            // Find target debris
            if (!recycler.targetDebris || recycler.targetDebris.removed) {
                recycler.targetDebris = this.findNearestDebris(recycler);
            }
            
            // Process debris if in range
            if (recycler.targetDebris && this.isInRange(recycler, recycler.targetDebris)) {
                this.processDebris(recycler, recycler.targetDebris, deltaTime);
            }
        });
    }

    findNearestDebris(recycler) {
        let nearest = null;
        let minDistance = Infinity;
        
        this.simulationData.debris.forEach(debris => {
            if (debris.removed) return;
            
            const distance = Math.sqrt(
                Math.pow(debris.x - recycler.x, 2) + 
                Math.pow(debris.y - recycler.y, 2)
            );
            
            if (distance < minDistance && distance <= recycler.range) {
                minDistance = distance;
                nearest = debris;
            }
        });
        
        return nearest;
    }

    isInRange(recycler, debris) {
        const distance = Math.sqrt(
            Math.pow(debris.x - recycler.x, 2) + 
            Math.pow(debris.y - recycler.y, 2)
        );
        return distance <= recycler.range;
    }

    processDebris(recycler, debris, deltaTime) {
        if (debris.removed || recycler.energy <= 0) return;
        
        // Consume energy
        const energyConsumption = 2 * deltaTime;
        recycler.energy -= energyConsumption;
        this.simulationData.energyUsed += energyConsumption;
        
        // Progress removal
        debris.removalTime += deltaTime;
        
        // Remove debris after processing time
        if (debris.removalTime >= 2) { // 2 seconds to remove
            debris.removed = true;
            this.simulationData.debrisRemoved++;
            recycler.targetDebris = null;
            
            // Create particle effect
            this.createRemovalParticles(debris.x, debris.y);
        }
    }

    createRemovalParticles(x, y) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 100,
                vy: (Math.random() - 0.5) * 100,
                life: 1,
                decay: 0.02,
                size: Math.random() * 4 + 2,
                color: '#4caf50'
            });
        }
    }

    drawDebris() {
        this.simulationData.debris.forEach(debris => {
            if (debris.removed) return;
            
            this.ctx.fillStyle = debris.color;
            this.ctx.beginPath();
            this.ctx.arc(debris.x, debris.y, debris.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow for larger debris
            if (debris.size > 6) {
                this.ctx.shadowColor = debris.color;
                this.ctx.shadowBlur = 5;
                this.ctx.beginPath();
                this.ctx.arc(debris.x, debris.y, debris.size, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
            
            // Show removal progress
            if (debris.removalTime > 0) {
                const progress = debris.removalTime / 2;
                this.ctx.strokeStyle = '#4caf50';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(debris.x, debris.y, debris.size + 5, 0, Math.PI * 2 * progress);
                this.ctx.stroke();
            }
        });
    }

    drawRecyclers() {
        this.simulationData.recyclers.forEach(recycler => {
            // Draw recycler
            this.ctx.fillStyle = '#4caf50';
            this.ctx.beginPath();
            this.ctx.arc(recycler.x, recycler.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow
            this.ctx.shadowColor = '#4caf50';
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(recycler.x, recycler.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
            
            // Draw range indicator
            this.ctx.strokeStyle = 'rgba(76, 175, 80, 0.3)';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(recycler.x, recycler.y, recycler.range, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // Draw line to target
            if (recycler.targetDebris && !recycler.targetDebris.removed) {
                this.ctx.strokeStyle = 'rgba(76, 175, 80, 0.6)';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(recycler.x, recycler.y);
                this.ctx.lineTo(recycler.targetDebris.x, recycler.targetDebris.y);
                this.ctx.stroke();
            }
            
            // Draw energy bar
            const energyPercent = recycler.energy / (this.parameters.energyBudget / this.simulationData.recyclers.length);
            this.ctx.fillStyle = energyPercent > 0.3 ? '#4caf50' : '#f44336';
            this.ctx.fillRect(recycler.x - 15, recycler.y - 20, 30 * energyPercent, 4);
        });
    }

    drawParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx * 0.016;
            particle.y += particle.vy * 0.016;
            particle.life -= particle.decay;
            
            if (particle.life <= 0) return false;
            
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            return true;
        });
        
        this.ctx.globalAlpha = 1;
    }

    calculateMetrics() {
        const totalDebris = this.simulationData.debris.length;
        const removedDebris = this.simulationData.debrisRemoved;
        const remainingDebris = totalDebris - removedDebris;
        
        // Calculate efficiency based on debris removal and energy usage
        if (totalDebris > 0) {
            const removalRate = removedDebris / totalDebris;
            const energyEfficiency = Math.max(0, 1 - (this.simulationData.energyUsed / this.parameters.energyBudget));
            this.simulationData.efficiency = Math.round((removalRate * 0.7 + energyEfficiency * 0.3) * 100);
        }
    }

    updateMetrics() {
        const efficiencyElement = document.getElementById('efficiencyValue');
        const debrisRemovedElement = document.getElementById('debrisRemoved');
        const energyUsedElement = document.getElementById('energyUsed');

        if (efficiencyElement) {
            efficiencyElement.textContent = this.simulationData.efficiency + '%';
        }

        if (debrisRemovedElement) {
            debrisRemovedElement.textContent = this.simulationData.debrisRemoved;
        }

        if (energyUsedElement) {
            energyUsedElement.textContent = Math.round(this.simulationData.energyUsed) + ' kW';
        }
    }

    async startAIPrediction() {
        const predictionsElement = document.getElementById('aiPredictions');
        if (!predictionsElement) return;

        predictionsElement.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Analyzing simulation parameters...</p>';

        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const predictions = this.generateAIPredictions();
        predictionsElement.innerHTML = predictions;
    }

    generateAIPredictions() {
        const { orbitHeight, debrisCount, recyclerSpeed } = this.parameters;
        
        let predictions = '<h4>AI Analysis Results:</h4>';
        predictions += '<ul>';
        
        // Orbit height analysis
        if (orbitHeight < 400) {
            predictions += '<li><i class="fas fa-exclamation-triangle text-warning"></i> Low orbit height increases collision risk</li>';
        } else if (orbitHeight > 800) {
            predictions += '<li><i class="fas fa-info-circle text-info"></i> High orbit requires more energy for debris removal</li>';
        } else {
            predictions += '<li><i class="fas fa-check-circle text-success"></i> Optimal orbit height for debris removal</li>';
        }
        
        // Debris count analysis
        if (debrisCount > 200) {
            predictions += '<li><i class="fas fa-exclamation-triangle text-warning"></i> High debris density may overwhelm recyclers</li>';
        } else {
            predictions += '<li><i class="fas fa-check-circle text-success"></i> Manageable debris count for efficient cleanup</li>';
        }
        
        // Recycler speed analysis
        if (recyclerSpeed > 7) {
            predictions += '<li><i class="fas fa-exclamation-triangle text-warning"></i> High speed may reduce precision and increase energy consumption</li>';
        } else if (recyclerSpeed < 3) {
            predictions += '<li><i class="fas fa-info-circle text-info"></i> Conservative speed ensures accuracy but may be slow</li>';
        } else {
            predictions += '<li><i class="fas fa-check-circle text-success"></i> Balanced speed for optimal performance</li>';
        }
        
        // Efficiency prediction
        const predictedEfficiency = Math.min(95, Math.max(60, 
            85 - (debrisCount - 100) * 0.1 + (recyclerSpeed - 5) * 2 - Math.abs(orbitHeight - 400) * 0.02
        ));
        
        predictions += `<li><i class="fas fa-chart-line text-primary"></i> Predicted efficiency: ${Math.round(predictedEfficiency)}%</li>`;
        
        predictions += '</ul>';
        
        return predictions;
    }

    getSimulationData() {
        return {
            ...this.simulationData,
            parameters: { ...this.parameters },
            isRunning: this.isRunning,
            isPaused: this.isPaused
        };
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

// Initialize simulator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.orlpSimulator = new ORLPSimulator();
});

// Export for use in other modules
window.ORLPSimulator = ORLPSimulator;
