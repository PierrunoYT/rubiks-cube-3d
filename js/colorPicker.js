// ===== COLOR PICKER FUNCTIONALITY =====

import * as State from './state.js';

export function setupColorPicker(scene, renderer, camera) {
  // Handle color selection
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      this.classList.add('selected');
      
      // Store selected color
      State.setSelectedColor(parseInt(this.getAttribute('data-color')));
    });
  });

  // Handle cube face clicking
  renderer.domElement.addEventListener('click', (event) => {
    // Don't do anything if no color is selected
    if (State.selectedColor === null) return;
    
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
          const params = object.geometry.parameters;
          if (params.width < 0.9 && params.height < 0.9 && params.depth < 0.1) {
            // This is a sticker! Change its color
            object.material.color.setHex(State.selectedColor);
            break;
          }
        }
      }
    }
  });
}

