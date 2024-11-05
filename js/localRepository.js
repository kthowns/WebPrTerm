import { MemoDao, DataDao } from "./index.js";

class LocalRepository {
    static instance = null;
    memoValidId = 0;

    constructor() {
        if (LocalRepository.instance != null)
            return LocalRepository.instance;
        LocalRepository.instance = this;
    }

    insertMemo(memo) {
        let memoList = MemoDao.findAll();
        if (memoList == null)
            throw new Error("Loading Memos Failed.");

        if (this.memoValidId === 0) {
            let maxId = Math.max(...memoList.map(memo => memo.id), 0); // 최대 ID를 찾고, 없으면 0
            this.memoValidId = maxId + 1;
        }
        memo.id = this.memoValidId;
        memo.lastModified = new Date(); // 마지막 수정 날짜 초기화
        this.memoValidId += 1;

        MemoDao.insertMemo(memo);
    }

    getMemoAll() {
        return MemoDao.findAll();
    }

    getMemoById(id) {
        const memoList = MemoDao.findAll();
        if (!memoList) {
            throw new Error("Loading Memos Failed.");
        }
        return memoList.find(memo => memo.id === id) || null; // ID가 일치하는 메모를 찾고, 없으면 null 반환
    }

    updateMemo(updatedMemo) {
        const memoList = MemoDao.findAll();
        const index = memoList.findIndex(memo => memo.id === updatedMemo.id);

        if (index === -1) {
            throw new Error("메모를 찾을 수 없습니다.");
        }

        // 기존 메모를 업데이트하며 마지막 수정 날짜 업데이트
        memoList[index] = { ...memoList[index], ...updatedMemo, lastModified: new Date() };
        MemoDao.saveAll(memoList); // 메모를 데이터 저장소에 저장
    }

    deleteMemo(id) {
        MemoDao.deleteMemo(id);
    }

    resetAllData() {
        DataDao.resetAll();
    }
}

export { LocalRepository };
