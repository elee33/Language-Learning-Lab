// Main Neural Network class that handles visualization and interaction
class NeuralNetwork {
    constructor() {
        // Initialize network configuration
        this.layers = [4, 4, 2];     // [input layer, hidden layer, output layer]
        this.maxLayers = 20;         // Maximum number of layers allowed
        this.neuronsPerLayer = 4;    // Default neurons per hidden layer
        this.isPlaying = false;      // Animation state
        this.initializeNetwork();     // Setup network visualization
        this.initializeOutputGraph(); // Setup output graph
    }

    // Initialize the neural network visualization canvas
    initializeNetwork() {
        const canvas = document.getElementById('networkCanvas');
        if (!canvas) return;
        
        // Set canvas dimensions based on container size
        const container = canvas.parentElement;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        this.updateVisualization();
    }

    // Update the network visualization (neurons and connections)
    updateVisualization() {
        const canvas = document.getElementById('networkCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Set proper canvas dimensions for high DPI displays
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate spacing and dimensions
        const padding = 50;
        const layerSpacing = (canvas.width - 2 * padding) / (this.layers.length - 1);
        const neuronRadius = 20; // Size of neurons

        // Draw each layer of the network
        this.layers.forEach((numNeurons, layerIndex) => {
            const x = padding + layerIndex * layerSpacing;
            const neuronSpacing = (canvas.height - 2 * padding) / Math.max(numNeurons - 1, 1);

            // Draw connections between layers
            if (layerIndex > 0) {
                const prevLayer = this.layers[layerIndex - 1];
                const prevX = padding + (layerIndex - 1) * layerSpacing;
                const prevSpacing = (canvas.height - 2 * padding) / Math.max(prevLayer - 1, 1);

                // Set connection style
                ctx.strokeStyle = 'rgba(0,0,0,0.15)';
                ctx.lineWidth = 0.5;

                // Draw connections between neurons
                for (let i = 0; i < numNeurons; i++) {
                    const y = padding + i * neuronSpacing;
                    for (let j = 0; j < prevLayer; j++) {
                        const prevY = padding + j * prevSpacing;
                        ctx.beginPath();
                        ctx.moveTo(prevX, prevY);
                        ctx.lineTo(x, y);
                        ctx.stroke();
                    }
                }
            }

            // Draw neurons for current layer
            for (let i = 0; i < numNeurons; i++) {
                const y = padding + i * neuronSpacing;
                
                // Set color based on layer type (input, hidden, output)
                ctx.fillStyle = layerIndex === 0 ? 'rgb(255, 127, 14)' :  // Input neurons
                               layerIndex === this.layers.length - 1 ? 'rgb(44, 160, 44)' :  // Output neurons
                               'rgb(31, 119, 180)';  // Hidden neurons
                
                // Add shadow effect for depth
                ctx.shadowColor = 'rgba(0,0,0,0.3)';
                ctx.shadowBlur = 10;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                
                // Draw the neuron
                ctx.beginPath();
                ctx.arc(x, y, neuronRadius, 0, Math.PI * 2);
                ctx.fill();
                
                // Reset shadow effects
                ctx.shadowBlur = 0;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
            }
        });
    }

    // Initialize the output graph canvas
    initializeOutputGraph() {
        const canvas = document.getElementById('outputGraph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        this.drawOutputGraph();
    }

    // Draw the output graph with data points
    drawOutputGraph() {
        const canvas = document.getElementById('outputGraph');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        this.drawGrid(ctx, canvas.width, canvas.height);
        this.drawDataPoints(ctx, canvas.width, canvas.height);
    }

    // Draw grid lines on the output graph
    drawGrid(ctx, width, height) {
        ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x <= width; x += width/12) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y <= height; y += height/12) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    }

    drawDataPoints(ctx, width, height) {
        // Example data points
        const points = this.generateDataPoints();
        points.forEach(point => {
            ctx.fillStyle = point.class === 1 ? 'rgb(255, 127, 14)' : 'rgb(31, 119, 180)';
            ctx.beginPath();
            ctx.arc(
                (point.x + 6) * width/12, 
                (6 - point.y) * height/12, 
                4, 0, Math.PI * 2
            );
            ctx.fill();
        });
    }

    generateDataPoints() {
        // Example: Generate some random data points
        const points = [];
        for (let i = 0; i < 100; i++) {
            points.push({
                x: (Math.random() * 12) - 6,
                y: (Math.random() * 12) - 6,
                class: Math.random() > 0.5 ? 1 : 0
            });
        }
        return points;
    }

    togglePlay() {
        this.isPlaying = !this.isPlaying;
        if (this.isPlaying) {
            this.step();
        }
    }

    step() {
        if (this.isPlaying) {
            // Update network state
            this.drawOutputGraph();
            requestAnimationFrame(() => this.step());
        }
    }

    reset() {
        this.isPlaying = false;
        this.initializeNetwork();
        this.drawOutputGraph();
    }

    regenerate() {
        // Reset network state
        this.layers = [4, 4, 2];
        this.isPlaying = false;
        
        // Get current slider values
        const trainingRatio = document.querySelector('.slider-group:nth-child(1) .slider').value;
        const noiseLevel = document.querySelector('.slider-group:nth-child(2) .slider').value;
        const batchSize = document.querySelector('.slider-group:nth-child(3) .slider').value;
        
        // Generate new data based on slider values
        this.generateNewData(trainingRatio, noiseLevel, batchSize);
        
        // Reinitialize network and update visualizations
        this.initializeNetwork();
        this.drawOutputGraph();
    }

    generateNewData(trainingRatio, noiseLevel, batchSize) {
        // Generate new random data points with the current parameters
        const points = [];
        const numPoints = batchSize * 10; // Scale points based on batch size
        
        for (let i = 0; i < numPoints; i++) {
            const noise = (Math.random() - 0.5) * (noiseLevel / 25); // Scale noise level
            points.push({
                x: (Math.random() * 12) - 6 + noise,
                y: (Math.random() * 12) - 6 + noise,
                class: Math.random() > (trainingRatio / 100) ? 1 : 0
            });
        }
        
        this.dataPoints = points;
        return points;
    }

    // Add a new hidden layer to the network
    addLayer() {
        if (this.layers.length < this.maxLayers) {
            // Insert new hidden layer before the output layer
            this.layers.splice(this.layers.length - 1, 0, this.neuronsPerLayer);
            
            // Force canvas resize and redraw
            const canvas = document.getElementById('networkCanvas');
            if (canvas) {
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
            }
            
            // Update the visualization with new layer
            this.updateVisualization();
        }
    }
}

// Initialize network
const network = new NeuralNetwork();

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    network.initializeNetwork();

    // Play button
    document.querySelector('.control-btn.play').addEventListener('click', () => {
        network.togglePlay();
        const icon = document.querySelector('.control-btn.play i');
        icon.textContent = network.isPlaying ? 'pause' : 'play_arrow';
    });

    // Step button
    document.querySelector('.control-btn:nth-child(2)').addEventListener('click', () => {
        network.step();
    });

    // Reset button
    document.querySelector('.control-btn:nth-child(3)').addEventListener('click', () => {
        network.reset();
    });

    // Regenerate button
    document.querySelector('.regenerate-btn').addEventListener('click', () => {
        network.regenerate();
    });

    // Checkbox listeners
    document.getElementById('showTestData').addEventListener('change', () => {
        network.drawOutputGraph();
    });

    document.getElementById('discretizeOutput').addEventListener('change', () => {
        network.drawOutputGraph();
    });

    // Add slider change listeners to trigger updates
    document.querySelectorAll('.slider').forEach(slider => {
        slider.addEventListener('input', () => {
            // Update value display
            const valueSpan = slider.parentElement.querySelector('.value');
            if (valueSpan) {
                const value = slider.value;
                valueSpan.textContent = slider.parentElement.querySelector('label').textContent.includes('Ratio') ? 
                                      value + '%' : value;
            }
        });
    });
});

window.addEventListener('resize', () => {
    network.initializeNetwork();
});

document.querySelector('.add-layer').addEventListener('click', () => {
    network.addLayer();
});

// Update slider values event listener
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slider').forEach(slider => {
        const valueSpan = slider.parentElement.querySelector('.value');
        
        // Set initial values
        if (valueSpan) {
            const value = slider.value;
            valueSpan.textContent = slider.parentElement.querySelector('label').textContent.includes('Ratio') ? 
                                  value + '%' : value;
        }
        
        // Update on change
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            const valueSpan = e.target.parentElement.querySelector('.value');
            if (valueSpan) {
                valueSpan.textContent = e.target.parentElement.querySelector('label').textContent.includes('Ratio') ? 
                                      value + '%' : value;
            }
        });
    });
}); 
