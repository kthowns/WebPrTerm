import { LocalRepository, Word } from "./index.js";

let localRepository = null;

function onPageLoad() {
    cssLoad();
    localRepository = new LocalRepository();
    const vocab_id = getVocabIdFromURL(); // vocab_id를 URL에서 가져옴
    displayWords(vocab_id);
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

// vocab_id를 URL에서 가져오는 함수 추가
function getVocabIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('vocab_id')); // vocab_id를 정수로 변환하여 반환
}

function displayWords(vocab_id) {
    let words = localRepository.getWordAll();
    let filteredWords = words.filter(word => word.vocab_id === vocab_id); // vocab_id로 필터링
    let liList = [];

    filteredWords.forEach((word) => {
        let li = document.createElement('li');
        li.innerHTML = `${word.exp} / ${word.def}`;

        let editButton = createEditButton(word); // 편집 버튼 생성
        let deleteButton = createDeleteButton(word); // 삭제 버튼 생성

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        liList.push(li);
    });

    document.getElementById('word_list').replaceChildren(...liList);
}

function createEditButton(word) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "편집";
    button.classList.add('edit-button');
    button.addEventListener('click', () => {
        alert(`Edit word ID: ${word.id}`);
        // 여기에서 추가적인 편집 로직을 구현할 수 있습니다.
    });
    return button;
}

function createDeleteButton(word) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "삭제";
    button.classList.add('delete-button');
    button.addEventListener('click', () => {
        localRepository.deleteWord(word.id);
        const vocab_id = getVocabIdFromURL(); // vocab_id를 URL에서 가져옴
        displayWords(vocab_id); // vocab_id를 전달하여 필터링된 단어 목록을 다시 표시
    });
    return button;
}

function addWord() {
    let exp = document.getElementById('word_expression').value;
    let def = document.getElementById('word_definition').value;
    let vocab_id = getVocabIdFromURL(); // vocab_id를 URL에서 가져옴

    if (!exp || !def) throw new Error("Expression or Definition is Empty.");
    if (isNaN(vocab_id)) throw new Error("Invalid word Vocab Id.");

    let word = new Word(exp, def, vocab_id);
    localRepository.insertWord(word);
    displayWords(vocab_id); // vocab_id를 전달하여 필터링된 단어 목록을 다시 표시
}

function deleteWord() {
    let id = parseInt(document.getElementById('word_id').value);
    if (isNaN(id)) throw new Error("Invalid word id.");
    localRepository.deleteWord(id);
    const vocab_id = getVocabIdFromURL(); // vocab_id를 URL에서 가져옴
    displayWords(vocab_id); // vocab_id를 전달하여 필터링된 단어 목록을 다시 표시
}

window.addWord = addWord;
window.cssLoad = cssLoad;
window.deleteWord = deleteWord;
window.onPageLoad = onPageLoad;
