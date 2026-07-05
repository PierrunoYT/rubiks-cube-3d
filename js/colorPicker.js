// ===== COLOR PICKER FUNCTIONALITY =====

import * as State from './state.js';

export function setupColorPicker(scene, renderer, camera) {
  // Handle color selection (clicking the selected swatch again deselects it)
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      const color = parseInt(this.getAttribute('data-color'));
      
      if (State.selectedColor === color) {
        this.classList.remove('selected');
        State.setSelectedColor(null);
        return;
      }
      
      document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
      this.classList.add('selected');
      State.setSelectedColor(color);
    });
  });

  // Track pointer-down position so camera-rotation drags don't paint stickers
  let downX = 0, downY = 0;
  renderer.domElement.addEventListener('mousedown', (event) => {
    downX = event.clientX;
    downY = event.clientY;
  });

  // Handle cube face clicking
  renderer.domElement.addEventListener('click', (event) => {
    // Don't do anything if no color is selected
    if (State.selectedColor === null) return;
    
    // Don't paint while an animation or automated sequence is running
    if (State.isRotating || State.isBusy()) return;
    
    // Ignore clicks that were actually drags (camera rotation or layer drag)
    if (Math.abs(event.clientX - downX) > 5 || Math.abs(event.clientY - downY) > 5) return;
    
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    State.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    State.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the picking ray with the camera and mouse position
    State.raycaster.setFromCamera(State.mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = State.raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
      // Find the first sticker (colored face) that was clicked
      for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        
        // Check if it's a sticker (has colored material and is part of a cubelet)
        if (object.material && object.material.color && 
            object.geometry && object.geometry.type === 'BoxGeometry') {
          
          // Check if it's a sticker by checking its dimensions
          // (stickers are 0.85; the border meshes behind them are 0.87)
          const params = object.geometry.parameters;
          if (params.width < 0.86 && params.height < 0.86 && params.depth < 0.1) {
            // This is a sticker! Change its color
            object.material.color.setHex(State.selectedColor);
            break;
          }
        }
      }
    }
  });
}

