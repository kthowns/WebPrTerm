import { LocalRepository, Vocab, Word } from "./index.js";

let localRepository = null;

function onPageLoad() {
    localRepository = new LocalRepository();
    console.log(localRepository.getVocabAll());
    displayVocabs();
    displayWords();
    cssLoad();
}

function cssLoad() {
    let cssSrc = localStorage.getItem('cssSrc');
    if(cssSrc == null){
        cssSrc = "./css/style_main.css";
    }
    let link = document.createElement('link');
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
        li.innerHTML = vocab.id + '. ' + vocab.title + ' / ' + vocab.desc;
        liList.push(li);
    });
    document.getElementById('vocab_list').replaceChildren(...liList);
}

function addVocab() {
    let title = document.getElementById('vocab_title').value;
    let desc = document.getElementById('vocab_description').value;
    if(title.length === 0 || desc.length === 0)
        throw new Error("Title or Description is Empty.");
    let vocab = new Vocab(title, desc);
    localRepository.insertVocab(vocab);
    console.log(localRepository.getVocabAll());
    displayVocabs();
}

function deleteVocab(){
    let id = parseInt(document.getElementById('vocab_id').value);
    if(isNaN(id))
        throw new Error("Invalid vocab id.");
    localRepository.deleteVocab(id);
    console.log(localRepository.getVocabAll());
    displayVocabs();
}

function displayWords() {
    let words = localRepository.getWordAll();
    let liList = [];
    words.forEach((word) => {
        let li = document.createElement('li');
        li.innerHTML = word.id + '. ' + word.exp + ' / ' + word.def + ' / ' + word.vocab_id;
        liList.push(li);
    });
    document.getElementById('word_list').replaceChildren(...liList);
}

function addWord(){
    let exp = document.getElementById('word_expression').value;
    let def = document.getElementById('word_definition').value;
    if(exp.length === 0 || def.length === 0)
        throw new Error("Expression or Definition is Empty.");
    let vocab_id = parseInt(document.getElementById('word_vocab_id').value);
    if(isNaN(vocab_id))
        throw new Error("Invalid word Vocab Id.");

    let word = new Word(exp, def, vocab_id);
    localRepository.insertWord(word);
    console.log(localRepository.getWordAll());
    displayWords();
}

function deleteWord() {
    let id = parseInt(document.getElementById('word_id').value);
    if(isNaN(id))
        throw new Error("Invalid word id.");
    localRepository.deleteWord(id);
    console.log(localRepository.getWordAll());
    displayWords();
}

window.addWord = addWord;
window.addVocab = addVocab;
window.deleteVocab = deleteVocab;
window.deleteWord = deleteWord;
window.onPageLoad = onPageLoad;
