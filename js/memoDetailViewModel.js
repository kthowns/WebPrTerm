import { LocalRepository } from "./index.js";

let localRepository = null;

function onPageLoad() {
    cssLoad();
    localRepository = new LocalRepository();
    const memo_id = getMemoIdFromURL();
    displayMemo(memo_id);
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

function getMemoIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('memo_id'));
}

function displayMemo(memo_id) {
    let memo = localRepository.getMemoById(memo_id);
    if (!memo) {
        alert("해당 메모를 찾을 수 없습니다.");
        return;
    }

    // Display the memo details
    document.getElementById('memoTitle').innerText = memo.title;
    document.getElementById('memoTag').innerText = memo.tag;
    document.getElementById('memoContent').innerText = memo.content;

    // Reset edit fields to ensure they are hidden on load
    resetEditFields();
}

function resetEditFields() {
    // Hide edit fields and submit button
    document.getElementById('memoTitleEdit').style.display = 'none';
    document.getElementById('memoTagEdit').style.display = 'none';
    document.getElementById('memoContentEdit').style.display = 'none';
    document.getElementById('submitEdit').style.display = 'none';
    document.getElementById('editButton').style.display = 'inline'; // Show edit button
    document.getElementById('memoTitle').style.display = 'block';
    document.getElementById('memoTag').style.display = 'block';
    document.getElementById('memoContent').style.display = 'block';
}

function toggleEdit() {
    const title = document.getElementById('memoTitle');
    const tag = document.getElementById('memoTag');
    const content = document.getElementById('memoContent');
    const titleEdit = document.getElementById('memoTitleEdit');
    const tagEdit = document.getElementById('memoTagEdit');
    const contentEdit = document.getElementById('memoContentEdit');
    const submitButton = document.getElementById('submitEdit');

    if (title.style.display !== "none") {
        // Activate edit mode
        titleEdit.value = title.innerText;
        tagEdit.value = tag.innerText;
        contentEdit.value = content.innerText;

        title.style.display = "none";
        tag.style.display = "none";
        content.style.display = "none";
        titleEdit.style.display = "block";
        tagEdit.style.display = "block";
        contentEdit.style.display = "block";
        submitButton.style.display = "inline"; // Show submit button
        document.getElementById('editButton').style.display = 'none'; // Hide edit button
    } else {
        // Deactivate edit mode
        submitEdit(); // Call submitEdit to save changes
    }
}

function submitEdit() {
    const memoId = getMemoIdFromURL();
    const updatedTitle = document.getElementById('memoTitleEdit').value.trim();
    const updatedTag = document.getElementById('memoTagEdit').value.trim();
    const updatedContent = document.getElementById('memoContentEdit').value.trim();

    if (updatedTitle && updatedContent) {
        updateMemo(memoId, updatedTitle, updatedTag, updatedContent);
        displayMemo(memoId); // Display the updated memo
        resetEditFields(); // Reset edit fields after saving
    } else {
        alert("제목 또는 내용을 입력하세요.");
    }
}

function updateMemo(memoId, title, tag, content) {
    let memo = localRepository.getMemoById(memoId);
    if (memo) {
        memo.title = title;
        memo.tag = tag;
        memo.content = content;
        localRepository.updateMemo(memo);
    } else {
        alert("메모를 찾을 수 없습니다.");
    }
}

// Make functions accessible globally
window.cssLoad = cssLoad;
window.onPageLoad = onPageLoad;
window.getMemoIdFromURL = getMemoIdFromURL;
window.updateMemo = updateMemo;
window.toggleEdit = toggleEdit;
window.submitEdit = submitEdit; // Add submitEdit for global access
