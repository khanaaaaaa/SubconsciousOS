# SubconsciousOS

A surreal desktop interface that remembers, reacts, and evolves with use.

**[Live Demo](https://khanaaaaaa.github.io/SubconsciousOS/)**

## Overview

SubconsciousOS is an experimental browser-based desktop environment where the system behaves as if it has memory. Unlike traditional interfaces, it subtly changes over time — windows drift, icons shift positions, and glitches appear like fragments of stored memories resurfacing.

## Features

### Reactive Behaviors
- **Clock App**: Randomly freezes or jumps in time, hands turn red when frozen
- **Notes App**: Auto-types corrupted text, recovers old notes, randomly deletes lines
- **Files App**: Files duplicate, move, and reorganize themselves autonomously
- **Usage Patterns**: Apps react differently based on how often they're used

### Visual Effects
- **Icon Drift**: Icons slowly drift and leave afterimages when hovered
- **Window Drift**: Windows subtly move on their own when idle
- **Ghost Windows**: Transparent copies appear when windows are closed
- **Spontaneous Movement**: Icons occasionally move even when settled
- **Glitch Animations**: Color shifts, flickers, and distortions throughout

### Audio Feedback
- **Glitch Sounds**: Random frequency oscillations on movement
- **Whispers**: Soft tones on clicks
- **Bells**: High-pitched sounds on hover

## Usage

1. Open `index.html` in a modern browser
2. Double-click icons to open apps
3. Interact with the system — it remembers everything
4. Return later to see how it's changed

## Technical Details

- Pure HTML/CSS/JavaScript
- localStorage for persistence
- Web Audio API for procedural sounds
- Canvas API for clock rendering
- No external dependencies

## Apps

- **Clock**: Spinning hands that freeze and jump unpredictably
- **Notes**: Auto-typing corrupted text with memory recovery
- **Files**: Self-organizing file system with duplication and movement

## Memory Storage

The system stores:
- Icon positions
- App open counts
- Note history (last 20 entries)
- User interactions (last 50 events)
- Last session timestamp

Clear browser localStorage to reset memory.
