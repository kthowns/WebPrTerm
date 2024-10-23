import { VocabDao, WordDao, FavWordsDao, FavVocabsDao} from "./index.js";

class LocalRepository {
    static instance = null;
    static vocabDao = null;
    static wordDao = null;
    vocabValidId = 0;
    wordValidId = 0;

    constructor(){
        if(LocalRepository.instance != null)
            return LocalRepository.instance;
        LocalRepository.instance = this;
        LocalRepository.vocabDao = new VocabDao();
        LocalRepository.wordDao = new WordDao();
    }

    insertVocab(vocab){
        let vocabList = LocalRepository.vocabDao.findAll();
        if(vocabList == null)
            throw new Error("Loading Vocab Failed.");

        if(this.vocabValidId === 0){
            let maxId = 0;
            vocabList.forEach((vocab) => {
                if(vocab.id > maxId)
                    maxId = vocab.id;
            });
            this.vocabValidId = maxId+1;
        }
        vocab.id = this.vocabValidId;
        this.vocabValidId += 1;

        LocalRepository.vocabDao.insertVocab(vocab);
    }

    getVocabAll(){
        return LocalRepository.vocabDao.findAll();
    }

    deleteVocab(id){
        LocalRepository.vocabDao.deleteVocab(id);

    }
}

export { LocalRepository };

/*
    필요한 동작
        vocab 조회(전체, 개별), 추가, 삭제, 이름 수정
        word 조회(전체, 개별), 추가, 삭제, 수정
    
    Local Storage 접근 로직 아래 두개를 hybrid
        1. 그때그때 접근
        2. 메모리에 다 로딩 해놓기

    런타임 <-- (Entity 객체) --> Repository <-- (JSON 데이터) --> Local Storage
    - DTO는 굳이 불필요
        1. Load : JSON 데이터를 파싱해서 객체로 변환
        2. Save : 객체를 JSON 형식으로 변환해서 저장
        
    Local Storage는 DB처럼 Key 이름을 Table 이름 형식으로 맵핑, Table은 아래와 같이 구성, 무결성 보장
    - 무결성 보장이나 primary key auto generation 등의 기능은 Repository에서 구현...
        1. Vocabs(voca_id int, title string)
        2. Word(word_id Int, def string, mean string, voca_id)
        3. Favorite_vocas(fav_voca_id, voca_id) 즐겨찾는 단어장
        4. Favorite_words(voca_id) 즐겨찾는 단어
 */