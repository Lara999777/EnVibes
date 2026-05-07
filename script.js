/* ==========================================================================
   EnVibes JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCMS();
});

/* --- Modals --- */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video if modal closes
        const videos = modal.querySelectorAll('video');
        videos.forEach(vid => vid.pause());
    }
}

// Close modal on outside click
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = '';
        
        const videos = event.target.querySelectorAll('video');
        videos.forEach(vid => vid.pause());
    }
}

/* --- Tabs --- */
function switchTab(modalPrefix, tabId) {
    // Hide all tabs
    const contents = document.querySelectorAll(`#${modalPrefix}-modal .tab-content`);
    contents.forEach(content => content.classList.add('hidden'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Deactivate all buttons
    const buttons = document.querySelectorAll(`#${modalPrefix}-modal .tab-btn`);
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show active tab
    document.getElementById(`${modalPrefix}-${tabId}`).classList.remove('hidden');
    document.getElementById(`${modalPrefix}-${tabId}`).classList.add('active');
    
    // Activate clicked button
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    // CSR PDF 렌더링 초기화
    if (tabId === 'csr' && !window.csrPdfRendered) {
        window.csrPdfRendered = true;
        renderPDF('CSR/2023년도 드림앤비젼 결과보고.pdf', 'pdf-canvas-2023', 'pdf-loader-2023');
    }
}

/* --- Sub Tabs --- */
function switchSubTab(prefix, subTabId) {
    const section = document.getElementById(`esg-${prefix}`);
    if (!section) return;
    
    // Hide all sub-tabs
    const contents = section.querySelectorAll('.sub-tab-content');
    contents.forEach(content => content.classList.add('hidden'));
    contents.forEach(content => content.classList.remove('active'));
    
    // Deactivate all sub-tab buttons
    const buttons = section.querySelectorAll('.sub-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show active sub-tab
    const targetContent = document.getElementById(`${prefix}-${subTabId}`);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.add('active');
    }
    
    // Activate clicked button
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    if (prefix === 'csr') {
        const year = subTabId;
        const pdfUrl = year === '2023' 
            ? 'CSR/2023년도 드림앤비젼 결과보고.pdf' 
            : 'CSR/2024 드림앤비젼 결과보고.pdf';
        renderPDF(pdfUrl, `pdf-canvas-${year}`, `pdf-loader-${year}`);
    }
}

/* --- PDF Renderer --- */
let renderingPdfs = {};
async function renderPDF(url, containerId, loaderId) {
    if (renderingPdfs[containerId]) return;
    renderingPdfs[containerId] = true;

    const container = document.getElementById(containerId);
    const loader = document.getElementById(loaderId);
    if (!container || !loader) return;

    loader.style.display = 'block';

    try {
        const loadingTask = pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        const numPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            container.appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
        }
    } catch (err) {
        container.innerHTML = `<div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
            <iframe src="${url}" style="width: 100%; height: 100%; flex-grow: 1; border: none; border-radius: 8px;"></iframe>
            <div style="padding: 10px; font-size: 0.85rem; color: var(--text-secondary); text-align: center;">
                브라우저 환경(로컬 파일 등)에 따라 자체 뷰어로 표시됩니다.
            </div>
        </div>`;
    } finally {
        loader.style.display = 'none';
    }
}

/* --- Lightbox --- */
function viewImage(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

/* --- CMS Logic --- */
function initCMS() {
    // --- Member News CMS ---
    const NEWS_KEY = 'envibes_member_news_v2';
    const defaultNews = `
<div class="news-item"><i class="fas fa-cake-candles"></i> <span><strong>생일 축하해요!</strong> 5월에는 OOO님의 생일이 있습니다.</span></div>
<div class="news-item"><i class="fas fa-ring"></i> <span><strong>결혼 소식!</strong> 5/31 기업발전그룹 Lara의 결혼을 축하해주세요! 🎉</span></div>
<div class="news-item"><i class="fas fa-baby-carriage"></i> <span><strong>출산 소식!</strong> 품질관리그룹 Leo의 둘째 출산을 축하해주세요! 🎉</span></div>
    `.trim();

    const newsDisplay = document.getElementById('news-display');
    const newsEditorContainer = document.getElementById('news-editor-container');
    const newsTextarea = document.getElementById('news-editor');
    
    const editNewsBtn = document.getElementById('edit-news-btn');
    const saveNewsBtn = document.getElementById('save-news-btn');
    const cancelNewsBtn = document.getElementById('cancel-news-btn');

    function loadNews() {
        const savedData = localStorage.getItem(NEWS_KEY);
        if (savedData) {
            newsDisplay.innerHTML = savedData;
        } else {
            newsDisplay.innerHTML = defaultNews;
            localStorage.setItem(NEWS_KEY, defaultNews);
        }
    }

    loadNews();

    editNewsBtn.addEventListener('click', () => {
        const currentContent = localStorage.getItem(NEWS_KEY) || defaultNews;
        newsTextarea.value = currentContent;
        newsDisplay.classList.add('hidden');
        newsEditorContainer.classList.remove('hidden');
    });

    saveNewsBtn.addEventListener('click', () => {
        const newContent = newsTextarea.value.trim();
        if (newContent) {
            localStorage.setItem(NEWS_KEY, newContent);
            newsDisplay.innerHTML = newContent;
        }
        newsEditorContainer.classList.add('hidden');
        newsDisplay.classList.remove('hidden');
    });

    cancelNewsBtn.addEventListener('click', () => {
        newsEditorContainer.classList.add('hidden');
        newsDisplay.classList.remove('hidden');
    });

    // --- Clubs CMS ---
    const CLUBS_KEY = 'envibes_clubs_data_v3';
    const defaultClubs = `
<span class="chip"><i class="fas fa-book"></i> 독서(Leo)</span>
<span class="chip"><i class="fas fa-door-open"></i> 방탈출(Olaf)</span>
<span class="chip"><i class="fas fa-table-tennis-paddle-ball"></i> 배드민턴(Liam)</span>
<span class="chip"><i class="fas fa-camera"></i> 사진문화예술(Lena)</span>
<span class="chip"><i class="fas fa-golf-ball-tee"></i> 스크린골프(Teo)</span>
<span class="chip"><i class="fas fa-person-hiking"></i> 앤트레킹(Leo)</span>
<span class="chip"><i class="fas fa-film"></i> 영화(Logan)</span>
<span class="chip"><i class="fas fa-dumbbell"></i> 체력증진(Simon)</span>
<span class="chip"><i class="fas fa-baseball"></i> 테니스(Eric)</span>
    `.trim();

    const clubsDisplay = document.getElementById('clubs-display');
    const clubsEditorContainer = document.getElementById('clubs-editor-container');
    const clubsTextarea = document.getElementById('clubs-editor');
    
    const editClubsBtn = document.getElementById('edit-clubs-btn');
    const saveClubsBtn = document.getElementById('save-clubs-btn');
    const cancelClubsBtn = document.getElementById('cancel-clubs-btn');

    function loadClubs() {
        const savedData = localStorage.getItem(CLUBS_KEY);
        if (savedData) {
            clubsDisplay.innerHTML = savedData;
        } else {
            clubsDisplay.innerHTML = defaultClubs;
            localStorage.setItem(CLUBS_KEY, defaultClubs);
        }
    }

    loadClubs();

    if (editClubsBtn) {
        editClubsBtn.addEventListener('click', () => {
            const currentContent = localStorage.getItem(CLUBS_KEY) || defaultClubs;
            clubsTextarea.value = currentContent;
            clubsDisplay.classList.add('hidden');
            clubsEditorContainer.classList.remove('hidden');
        });

        saveClubsBtn.addEventListener('click', () => {
            const newContent = clubsTextarea.value.trim();
            if (newContent) {
                localStorage.setItem(CLUBS_KEY, newContent);
                clubsDisplay.innerHTML = newContent;
            }
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        });

        cancelClubsBtn.addEventListener('click', () => {
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        });
    }
}
