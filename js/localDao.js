import { Vocab, Word } from "./index.js"

class VocabDao {
    static vocabsKey = "vocabs";

    static insertVocab(vocab) {
        let vocabsList = this.findAll();
        if (vocabsList == null)
            vocabsList = [];
        vocabsList.push(vocab);

        localStorage.setItem(VocabDao.vocabsKey, JSON.stringify(vocabsList));
    }

    static findAll() {
        let vocabs = [];
        let vocabsJson = JSON.parse(localStorage.getItem(VocabDao.vocabsKey))  || [];
        vocabsJson.forEach((vocab) => {
            vocabs.push(Vocab.fromJson(vocab));
        });

        return vocabs;
    }

    static deleteVocab(id) {
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
    static wordsKey = "words";

    static insertWord(word) {
        let wordList = this.findAll();
        if (wordList == null)
            wordList = [];
        wordList.push(word);

        localStorage.setItem(WordDao.wordsKey, JSON.stringify(wordList));
    }

    static findAll() {
        let words = [];
        let wordsJson = JSON.parse(localStorage.getItem(WordDao.wordsKey))  || [];
        wordsJson.forEach((word) => {
            words.push(Word.fromJson(word));
        });

        return words;
    }

    static deleteWord(id) {
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
    static favWordsKey = "fav_words";
}

class FavVocabsDao {
    static favVocabsKey = "fav_vocabs";
}
class DataDao{
    static resetAll(){
        const keys = Object.keys(localStorage);
        keys.forEach((key)=>{
            localStorage.removeItem(key);
        });
    }
}

export { WordDao, VocabDao, FavVocabsDao, FavWordsDao, DataDao };