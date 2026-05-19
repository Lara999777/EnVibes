/* ==========================================================================
   EnVibes JavaScript Logic
   ========================================================================== */

/* --- Constants --- */
const AUTH_KEY = 'envibes_auth_v1';
const USERS_KEY = 'envibes_users_v1';
const ADMIN_PIN = '1fbyep';

/* ==========================================================================
   Initialization
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initDropdown();
    checkAuth();

    document.getElementById('login-btn').addEventListener('click', login);
    document.getElementById('login-pin').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') login();
    });
});

/* ==========================================================================
   Auth System
   ========================================================================== */
function getUsers() {
    const saved = localStorage.getItem(USERS_KEY);
    if (saved) {
        try { return JSON.parse(saved); }
        catch(e) { return []; }
    }
    return [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getAuth() {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) {
        try { return JSON.parse(saved); }
        catch(e) { return null; }
    }
    return null;
}

function checkAuth() {
    const auth = getAuth();
    if (auth && auth.name) {
        showMainContent(auth);
    } else {
        showLoginScreen();
    }
}

function showLoginScreen() {
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('app-container').style.display = 'none';
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    populateUserDropdown();
}

function showMainContent(auth) {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('app-container').style.display = '';

    const greeting = document.getElementById('user-greeting');
    if (greeting) greeting.textContent = auth.isAdmin ? '관리자' : (auth.name + '님');

    const adminBtn = document.getElementById('admin-btn');
    if (adminBtn) adminBtn.classList.toggle('hidden', !auth.isAdmin);

    initCMS();
}

function login() {
    const wrapper = document.getElementById('select-wrapper');
    const selectedUser = wrapper.dataset.selected;
    const pin = document.getElementById('login-pin').value.trim();

    if (!selectedUser) {
        showError('사용자를 선택해주세요.');
        return;
    }
    if (!pin) {
        showError('비밀번호를 입력해주세요.');
        return;
    }

    // Admin login
    if (selectedUser === '__admin__') {
        if (pin === ADMIN_PIN) {
            localStorage.setItem(AUTH_KEY, JSON.stringify({ name: '관리자', isAdmin: true, loginTime: Date.now() }));
            showMainContent({ name: '관리자', isAdmin: true });
        } else {
            showError('관리자 비밀번호가 일치하지 않습니다.');
        }
        return;
    }

    // Regular user login
    const users = getUsers();
    const user = users.find(u => u.name === selectedUser);
    if (!user) {
        showError('등록되지 않은 사용자입니다.');
        return;
    }
    if (user.pin !== pin) {
        showError('비밀번호가 일치하지 않습니다.');
        return;
    }

    const auth = { name: user.name, department: user.department, isAdmin: false, loginTime: Date.now() };
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
    showMainContent(auth);
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    document.getElementById('login-pin').value = '';
    const wrapper = document.getElementById('select-wrapper');
    wrapper.dataset.selected = '';
    document.getElementById('select-text').textContent = '선택하세요';
    document.getElementById('select-text').classList.remove('selected');
    showLoginScreen();
}

function showError(msg) {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    setTimeout(() => errorEl.classList.add('hidden'), 3000);
}

/* ==========================================================================
   Custom Dropdown
   ========================================================================== */
function populateUserDropdown() {
    const users = getUsers();
    const optionsEl = document.getElementById('user-options');

    let html = '<div class="select-option admin-option" data-value="__admin__"><i class="fas fa-shield-halved"></i> 관리자</div>';

    if (users.length > 0) {
        html += '<div class="select-divider"></div>';
        const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        sorted.forEach(u => {
            html += '<div class="select-option" data-value="' + u.name + '"><span class="option-name">' + u.name + '</span><span class="option-dept">' + (u.department || '') + '</span></div>';
        });
    }

    optionsEl.innerHTML = html;

    optionsEl.querySelectorAll('.select-option').forEach(opt => {
        opt.addEventListener('click', () => {
            const value = opt.dataset.value;
            const displayName = value === '__admin__' ? '관리자' : value;
            document.getElementById('select-wrapper').dataset.selected = value;
            document.getElementById('select-text').textContent = displayName;
            document.getElementById('select-text').classList.add('selected');
            document.getElementById('select-panel').classList.add('hidden');
            document.getElementById('login-pin').focus();
        });
    });
}

function initDropdown() {
    const display = document.getElementById('select-display');
    const panel = document.getElementById('select-panel');
    const search = document.getElementById('user-search');

    display.addEventListener('click', () => {
        panel.classList.toggle('hidden');
        if (!panel.classList.contains('hidden')) {
            search.value = '';
            filterDropdown('');
            search.focus();
        }
    });

    search.addEventListener('input', () => filterDropdown(search.value.trim()));

    document.addEventListener('click', (e) => {
        if (!document.getElementById('select-wrapper').contains(e.target)) {
            panel.classList.add('hidden');
        }
    });
}

function filterDropdown(query) {
    const options = document.querySelectorAll('#user-options .select-option');
    const divider = document.querySelector('#user-options .select-divider');

    options.forEach(opt => {
        const name = opt.textContent.toLowerCase();
        opt.style.display = (!query || name.includes(query.toLowerCase())) ? '' : 'none';
    });

    if (divider) divider.style.display = query ? 'none' : '';
}

/* ==========================================================================
   Admin User Management
   ========================================================================== */
function addUser() {
    const nameInput = document.getElementById('add-name');
    const deptInput = document.getElementById('add-dept');
    const pinInput = document.getElementById('add-pin');

    const name = nameInput.value.trim();
    const department = deptInput.value.trim();
    const pin = pinInput.value.trim();

    if (!name || !pin) {
        alert('이름과 비밀번호(휴대폰 뒤 4자리)는 필수입니다.');
        return;
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        alert('비밀번호는 숫자 4자리여야 합니다.');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.name === name)) {
        alert('이미 등록된 사용자입니다.');
        return;
    }

    users.push({ name, department, pin });
    saveUsers(users);

    nameInput.value = '';
    deptInput.value = '';
    pinInput.value = '';

    renderAdminUserList();
    populateUserDropdown();
}

function bulkImportUsers() {
    const textarea = document.getElementById('bulk-import');
    const text = textarea.value.trim();
    if (!text) {
        alert('데이터를 입력해주세요.');
        return;
    }

    const users = getUsers();
    const lines = text.split('\n').filter(l => l.trim());
    let added = 0;
    let skipped = 0;

    lines.forEach(line => {
        const parts = line.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            const name = parts[0];
            const department = parts.length >= 3 ? parts[1] : '';
            const pin = parts.length >= 3 ? parts[2] : parts[1];

            if (name && pin && pin.length === 4 && /^\d{4}$/.test(pin)) {
                if (!users.find(u => u.name === name)) {
                    users.push({ name, department, pin });
                    added++;
                } else {
                    skipped++;
                }
            }
        }
    });

    saveUsers(users);
    textarea.value = '';
    alert(added + '명 추가 완료' + (skipped > 0 ? ', ' + skipped + '명 중복 건너뜀' : ''));
    renderAdminUserList();
    populateUserDropdown();
}

function removeUser(name) {
    if (!confirm('"' + name + '" 사용자를 삭제하시겠습니까?\n(퇴사자 처리)')) return;

    let users = getUsers();
    users = users.filter(u => u.name !== name);
    saveUsers(users);

    renderAdminUserList();
    populateUserDropdown();
}

function renderAdminUserList() {
    const users = getUsers();
    const listEl = document.getElementById('admin-user-list');
    const countEl = document.getElementById('user-count');

    countEl.textContent = users.length;

    if (users.length === 0) {
        listEl.innerHTML = '<p class="admin-empty">등록된 사용자가 없습니다.<br>위 양식으로 사용자를 추가해주세요.</p>';
        return;
    }

    const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    listEl.innerHTML = sorted.map(u =>
        '<div class="admin-user-row">' +
            '<div class="admin-user-info">' +
                '<span class="admin-user-name">' + u.name + '</span>' +
                '<span class="admin-user-dept">' + (u.department || '-') + '</span>' +
            '</div>' +
            '<button class="btn-delete" onclick="removeUser(\'' + u.name.replace(/'/g, "\\'") + '\')"><i class="fas fa-trash-alt"></i></button>' +
        '</div>'
    ).join('');
}

/* ==========================================================================
   Modals
   ========================================================================== */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    if (modalId === 'admin-modal') renderAdminUserList();
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.querySelectorAll('video').forEach(vid => vid.pause());
    }
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        document.body.style.overflow = '';
        event.target.querySelectorAll('video').forEach(vid => vid.pause());
    }
};

/* ==========================================================================
   Tabs
   ========================================================================== */
function switchTab(modalPrefix, tabId) {
    const modal = document.getElementById(modalPrefix + '-modal');
    if (!modal) return;

    modal.querySelectorAll('.tab-content').forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('active');
    });

    modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById(modalPrefix + '-' + tabId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

function switchSubTab(sectionPrefix, tabId) {
    const contents = document.querySelectorAll('.sub-tab-content');
    contents.forEach(c => {
        c.classList.add('hidden');
        c.classList.remove('active');
    });

    const buttons = document.querySelectorAll('.sub-tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    const target = document.getElementById(sectionPrefix + '-' + tabId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

/* ==========================================================================
   Lightbox
   ========================================================================== */
function viewImage(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

/* ==========================================================================
   CMS Logic
   ========================================================================== */
function initCMS() {
    // --- Member News CMS ---
    const NEWS_KEY = 'envibes_member_news_v5';
    const defaultNews = '<div class="news-item"><i class="fas fa-ring"></i> <span><strong>\uacb0\ud63c \uc18c\uc2dd!</strong> 5/31 \uae30\uc5c5\ubc1c\uc804\uadf8\ub8f9 Lara\uc758 \uacb0\ud63c\uc744 \ucd95\ud558\ud574\uc8fc\uc138\uc694! \ud83c\udf89</span></div>\n<div class="news-item"><i class="fas fa-baby-carriage"></i> <span><strong>\ucd9c\uc0b0 \uc18c\uc2dd!</strong> \ud488\uc9c8\uad00\ub9ac\uadf8\ub8f9 Leo\uc758 \ub458\uc9f8 \ucd9c\uc0b0\uc744 \ucd95\ud558\ud574\uc8fc\uc138\uc694! \ud83c\udf89</span></div>';

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
        editNewsBtn.onclick = () => {
            newsTextarea.value = localStorage.getItem(NEWS_KEY) || defaultNews;
            newsDisplay.classList.add('hidden');
            newsEditorContainer.classList.remove('hidden');
        };
    }

    if (saveNewsBtn) {
        saveNewsBtn.onclick = () => {
            const newContent = newsTextarea.value.trim();
            if (newContent) {
                localStorage.setItem(NEWS_KEY, newContent);
                newsDisplay.innerHTML = newContent;
            }
            newsEditorContainer.classList.add('hidden');
            newsDisplay.classList.remove('hidden');
        };
    }

    if (cancelNewsBtn) {
        cancelNewsBtn.onclick = () => {
            newsEditorContainer.classList.add('hidden');
            newsDisplay.classList.remove('hidden');
        };
    }

    // --- Clubs CMS ---
    const CLUBS_KEY = 'envibes_clubs_v5';
    const defaultClubs = '<span class="chip"><i class="fas fa-book"></i> \ub3c5\uc11c(Leo)</span>\n<span class="chip"><i class="fas fa-door-open"></i> \ubc29\ud0c8\ucd9c(Olaf)</span>\n<span class="chip"><i class="fas fa-table-tennis-paddle-ball"></i> \ubc30\ub4dc\ubbfc\ud134(Liam)</span>\n<span class="chip"><i class="fas fa-camera"></i> \uc0ac\uc9c4\ubb38\ud654\uc608\uc220(Lena)</span>\n<span class="chip"><i class="fas fa-golf-ball-tee"></i> \uc2a4\ud06c\ub9b0\uace8\ud504(Teo)</span>\n<span class="chip"><i class="fas fa-person-hiking"></i> \uc564\ud2b8\ub808\ud0b9(Leo)</span>\n<span class="chip"><i class="fas fa-film"></i> \uc601\ud654(Logan)</span>\n<span class="chip"><i class="fas fa-dumbbell"></i> \uccb4\ub825\uc99d\uc9c4(Simon)</span>\n<span class="chip"><i class="fas fa-baseball"></i> \ud14c\ub2c8\uc2a4(Eric)</span>';

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
        editClubsBtn.onclick = () => {
            clubsTextarea.value = localStorage.getItem(CLUBS_KEY) || defaultClubs;
            clubsDisplay.classList.add('hidden');
            clubsEditorContainer.classList.remove('hidden');
        };
    }

    if (saveClubsBtn) {
        saveClubsBtn.onclick = () => {
            const newContent = clubsTextarea.value.trim();
            if (newContent) {
                localStorage.setItem(CLUBS_KEY, newContent);
                clubsDisplay.innerHTML = newContent;
            }
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        };
    }

    if (cancelClubsBtn) {
        cancelClubsBtn.onclick = () => {
            clubsEditorContainer.classList.add('hidden');
            clubsDisplay.classList.remove('hidden');
        };
    }
}
