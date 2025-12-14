// ===== helpers =====
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

// ===== mobile menu =====
const menuBtn = $("#menuBtn");
const mobilePanel = $("#mobilePanel");

if (menuBtn && mobilePanel) {
    menuBtn.addEventListener("click", () => {
        mobilePanel.classList.toggle("open");
    });

    // 메뉴 눌렀을 때 닫기
    $$("#mobilePanel a").forEach(a => {
        a.addEventListener("click", () => mobilePanel.classList.remove("open"));
    });
}

// ===== smooth scroll + active link =====
const links = $$('.nav a, .mobile-panel a');

links.forEach(a => {
    a.addEventListener("click", (e) => {
        const href = a.getAttribute("href");
        if (!href || !href.startsWith("#")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const sections = ["#home", "#about", "#experience", "#portfolio"]
    .map(id => document.querySelector(id))
    .filter(Boolean);

const setActive = () => {
    const y = window.scrollY + 90;
    let current = "#home";

    for (const sec of sections) {
        if (sec.offsetTop <= y) current = "#" + sec.id;
    }

    $$('.nav a').forEach(a => a.classList.toggle("active", a.getAttribute("href") === current));
};
window.addEventListener("scroll", setActive);
setActive();

// ===== tabs + more =====
const tabs = $$(".tab");
const items = $$(".port-item");
const moreBtn = $("#moreBtn");

let currentCat = "all";
let showCount = 6;

function applyFilter() {
    const filtered = items.filter(it => currentCat === "all" || it.dataset.category === currentCat);

    filtered.forEach((it, idx) => {
        it.style.display = (idx < showCount) ? "grid" : "none";
    });
    // 다른 카테고리는 전부 숨김
    items
        .filter(it => !filtered.includes(it))
        .forEach(it => it.style.display = "none");

    if (moreBtn) {
        moreBtn.style.display = (filtered.length > showCount) ? "inline-flex" : "none";
    }
}

tabs.forEach(btn => {
    btn.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        btn.classList.add("active");
        currentCat = btn.dataset.tab;
        showCount = 6;
        applyFilter();
    });
});

if (moreBtn) {
    moreBtn.addEventListener("click", () => {
        showCount += 6;
        applyFilter();
    });
}

// ===== modal (image zoom) =====
const modal = $("#modal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalClose = $("#modalClose");

function openModal(title, src) {
    if (!modal || !modalImg) return;
    modal.classList.add("open");
    modalImg.src = src;
    modalImg.alt = title || "";
    if (modalTitle) modalTitle.textContent = title || "Preview";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
}

items.forEach(it => {
    it.addEventListener("click", () => {
        const title = it.dataset.title || "Project";
        const src = it.dataset.full || it.querySelector("img")?.src;
        if (src) openModal(title, src);
    });
});

if (modalClose) modalClose.addEventListener("click", closeModal);
if (modal) {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
}
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
});

// ===== top button =====
const topBtn = $("#topBtn");
const onScrollTopBtn = () => {
    if (!topBtn) return;
    const show = window.scrollY > 500;
    topBtn.classList.toggle("show", show);
};
window.addEventListener("scroll", onScrollTopBtn);
onScrollTopBtn();

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// init
applyFilter();



document.addEventListener("DOMContentLoaded", () => {
    // ===== helpers =====
    const $ = (sel, parent = document) => parent.querySelector(sel);
    const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

    // ===== tabs + more =====
    const tabs = $$(".tab");
    const items = $$(".port-item");
    const moreBtn = $("#moreBtn");

    let currentCat = "uiux";
    let showCount = 6;

    function applyFilter() {
        const filtered = items.filter(it => currentCat === "all" || it.dataset.category === currentCat);

        filtered.forEach((it, idx) => {
            it.style.display = (idx < showCount) ? "grid" : "none";
        });

        items
            .filter(it => !filtered.includes(it))
            .forEach(it => it.style.display = "none");

        if (moreBtn) {
            moreBtn.style.display = (filtered.length > showCount) ? "inline-flex" : "none";
        }
    }

    tabs.forEach(btn => {
        btn.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            btn.classList.add("active");

            currentCat = btn.dataset.tab;   // <- data-tab 값 읽음
            showCount = 6;
            applyFilter();
        });
    });

    if (moreBtn) {
        moreBtn.addEventListener("click", () => {
            showCount += 6;
            applyFilter();
        });
    }

    applyFilter();
});



const openBtn = document.getElementById("openDetail");
const closeBtn = document.getElementById("closeDetail");
const overlay = document.getElementById("detailOverlay");

openBtn.addEventListener("click", () => {
    overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
});

// 배경 클릭 시 닫기
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("active");
    }
});

