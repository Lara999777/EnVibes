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
        document.body.style.overflow = 'hidden'; 
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const videos = modal.querySelectorAll('video');
        videos.forEach(vid => vid.pause());
    }
}

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
    const contents = document.querySelectorAll(`#${modalPrefix}-modal .tab-content`);
    contents.forEach(content => {
        content.classList.add('hidden');
        content.classList.remove('active');
    });
    
    const buttons = document.querySelectorAll(`#${modalPrefix}-modal .tab-btn`);
    buttons.forEach(btn => btn.classList.remove('active'));
    
    const targetTab = document.getElementById(`${modalPrefix}-${tabId}`);
    if (targetTab) {
        targetTab.classList.remove('hidden');
        targetTab.classList.add('active');
    }
    
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

/* --- Lightbox --- */
function openLightbox(imgElement) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgElement.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

/* --- CMS Logic --- */
function initCMS() {
    // --- Member News CMS ---
    const NEWS_KEY = 'envibes_member_news_v5'; // 버전업하여 로컬 데이터 초기화 유도
    const defaultNews = `
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
        if (savedData && savedData.trim() !== '') {
            newsDisplay.innerHTML = savedData;
        } else {
            newsDisplay.innerHTML = defaultNews;
            localStorage.setItem(NEWS_KEY, defaultNews);
        }
    }

    if (newsDisplay) loadNews();

    if (editNewsBtn) {
        editNewsBtn.addEventListener('click', () => {
            const currentContent = localStorage.getItem(NEWS_KEY) || defaultNews;
            newsTextarea.value = currentContent;
            newsDisplay.classList.add('hidden');
            newsEditorContainer.classList.remove('hidden');
        });
    }

    if (saveNewsBtn) {
        saveNewsBtn.addEventListener('click', () => {
            const newContent = newsTextarea.value.trim();
            if (newContent) {
                localStorage.setItem(NEWS_KEY, newContent);
                newsDisplay.innerHTML = newContent;
            }
            newsEditorContainer.classList.add('hidden');
            newsDisplay.classList.remove('hidden');
        });
    }

    if (cancelNewsBtn) {
        cancelNewsBtn.addEventListener('click', () => {
            newsEditorContainer.classList.add('hidden');
            newsDisplay.classList.remove('hidden');
        });
    }

    // --- Clubs CMS ---
    const CLUBS_KEY = 'envibes_clubs_v5';
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
        if (savedData && savedData.trim() !== '') {
            clubsDisplay.innerHTML = savedData;
        } else {
            clubsDisplay.innerHTML = defaultClubs;
            localStorage.setItem(CLUBS_KEY, defaultClubs);
        }
    }

    if (clubsDisplay) loadClubs();

    if (editClubsBtn) {
        editClubsBtn.addEventListener('click', () => {
            const currentContent = localStorage.getItem(CLUBS_KEY) || defaultClubs;
            clubsTextarea.value = currentContent;
            clubsDisplay.classList.add('hidden');
            clubsEditorContainer.classList.remove('hidden');
        });
    }

    if (saveClubsBtn) {
        saveClubsBtn.addEventListener('click', () => {
            const newContent = clubsTextarea.value.trim();
            if (newContent) {
                localStorage.setItem(CLUBS_KEY, newContent);
                clubsDisplay.innerHTML = newContent;
            }
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        });
    }

    if (cancelClubsBtn) {
        cancelClubsBtn.addEventListener('click', () => {
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        });
    }
}
