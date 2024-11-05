import { LocalRepository, Memo } from "./index.js";

let localRepository = null;
let showFavOnly = false; // 즐겨찾기 메모만 보기 여부

function onPageLoad() {
    cssLoad();
    localRepository = new LocalRepository();
    displayMemos();
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

function displayMemos() {
    let memos = localRepository.getMemoAll(); // 메모 조회 함수
    let liList = [];

    // 즐겨찾기 메모만 표시할 경우 필터링
    if (showFavOnly) {
        memos = memos.filter(memo => memo.isFav);
    }

    memos.forEach((memo) => {
        let li = document.createElement('li');
        li.id = `memo-${memo.id}`;
        // 마지막 수정 날짜를 포맷하여 표시
        const lastModifiedDate = new Date(memo.lastModified).toLocaleString(); // 날짜 포맷
        li.innerHTML = `${memo.id}. ${memo.title} / ${memo.tag} (${lastModifiedDate})`;

        // 버튼을 담을 span 요소 생성
        let buttonContainer = document.createElement('span');
        buttonContainer.id = "item_btn";

        // 즐겨찾기 버튼 추가
        let favButton = createFavButton(memo);
        let deleteButton = createDeleteButton(memo);
        let detailButton = createDetailButton(memo);

        buttonContainer.appendChild(favButton);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(detailButton);

        // li에 buttonContainer 추가
        li.appendChild(buttonContainer);

        liList.push(li);
    });
    document.getElementById('memo_list').replaceChildren(...liList); // 메모 리스트로 수정
}


function toggleFavView() {
    showFavOnly = !showFavOnly; // 상태 토글

    const button = document.getElementById('toggleFavView');
    button.style.backgroundColor = showFavOnly ? "red" : "blue"; // 버튼 색상 변경
    button.value = showFavOnly ? "모든 메모 보기" : "즐겨찾기 메모 보기"; // 버튼 텍스트 변경

    displayMemos(); // 메모 다시 표시
}

function createFavButton(memo) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = memo.isFav ? "즐겨찾기 해제" : "즐겨찾기 추가";
    button.style.backgroundColor = memo.isFav ? "red" : "blue";
    button.classList.add('fav-button');
    button.addEventListener('click', () => {
        memo.isFav = !memo.isFav; // Toggle the isFav state
        localRepository.updateMemo(memo); // Update the memo in the local repository
        displayMemos(); // Refresh the displayed memos
    });
    return button;
}

function createDeleteButton(memo) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "삭제";
    button.classList.add('delete-button');
    button.addEventListener('click', () => {
        localRepository.deleteMemo(memo.id); // 메모 삭제 함수
        document.getElementById(`memo-${memo.id}`).remove();
    });
    return button;
}

function createDetailButton(memo) {
    let button = document.createElement('input');
    button.type = "button";
    button.value = "상세보기"; // 상세보기 버튼
    button.addEventListener('click', () => {
        location.href = `memo_detail.html?memo_id=${memo.id}`; // 메모 상세 페이지로 이동
    });
    return button;
}

function addMemo() {
    let title = document.getElementById('memo_title').value;
    let tag = document.getElementById('memo_tag').value; // 태그 추가
    let content = document.getElementById('memo_content').value; // 내용 추가
    if (!title || !content){
        alert("Title or Content is Empty");
        throw new Error("Title or Content is Empty.");
    }
    document.getElementById('memo_title').value = ""; // 제목 초기화
    document.getElementById('memo_tag').value = ""; // 태그 초기화
    document.getElementById('memo_content').value = ""; // 내용 초기화

    // Memo 객체를 생성할 때 id는 null 또는 undefined일 수 있음
    let memo = new Memo(null, title, tag, content);
    localRepository.insertMemo(memo); // 메모 추가 함수
    displayMemos();
    closeModal();
}

function resetAll() {
    localRepository.resetAllData();
    location.reload();
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

window.changeCSS = changeCSS;
window.cssLoad = cssLoad;
window.addMemo = addMemo; // 메모 추가 함수
window.resetAll = resetAll;
window.openModal = openModal;
window.closeModal = closeModal;
window.onPageLoad = onPageLoad;
window.toggleFavView = toggleFavView; // 토글 함수 추가
