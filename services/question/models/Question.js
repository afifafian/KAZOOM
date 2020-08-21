const db = require('../config/mongo');
const Question = db.collection('Questions')

class QuestionModel {
    static findAll() {
        return Question.find().toArray();
    }
    static create(newQuestion) {
        return Question.insertOne(newQuestion)
    }
}

module.exports = QuestionModel;