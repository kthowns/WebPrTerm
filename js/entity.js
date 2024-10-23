class Vocab {
    id = 0;
    title = "";
    desc = "";
    constructor(title, desc){
        this.title = title;
        this.desc = desc;
    }

    static fromJson(obj) {
        let vocab = new Vocab(obj.title, obj.desc);
        vocab.id = obj.id;
        return vocab;
    }
}

class Word {
    id = 0;
    constructor(exp, def){
        this.exp = exp;
        this.def = def;
    }
}

export { Vocab, Word };