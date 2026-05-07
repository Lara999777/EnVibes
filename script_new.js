
/* --- CMS Logic --- */
function initCMS() {
    // --- Member News CMS ---
    const NEWS_KEY = 'envibes_member_news_v4'; 
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
    const CLUBS_KEY = 'envibes_clubs_v4';
    const defaultClubs = `
<div class="club-tag">독서(Leo)</div>
<div class="club-tag">방탈출(Olaf)</div>
<div class="club-tag">배드민턴(Liam)</div>
<div class="club-tag">사진문화예술(Lena)</div>
<div class="club-tag">스크린골프(Teo)</div>
<div class="club-tag">앤트레킹(Leo)</div>
<div class="club-tag">영화(Logan)</div>
<div class="club-tag">체력증진(Simon)</div>
<div class="club-tag">테니스(Eric)</div>
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
