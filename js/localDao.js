import { Memo } from "./index.js"; // MemoDto를 MemoCompact로 수정

class MemoDao {
    static memosKey = "memos";

    static insertMemo(memo) {
        let memosList = this.findAll();
        if (memosList == null)
            memosList = [];
        memosList.push(memo);

        localStorage.setItem(MemoDao.memosKey, JSON.stringify(memosList));
    }

    static findAll() {
        let memos = [];
        let memosJson = JSON.parse(localStorage.getItem(MemoDao.memosKey)) || [];
        memosJson.forEach((memo) => {
            memos.push(Memo.fromJson(memo));
        });

        return memos;
    }

    static deleteMemo(id) {
        let memos = this.findAll();
        let isExists = false;
        for (let i = 0; i < memos.length; i++) {
            if (memos[i].id === id) {
                memos.splice(i, 1);
                isExists = true;
                break;
            }
        }
        if (!isExists)
            throw new Error("Memo not exists.");
        localStorage.setItem(MemoDao.memosKey, JSON.stringify(memos));
    }

    static saveAll(list) {
        // 리스트의 메모를 모두 localStorage에 저장
        localStorage.setItem(MemoDao.memosKey, JSON.stringify(list));
    }
}

class DataDao {
    static resetAll() {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
            localStorage.removeItem(key);
        });
    }
}

export { MemoDao, DataDao }; // FavMemosDao 제거
