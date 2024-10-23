import { LocalRepository, Vocab, Word } from "./index.js";

let localRepository = new LocalRepository();

function onPageLoad() {
    new LocalRepository();
}

function displayWords(){
    if(wordList == null)
        throw new Error("List is Null")
    let liList = [];
    wordList.forEach((word) => {
        let li = document.createElement('li');
        li.innerHTML = word.exp + ' / ' + word.def;
        liList.push(li);
    });
    document.getElementById('voca_list').replaceChildren(...liList);
}

function addVocab(){
    let title = document.getElementById('vocab_title').value;
    let desc = document.getElementById('vocab_description').value;
    if(title === "" || desc === "")
        throw new Error("Title or Description is Empty.");
    let vocab = new Vocab(title, desc);
    localRepository.insertVocab(vocab);
    console.log(localRepository.getVocabAll());
}

function deleteVocab() {
    let id = parseInt(document.getElementById('vocab_id').value);
    if(isNaN(id))
        throw new Error("Id is not Number");
    localRepository.deleteVocab(id);
    console.log(localRepository.getVocabAll());
}

window.addVocab = addVocab;
window.deleteVocab = deleteVocab;
window.onPageLoad = onPageLoad;
