document.addEventListener('DOMContentLoaded', () => {

    let sampleMaterials = [
        { 
            id: 1, 
            title: 'Has got - Body parts', 
            type: 'video', 
            grade: '1st Grade', 
            format: 'individual', 
            imageUrl: 'https://img.youtube.com/vi/YdXQaCChQW4/hqdefault.jpg',
            materialLink: 'https://www.youtube.com/watch?v=YdXQaCChQW4', 
            transcription: 'my English practice has got...' 
        }
    ];

    const materialGrid = document.getElementById('material-grid');
    const searchBar = document.getElementById('search-bar');
    const filterType = document.getElementById('filter-type');
    const addMaterialModal = document.getElementById('add-material-modal');
    const addMaterialBtn = document.getElementById('add-material-btn');
    const closeAddModalBtn = document.getElementById('close-add-modal');
    const materialForm = document.getElementById('material-form');
    const radioIndividual = document.getElementById('individual');
    const radioGroup = document.getElementById('group');
    const groupSizeContainer = document.getElementById('group-size-container');
    const transcriptionContainer = document.getElementById('transcription-container');
    const materialTypeSelect = document.getElementById('material-type');
    const detailModal = document.getElementById('material-detail-modal');
    const closeDetailModalBtn = document.getElementById('close-detail-modal');

    function getYouTubeThumbnail(url) {
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})/);
        return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg` : null;
    }

    function renderMaterials(materials) {
        materialGrid.innerHTML = '';
        materials.forEach(material => {
            const card = document.createElement('div');
            card.className = 'material-card';
            card.dataset.id = material.id;

            let thumb = material.imageUrl || (material.type === 'video' ? getYouTubeThumbnail(material.materialLink) : null);
            let thumbContent = thumb ? `<img src="${thumb}">` : `<i class="fas fa-file"></i>`;

            card.innerHTML = `
                <div class="material-thumbnail">${thumbContent}</div>
                <div class="material-info">
                    <h3>${material.title}</h3>
                    <div class="metadata">
                        <span class="tag">${material.type}</span>
                        <span class="tag">${material.grade}</span>
                    </div>
                </div>
            `;
            card.onclick = () => showMaterialDetail(material.id);
            materialGrid.appendChild(card);
        });
    }

    function showMaterialDetail(id) {
        const material = sampleMaterials.find(m => m.id === id);
        if (!material) return;
        
        document.getElementById('detail-title').textContent = material.title;
        document.getElementById('detail-type').textContent = material.type;
        document.getElementById('detail-grade').textContent = material.grade;
        document.getElementById('detail-transcription').textContent = material.transcription || 'No transcription available.';
        
        const thumbContainer = detailModal.querySelector('.detail-thumbnail');
        let thumb = material.imageUrl || (material.type === 'video' ? getYouTubeThumbnail(material.materialLink) : null);
        thumbContainer.innerHTML = thumb ? `<img src="${thumb}">` : `<i class="fas fa-file"></i>`;

        document.getElementById('go-to-material-btn').onclick = () => {
            if (material.materialLink) window.open(material.materialLink, '_blank');
        };

        detailModal.style.display = 'block';
    }

    addMaterialBtn.onclick = () => addMaterialModal.style.display = 'block';
    closeAddModalBtn.onclick = () => addMaterialModal.style.display = 'none';
    closeDetailModalBtn.onclick = () => detailModal.style.display = 'none';

    radioGroup.onchange = () => groupSizeContainer.style.display = 'block';
    radioIndividual.onchange = () => groupSizeContainer.style.display = 'none';

    materialTypeSelect.onchange = (e) => {
        transcriptionContainer.style.display = (e.target.value === 'video' || e.target.value === 'audio') ? 'block' : 'none';
    };

    materialForm.onsubmit = (e) => {
        e.preventDefault();
        const newM = {
            id: Date.now(),
            title: document.getElementById('material-title').value,
            type: materialTypeSelect.value,
            grade: document.getElementById('material-grade').value,
            materialLink: document.getElementById('material-link').value,
            transcription: document.getElementById('material-transcription').value
        };
        sampleMaterials.unshift(newM);
        renderMaterials(sampleMaterials);
        addMaterialModal.style.display = 'none';
        materialForm.reset();
    };

    renderMaterials(sampleMaterials);
});
