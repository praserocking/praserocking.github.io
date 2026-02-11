// Ferrari Fuel Flow Simulation - Chart-Based Analysis
class FuelFlowSimulation {
    constructor() {
        this.isRunning = false;
        this.animationId = null;
        this.time = 0;
        this.speed = 1;
        
        // Simulation parameters
        this.LEGAL_LIMIT = 100; // kg/hr
        this.SENSOR_FREQUENCY = 2200; // Hz
        this.MEASUREMENT_INTERVAL = 1 / this.SENSOR_FREQUENCY; // seconds
        
        // Data arrays for charts
        this.meterData = [];
        this.actualData = [];
        this.timingData = [];
        this.differenceData = [];
        this.timeData = [];
        this.maxDataPoints = 300;
        
        // Chart instances
        this.meterChart = null;
        this.actualChart = null;
        this.timingChart = null;
        this.differenceChart = null;
        
        this.initializeCharts();
        this.setupEventListeners();
        this.updateStats();
    }
    
    initializeCharts() {
        // Meter readings chart (what the sensor sees)
        const meterCtx = document.getElementById('meterChart').getContext('2d');
        this.meterChart = new Chart(meterCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Sensor Reading (kg/hr)',
                    data: [],
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 1
                }, {
                    label: 'Legal Limit',
                    data: [],
                    borderColor: '#ff5722',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        min: 80,
                        max: 120,
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                animation: false
            }
        });
        
        // Actual fuel flow chart (the alleged reality)
        const actualCtx = document.getElementById('actualChart').getContext('2d');
        this.actualChart = new Chart(actualCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Actual Flow (kg/hr)',
                    data: [],
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.1,
                    pointRadius: 1
                }, {
                    label: 'Legal Limit',
                    data: [],
                    borderColor: '#ff5722',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        min: 80,
                        max: 140,
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                animation: false
            }
        });

        // Timing chart showing sensor measurement intervals
        const timingCtx = document.getElementById('timingChart').getContext('2d');
        this.timingChart = new Chart(timingCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Sensor Active',
                    data: [],
                    borderColor: '#2196f3',
                    backgroundColor: 'rgba(33, 150, 243, 0.2)',
                    borderWidth: 3,
                    fill: true,
                    stepped: true,
                    pointRadius: 0
                }, {
                    label: 'Fuel Injection Pulse',
                    data: [],
                    borderColor: '#e91e63',
                    backgroundColor: 'rgba(233, 30, 99, 0.2)',
                    borderWidth: 2,
                    fill: false,
                    stepped: true,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        min: 0,
                        max: 1.2,
                        ticks: { 
                            color: '#ffffff',
                            callback: function(value) {
                                return value === 0 ? 'Off' : value === 1 ? 'On' : '';
                            }
                        },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                animation: false
            }
        });

        // Difference chart showing the gap between actual and measured
        const differenceCtx = document.getElementById('differenceChart').getContext('2d');
        this.differenceChart = new Chart(differenceCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Flow Difference (kg/hr)',
                    data: [],
                    borderColor: '#ff5722',
                    backgroundColor: 'rgba(255, 87, 34, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 1
                }, {
                    label: 'Zero Line',
                    data: [],
                    borderColor: '#666666',
                    borderWidth: 1,
                    borderDash: [3, 3],
                    fill: false,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        min: -5,
                        max: 40,
                        ticks: { color: '#ffffff' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                },
                animation: false
            }
        });
    }
    
    setupEventListeners() {
        document.getElementById('startSimulation').addEventListener('click', () => this.start());
        document.getElementById('stopSimulation').addEventListener('click', () => this.stop());
        document.getElementById('resetSimulation').addEventListener('click', () => this.reset());
        
        const speedSlider = document.getElementById('speedSlider');
        speedSlider.addEventListener('input', (e) => {
            this.speed = parseFloat(e.target.value);
            document.getElementById('speedValue').textContent = `${this.speed}x`;
        });
    }
    
    // Ferrari's alleged fuel flow pattern
    calculateActualFuelFlow(time) {
        // Base flow around legal limit
        const baseFlow = 95;
        
        // High frequency pulses between sensor measurements
        const sensorPeriod = this.MEASUREMENT_INTERVAL;
        const timeInPeriod = (time % sensorPeriod) / sensorPeriod;
        
        // Create pulses that avoid sensor measurement times
        let pulseMultiplier = 1;
        
        // Sensor measures at the beginning of each period (timeInPeriod ≈ 0)
        if (timeInPeriod > 0.15 && timeInPeriod < 0.85) {
            // High flow between measurements - this is the alleged cheat
            const pulseIntensity = Math.sin((timeInPeriod - 0.15) * Math.PI / 0.7);
            pulseMultiplier = 1 + 0.35 * pulseIntensity; // Up to 135% of base flow
        }
        
        // Add some realistic engine variation
        const engineVariation = 1 + 0.05 * Math.sin(time * 8);
        
        return baseFlow * pulseMultiplier * engineVariation;
    }
    
    calculateSensorReading(time) {
        // Sensor only "sees" fuel flow at specific intervals (2200 Hz)
        const sensorPeriod = this.MEASUREMENT_INTERVAL;
        const timeInPeriod = (time % sensorPeriod) / sensorPeriod;
        
        // Sensor reading is only updated at the beginning of each period
        if (timeInPeriod < 0.1) { // 10% of the period for measurement
            // During measurement, Ferrari ensures flow is within legal limits
            return 95 + 4 * Math.sin(time * 3); // Stays within legal limit
        }
        
        // Return the last "legal" reading during non-measurement times
        return 95 + 4 * Math.sin(Math.floor(time / sensorPeriod) * sensorPeriod * 3);
    }
    
    calculateSensorTiming(time) {
        const sensorPeriod = this.MEASUREMENT_INTERVAL;
        const timeInPeriod = (time % sensorPeriod) / sensorPeriod;
        return timeInPeriod < 0.1 ? 1 : 0; // Sensor active for 10% of each period
    }
    
    calculateFuelInjectionPulse(time) {
        const sensorPeriod = this.MEASUREMENT_INTERVAL;
        const timeInPeriod = (time % sensorPeriod) / sensorPeriod;
        
        // Fuel injection pulse happens between sensor measurements
        if (timeInPeriod > 0.15 && timeInPeriod < 0.85) {
            const pulsePosition = (timeInPeriod - 0.15) / 0.7;
            return Math.sin(pulsePosition * Math.PI);
        }
        return 0;
    }
    
    updateSimulation() {
        if (!this.isRunning) return;
        
        this.time += 0.008 * this.speed; // Slower time progression for better visualization
        
        // Calculate all values
        const actualFlow = this.calculateActualFuelFlow(this.time);
        const sensorReading = this.calculateSensorReading(this.time);
        const sensorTiming = this.calculateSensorTiming(this.time);
        const fuelPulse = this.calculateFuelInjectionPulse(this.time);
        const difference = actualFlow - sensorReading;
        
        // Update data arrays
        this.actualData.push(actualFlow);
        this.meterData.push(sensorReading);
        this.timingData.push({ sensor: sensorTiming, pulse: fuelPulse });
        this.differenceData.push(difference);
        this.timeData.push(this.time.toFixed(3));
        
        // Limit data points for performance
        if (this.actualData.length > this.maxDataPoints) {
            this.actualData.shift();
            this.meterData.shift();
            this.timingData.shift();
            this.differenceData.shift();
            this.timeData.shift();
        }
        
        // Update charts
        this.updateCharts();
        
        // Update statistics
        this.updateStats(actualFlow, sensorReading, difference);
        
        this.animationId = requestAnimationFrame(() => this.updateSimulation());
    }
    
    updateCharts() {
        // Update meter chart
        this.meterChart.data.labels = [...this.timeData];
        this.meterChart.data.datasets[0].data = [...this.meterData];
        this.meterChart.data.datasets[1].data = new Array(this.timeData.length).fill(this.LEGAL_LIMIT);
        this.meterChart.update('none');
        
        // Update actual flow chart
        this.actualChart.data.labels = [...this.timeData];
        this.actualChart.data.datasets[0].data = [...this.actualData];
        this.actualChart.data.datasets[1].data = new Array(this.timeData.length).fill(this.LEGAL_LIMIT);
        this.actualChart.update('none');
        
        // Update timing chart
        this.timingChart.data.labels = [...this.timeData];
        this.timingChart.data.datasets[0].data = this.timingData.map(d => d.sensor);
        this.timingChart.data.datasets[1].data = this.timingData.map(d => d.pulse);
        this.timingChart.update('none');
        
        // Update difference chart
        this.differenceChart.data.labels = [...this.timeData];
        this.differenceChart.data.datasets[0].data = [...this.differenceData];
        this.differenceChart.data.datasets[1].data = new Array(this.timeData.length).fill(0);
        this.differenceChart.update('none');
    }
    
    updateStats(actualFlow = 0, sensorReading = 0, difference = 0) {
        document.getElementById('currentFlow').textContent = `${actualFlow.toFixed(1)} kg/hr`;
        document.getElementById('sensorReading').textContent = `${sensorReading.toFixed(1)} kg/hr`;
        document.getElementById('excessFuel').textContent = `${Math.max(0, difference).toFixed(1)} kg/hr`;
        
        // Calculate average
        if (this.actualData.length > 0) {
            const average = this.actualData.reduce((a, b) => a + b, 0) / this.actualData.length;
            document.getElementById('averageFlow').textContent = `${average.toFixed(1)} kg/hr`;
        }
        
        // Add visual indicators
        const currentFlowElement = document.getElementById('currentFlow');
        const sensorElement = document.getElementById('sensorReading');
        
        if (actualFlow > this.LEGAL_LIMIT) {
            currentFlowElement.style.color = '#ff5722';
        } else {
            currentFlowElement.style.color = '#4caf50';
        }
        
        if (sensorReading > this.LEGAL_LIMIT) {
            sensorElement.style.color = '#ff5722';
        } else {
            sensorElement.style.color = '#4caf50';
        }
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.updateSimulation();
            
            // Add visual feedback
            document.getElementById('startSimulation').classList.add('pulse');
            document.getElementById('startSimulation').textContent = 'Running...';
        }
    }
    
    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        // Remove visual feedback
        document.getElementById('startSimulation').classList.remove('pulse');
        document.getElementById('startSimulation').textContent = 'Start Simulation';
    }
    
    reset() {
        this.stop();
        this.time = 0;
        this.meterData = [];
        this.actualData = [];
        this.timingData = [];
        this.differenceData = [];
        this.timeData = [];
        
        // Reset all charts
        const charts = [this.meterChart, this.actualChart, this.timingChart, this.differenceChart];
        charts.forEach(chart => {
            chart.data.labels = [];
            chart.data.datasets.forEach(dataset => {
                dataset.data = [];
            });
            chart.update();
        });
        
        // Reset stats
        this.updateStats();
    }
}

// Initialize simulation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new FuelFlowSimulation();
    
    // Add educational information
    console.log('Ferrari Fuel Flow Simulation initialized');
    console.log('Key insights:');
    console.log('1. Sensor measures at 2200 Hz (every ~0.45ms)');
    console.log('2. Alleged method: High fuel flow between measurements');
    console.log('3. Wave summation theory: Timing pulses to avoid detection');
    console.log('4. Engineering precision: Microsecond-level timing control');
    
    // Add tooltips for better understanding
    const tooltips = {
        'meterChart': 'FIA sensor readings - always within legal limits during measurement windows',
        'actualChart': 'Alleged actual fuel flow - exceeds limits between sensor measurements',
        'timingChart': 'Shows precise timing of sensor measurements vs fuel injection pulses',
        'differenceChart': 'Quantifies the excess fuel flow that went undetected'
    };
    
    Object.entries(tooltips).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.title = text;
        }
    });
});
