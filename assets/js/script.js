'use strict';

/* ------------------------- Utility helpers ------------------------- */

const toggleClass = (el, className = "active") => el.classList.toggle(className);
const qs  = (sel) => document.querySelector(sel);
const qsa = (sel) => document.querySelectorAll(sel);

/* ------------------------- Sidebar toggle -------------------------- */

qs("[data-sidebar-btn]")?.addEventListener("click", () => {
    toggleClass(qs("[data-sidebar]"));
});

/* --------------------- Testimonials modal -------------------------- */

const modal = {
    container: qs("[data-modal-container]"),
    img: qs("[data-modal-img]"),
    title: qs("[data-modal-title]"),
    text: qs("[data-modal-text]"),
    overlay: qs("[data-overlay]")
};

const toggleModal = () => {
    toggleClass(modal.container);
    toggleClass(modal.overlay);
};

qsa("[data-testimonials-item]").forEach(item => {
    item.addEventListener("click", () => {
        const avatar = item.querySelector("[data-testimonials-avatar]");
        modal.img.src = avatar.src;
        modal.img.alt = avatar.alt;
        modal.title.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
        modal.text.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;

        toggleModal();
    });
});

qs("[data-modal-close-btn]")?.addEventListener("click", toggleModal);
modal.overlay?.addEventListener("click", toggleModal);

/* -------------------------- Custom select -------------------------- */

const select = qs("[data-select]");
const selectValue = qs("[data-selecct-value]");
const selectItems = qsa("[data-select-item]");

select?.addEventListener("click", () => toggleClass(select));

/* ----------------------------- Filtering ---------------------------- */

const filterItems = qsa("[data-filter-item]");

const filterFunc = (value) => {
    filterItems.forEach(item => {
        const match = value === "all" || item.dataset.category === value;
        item.classList.toggle("active", match);
    });
};

selectItems.forEach(item => {
    item.addEventListener("click", () => {
        const value = item.dataset.filterBtn;
        selectValue.innerText = item.innerText;
        filterFunc(value);
        toggleClass(select);
    });
});

/* Filter buttons for desktop */
const filterButtons = qsa("[data-filter-btn]");
let activeBtn = filterButtons[0];

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const val = btn.dataset.filterBtn;

        selectValue.innerText = btn.innerText;

        filterFunc(val);

        activeBtn.classList.remove("active");
        btn.classList.add("active");
        activeBtn = btn;
    });
});

/* ---------------------------- Form logic ---------------------------- */

const form = qs("[data-form]");
const formBtn = qs("[data-form-btn]");

qsa("[data-form-input]").forEach(input => {
    input.addEventListener("input", () => {
        formBtn.toggleAttribute("disabled", !form.checkValidity());
    });
});

/* -------------------------- Page navigation ------------------------- */

const pages = qsa("[data-page]");
const navLinks = qsa("[data-nav-link]");

navLinks.forEach(link => {
    const target = link.dataset.navLink;

    link.addEventListener("click", () => {
        pages.forEach((page) => {
            const active = page.dataset.page === target;
            page.classList.toggle("active", active);
        });

        navLinks.forEach((lnk) => {
            lnk.classList.toggle("active", lnk === link);
        });

        window.scrollTo(0, 0);
    });
});
