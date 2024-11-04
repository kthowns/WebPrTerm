import { LocalRepository, Vocab } from "./index.js";

let localRepository = null;

function onPageLoad() {
    cssLoad();
    localRepository = new LocalRepository();
    displayVocabs();
}

function changeCSS(cssFile) {
    localStorage.setItem('cssSrc', cssFile);
    location.reload();
}

function cssLoad() {
    let cssSrc = localStorage.getItem('cssSrc') || "./css/style_main.css";
    let link = document.createElement('link');
    link.onload = () => { document.body.style.visibility = 'visible'; };
    link.rel = "stylesheet";
    link.href = cssSrc;
    link.type = "text/css";
    document.head.appendChild(link);
}

function displayVocabs() {
    let vocabs = localRepository.getVocabAll();
    let liList = [];
    vocabs.forEach((vocab) => {
        let li = document.createElement('li');
        li.id = `vocab-${vocab.id}`;
        li.innerHTML = `${vocab.id}. ${vocab.title} / ${vocab.desc} `;

        let editButton = createEditButton(vocab);
        let deleteButton = createDeleteButton(vocab);
        let arrowButton = createArrowButton(vocab);

        li.appendChild(deleteButton);
        li.appendChild(editButton);
        li.appendChild(arrowButton);
        liList.push(li);
    });
    document.getElementById('vocab_list').replaceChildren(...liList);
}

function createEditButton(vocab) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "편집";
    button.classList.add('edit-button');
    button.addEventListener('click', () => {
        alert(`Edit vocab ID: ${vocab.id}`);
    });
    return button;
}

function createDeleteButton(vocab) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "삭제";
    button.classList.add('delete-button');
    button.addEventListener('click', () => {
        localRepository.deleteVocab(vocab.id);
        document.getElementById(`vocab-${vocab.id}`).remove();
    });
    return button;
}

function createArrowButton(vocab) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "➡";  // 화살표 아이콘
    button.addEventListener('click', () => {
        location.href = `word.html?vocab_id=${vocab.id}`;
    });
    return button;
}

function addVocab() {
    let title = document.getElementById('vocab_title').value;
    let desc = document.getElementById('vocab_description').value;
    if (!title || !desc) throw new Error("Title or Description is Empty.");
    let vocab = new Vocab(title, desc);
    localRepository.insertVocab(vocab);
    displayVocabs();
}

function resetAll() {
    localRepository.resetAllData();
    location.reload();
}

window.changeCSS = changeCSS;
window.cssLoad = cssLoad;
window.addVocab = addVocab;
window.resetAll = resetAll;
window.onPageLoad = onPageLoad;
