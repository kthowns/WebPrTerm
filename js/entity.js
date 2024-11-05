class Memo {
    constructor(id, title, tag, content, isFav = false, lastModified) {
        this.id = id;
        this.title = title;
        this.tag = tag;
        this.content = content;
        this.isFav = isFav;
        this.lastModified = lastModified;
    }

    static fromJson(obj) {
        return new Memo(obj.id, obj.title, obj.tag, obj.content, obj.isFav, obj.lastModified);
    }
}

export { Memo };
