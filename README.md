# Language Learning Lab Neural Network Visualizer

An interactive Flask-based prototype built for the Learning Language Lab to make neural networks
more understandable through direct manipulation and visual feedback. The project combines a
browser-based control surface with canvas visualizations so users can explore how different
settings affect network structure, generated data, and output behavior.

## What this project demonstrates

- A user-facing interface for experimenting with neural network concepts instead of only reading
  about them.
- Front-end controls for learning rate, activation function, regularization, data ratio, noise,
  batch size, and problem type.
- Canvas-based visualizations for network structure, layer connections, and output-space behavior.
- Lightweight Flask app structure for serving the interactive interface locally.
- JavaScript logic for animation, control state, layer updates, and regenerated sample data.

## My contribution

This repo represents my Learning Language Lab work around neural network visualization and
research communication. I focused on translating machine learning ideas into an interface that
feels approachable, interactive, and visually legible for users who need to inspect model behavior
rather than treat it like a black box.

Highlights of the work include:

- Designing the interactive front-end experience and control layout.
- Building the network visualization and output graph behavior in JavaScript.
- Creating adjustable controls for hyperparameters and dataset conditions.
- Structuring the project as a Flask app for local use and demonstration.
- Turning technical ML ideas into a clearer visual tool for research and learning contexts.

## Screenshots

### Main interface

![Neural Network Visualizer interface](docs/screenshots/visualizer-interface.png)

### Visual detail

![Visualizer detail view](docs/screenshots/visualizer-detail.jpg)

## Feature walkthrough

### 1. Interactive controls

The interface lets users adjust:

- Learning rate
- Activation function
- Regularization type
- Regularization rate
- Problem type
- Training data ratio
- Noise level
- Batch size

### 2. Network visualization

The main canvas renders neural layers and connections dynamically. Users can add hidden layers and
see the structure update immediately, which makes the architecture easier to inspect than a
text-only model description.

### 3. Output visualization

The output graph shows generated sample points, training/testing loss readouts, and toggles for
test-data visibility and discretized output, helping users think through how the model behaves
under different settings.

### 4. Regeneration and animation

The JavaScript layer supports playback controls, resetting, regenerated sample data, and basic
state updates tied to the sliders and buttons in the UI.

## Tech stack

- Python
- Flask
- JavaScript
- HTML
- CSS
- TensorFlow
- PyTorch
- NumPy
- pandas
- matplotlib
- scikit-learn
- seaborn

## Repository structure

```text
Language-Learning-Lab/
├── app.py
├── requirements.txt
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── script.js
├── src/
│   └── models/
│       └── network.py
└── docs/
    └── screenshots/
```

## Running locally

```bash
git clone https://github.com/elee33/Language-Learning-Lab.git
cd Language-Learning-Lab
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Then open `http://127.0.0.1:5000` in your browser.

## Current state

This repository is best understood as an interactive visualization prototype and presentation tool.
The current app emphasizes interface exploration, front-end controls, and visual explanation of
neural-network behavior. The `src/models/network.py` module is still lightweight, so the repo today
shows more of the product and visualization layer than a full production training pipeline.

## Why it matters

One of the most valuable parts of this project was learning how to make technical systems easier to
inspect and explain. Instead of only optimizing a model behind the scenes, this work focused on
helping users see what the model is doing and how parameter choices influence its behavior, which
is exactly the kind of bridge between AI and usability that I care about.
