from flask import Flask, request, jsonify, render_template
import torch
import numpy as np
from src.models.network import DynamicNetwork
from src.utils.data_processor import DataProcessor
from src.visualization.visualizer import VisualizationManager
from src.training.trainer import ModelTrainer
import os

app = Flask(__name__)

# Initialize components
model = None
data_processor = DataProcessor()
visualizer = VisualizationManager()
trainer = ModelTrainer()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/train', methods=['POST'])
def train():
    data = request.json
    try:
        results = trainer.train_step()
        return jsonify({
            'success': True,
            'loss': float(results['loss']),
            'accuracy': float(results['accuracy'])
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/reset', methods=['POST'])
def reset():
    try:
        global model
        config = request.json
        model = trainer.create_model(config)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
