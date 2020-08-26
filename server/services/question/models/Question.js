const db = require('../config/mongo');
const Question = db.collection('Questions')
const { ObjectID } = require('mongodb');

class QuestionModel {
    static findAll() {
        return Question.find().toArray();
    }
    static create(newQuestion) {
        return Question.insertOne(newQuestion)
    }
    static destroy(id) {
        return Question.findOneAndDelete({_id: ObjectID(id)})
    }
    static deleteAll() {
        return Question.deleteMany({})
    }
}

module.exports = QuestionModel;