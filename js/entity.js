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
    constructor(exp, def, vocab_id){
        this.exp = exp;
        this.def = def;
        this.vocab_id = vocab_id;
    }

    static fromJson(obj) {
        let word = new Word(obj.exp, obj.def);
        word.id = obj.id;
        word.vocab_id = obj.vocab_id;
        return word;
    }
}

export { Vocab, Word };