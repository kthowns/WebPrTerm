import { Vocab, Word } from "./index.js"

class VocabDao {
    static instance = null;
    static vocabsKey = "vocabs";

    constructor() {
        if (VocabDao.instance != null)
            return VocabDao.instance;
        VocabDao.instance = this;
    }

    insertVocab(vocab) {
        let vocabsList = this.findAll();
        if (vocabsList == null)
            vocabsList = [];
        vocabsList.push(vocab);

        localStorage.setItem(VocabDao.vocabsKey, JSON.stringify(vocabsList));
    }

    findAll() {
        let vocabs = [];
        let vocabsJson = JSON.parse(localStorage.getItem(VocabDao.vocabsKey))  || [];
        vocabsJson.forEach((vocab) => {
            vocabs.push(Vocab.fromJson(vocab));
        });

        return vocabs;
    }

    deleteVocab(id) {
        let vocabs = this.findAll();
        let isExists  = false;
        for(let i=0; i<vocabs.length; i++){
            if(vocabs[i].id === id){
                vocabs.splice(i, 1);
                isExists = true;
                break;
            }
        }
        if(!isExists)
            throw new Error("Vocabulary not exists.");
        localStorage.setItem(VocabDao.vocabsKey, JSON.stringify(vocabs));
    }
}

class WordDao {
    static instance = null;
    static wordsKey = "words";

    constructor() {
        if (WordDao.instance != null)
            return WordDao.instance;
        WordDao.instance = this;
    }

    insertWord(word) {
        let wordList = this.findAll();
        if (wordList == null)
            wordList = [];
        wordList.push(word);

        localStorage.setItem(WordDao.wordsKey, JSON.stringify(wordList));
    }

    findAll() {
        let words = [];
        let wordsJson = JSON.parse(localStorage.getItem(WordDao.wordsKey))  || [];
        wordsJson.forEach((word) => {
            words.push(Word.fromJson(word));
        });

        return words;
    }

    deleteWord(id) {
        let words = this.findAll();
        let isExists  = false;
        for(let i=0; i<words.length; i++){
            if(words[i].id === id){
                words.splice(i, 1);
                isExists = true;
                break;
            }
        }
        if(!isExists)
            throw new Error("Word not exists.");
        localStorage.setItem(WordDao.wordsKey, JSON.stringify(words));
    }
}

class FavWordsDao {
    static instance = null;
    static favWordsKey = "fav_words";

    constructor() {
        if (FavWordsDao.instance != null)
            return FavWordsDao.instance;
        FavWordsDao.instance = this;
    }
}

class FavVocabsDao {
    static instance = null;
    static favVocabsKey = "fav_vocabs";

    constructor() {
        if (FavVocabsDao.instance != null)
            return FavVocabsDao.instance;
        FavVocabsDao.instance = this;
    }
}

export { WordDao, VocabDao, FavVocabsDao, FavWordsDao };