// ===== RESULT MODAL =====
// Themed replacement for native alert() dialogs used to report solve results.

function renderStat(container, item) {
  const wrap = document.createElement('div');
  wrap.className = 'modal-stat';

  if (item.label) {
    const label = document.createElement('div');
    label.className = 'modal-stat-label';
    label.textContent = item.label;
    wrap.appendChild(label);
  }

  const value = document.createElement('div');
  value.className = 'modal-stat-value' + (item.mono ? ' modal-mono' : '');
  value.textContent = item.value;
  wrap.appendChild(value);

  container.appendChild(wrap);
}

// stats render as full-width label/value blocks; statsRow renders a
// compact side-by-side row (e.g. Moves / Time) below them.
export function showModal({ icon = '', title = '', stats = [], statsRow = [] } = {}) {
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;

  const body = document.getElementById('modalBody');
  body.innerHTML = '';

  stats.forEach(item => renderStat(body, item));

  if (statsRow.length > 0) {
    const row = document.createElement('div');
    row.className = 'modal-stat-row';
    statsRow.forEach(item => renderStat(row, item));
    body.appendChild(row);
  }

  document.getElementById('modalOverlay').classList.add('visible');
}

export function hideModal() {
  document.getElementById('modalOverlay').classList.remove('visible');
}

export function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  document.getElementById('modalOkBtn').addEventListener('click', hideModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) hideModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('visible')) hideModal();
  });
}
