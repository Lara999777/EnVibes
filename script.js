/* ==========================================================================
   EnVibes JavaScript Logic
   ========================================================================== */

/* --- Constants --- */
const AUTH_KEY = 'envibes_auth_v1';
const USERS_KEY = 'envibes_users_v2';
const ADMIN_PIN = '1fbyep';

/* --- Default User List (from attendance-records) --- */
const DEFAULT_USERS = [
    {name:"곽기업",department:"비전기술",pin:"4370"},
    {name:"곽하능",department:"비전기술",pin:"0353"},
    {name:"고정재",department:"품질관리",pin:"4505"},
    {name:"권보라",department:"기업발전",pin:"7975"},
    {name:"김경태",department:"품질관리",pin:"2524"},
    {name:"김기원",department:"품질관리",pin:"0737"},
    {name:"김문정",department:"제품기획",pin:"8086"},
    {name:"김병도",department:"솔루션영업",pin:"2125"},
    {name:"김다애",department:"광학기술",pin:"0329"},
    {name:"김성태",department:"솔루션영업",pin:"3040"},
    {name:"김수룡",department:"AE",pin:"8577"},
    {name:"김수영",department:"AE",pin:"5943"},
    {name:"김아영",department:"품질관리",pin:"8151"},
    {name:"김우섭",department:"광학기술",pin:"4592"},
    {name:"김윤숙",department:"품질관리",pin:"0105"},
    {name:"김태형",department:"전략구매",pin:"3023"},
    {name:"김하랑",department:"솔컴",pin:"8291"},
    {name:"김학길",department:"AE",pin:"3300"},
    {name:"김현수",department:"전략구매",pin:"5361"},
    {name:"김회만",department:"제조기술",pin:"4897"},
    {name:"김진영",department:"광학기술",pin:"6457"},
    {name:"김지은",department:"솔컴",pin:"0329"},
    {name:"김창범",department:"AE",pin:"9358"},
    {name:"류진성",department:"AE",pin:"1934"},
    {name:"배경원",department:"영업관리",pin:"9601"},
    {name:"백남석",department:"IMT",pin:"4182"},
    {name:"박경희",department:"IMT",pin:"5287"},
    {name:"박창재",department:"경영진",pin:"3678"},
    {name:"박종만",department:"재경",pin:"4319"},
    {name:"박채민",department:"비전기술",pin:"6104"},
    {name:"박철성",department:"기업발전",pin:"5505"},
    {name:"박지선",department:"솔루션영업",pin:"2859"},
    {name:"박지안",department:"비전기술",pin:"7934"},
    {name:"박주형",department:"제조기술",pin:"7755"},
    {name:"박태희",department:"제조기술",pin:"7192"},
    {name:"박효진",department:"IMT",pin:"8415"},
    {name:"조용균",department:"솔루션영업",pin:"6353"},
    {name:"조혜현",department:"솔컴",pin:"6912"},
    {name:"나동수",department:"광학기술",pin:"8182"},
    {name:"남유진",department:"전략구매",pin:"6756"},
    {name:"노윤성",department:"제품기획",pin:"1546"},
    {name:"노태승",department:"제조기술",pin:"0448"},
    {name:"서지환",department:"솔루션영업",pin:"4697"},
    {name:"손혜주",department:"영업관리",pin:"0900"},
    {name:"신광식",department:"비전기술",pin:"1324"},
    {name:"신상구",department:"광학기술",pin:"3933"},
    {name:"심보현",department:"영업관리",pin:"5311"},
    {name:"안정우",department:"제조기술",pin:"0617"},
    {name:"양근영",department:"솔루션영업",pin:"6170"},
    {name:"양시창",department:"영업관리",pin:"3825"},
    {name:"양찬석",department:"제품기획",pin:"0183"},
    {name:"엄현빈",department:"품질관리",pin:"8596"},
    {name:"연관모",department:"비전기술",pin:"3629"},
    {name:"염태선",department:"IMT",pin:"8842"},
    {name:"유병훈",department:"솔루션영업",pin:"9628"},
    {name:"유승호",department:"제조기술",pin:"4456"},
    {name:"유원영",department:"기업발전",pin:"7916"},
    {name:"유태호",department:"광학기술",pin:"9849"},
    {name:"윤대영",department:"품질관리",pin:"2907"},
    {name:"윤상희",department:"재경",pin:"7624"},
    {name:"윤장호",department:"솔루션영업",pin:"3657"},
    {name:"이주한",department:"광학기술",pin:"6917"},
    {name:"이중연",department:"비전기술",pin:"9383"},
    {name:"이규섭",department:"광학기술",pin:"0010"},
    {name:"이충환",department:"AE",pin:"9063"},
    {name:"이병훈",department:"솔루션영업",pin:"0341"},
    {name:"이대겸",department:"솔루션영업",pin:"9808"},
    {name:"이성일",department:"AE",pin:"2706"},
    {name:"이용석",department:"광학기술",pin:"9422"},
    {name:"이용희",department:"AE",pin:"4694"},
    {name:"이재열",department:"비전기술",pin:"5687"},
    {name:"이은비",department:"영업관리",pin:"7595"},
    {name:"이현호",department:"AE",pin:"5355"},
    {name:"이명호",department:"제조기술",pin:"9844"},
    {name:"임병학",department:"솔루션영업",pin:"6190"},
    {name:"임수찬",department:"전략구매",pin:"2142"},
    {name:"임해동",department:"광학기술",pin:"1570"},
    {name:"장진욱",department:"제조기술",pin:"1505"},
    {name:"전윤선",department:"기업발전",pin:"8272"},
    {name:"전제민",department:"영업관리",pin:"3021"},
    {name:"전명갑",department:"광학기술",pin:"0175"},
    {name:"전찬우",department:"IMT",pin:"6536"},
    {name:"정세영",department:"제품기획",pin:"8723"},
    {name:"정용범",department:"광학기술",pin:"5472"},
    {name:"정훈재",department:"솔루션영업",pin:"0272"},
    {name:"정진묵",department:"AE",pin:"9502"},
    {name:"허성호",department:"제품기획",pin:"5478"},
    {name:"황주연",department:"솔루션영업",pin:"1818"},
    {name:"목한상",department:"비전기술",pin:"0706"},
    {name:"진예섭",department:"AE",pin:"6725"},
    {name:"지원수",department:"IMT",pin:"6714"},
    {name:"최성진",department:"비전기술",pin:"1055"},
    {name:"최준한",department:"품질관리",pin:"5571"},
    {name:"최학범",department:"광학기술",pin:"0691"},
    {name:"최희진",department:"솔루션영업",pin:"6442"}
];

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
        catch(e) { /* fall through to seed */ }
    }
    // Seed with default users on first load
    saveUsers(DEFAULT_USERS);
    return [...DEFAULT_USERS];
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
