const QuestionModel = require('../models/Question');

class QuestionController {
    static getAll (req, res) {
        QuestionModel.findAll()
        .then(data => {
            return res.status(200).json(data)
        })
        .catch(error => {
            return res.status(500).json({ message: error })
        })
    };
    static addQuestion(req, res) {
        const newQuestion = {
            question: req.body.question,
            choices: req.body.choices
        }
        if (!newQuestion.question) {
            return res.status(400).json({ message: "Question must be filled!" })
        }
        else if (newQuestion.choices.length < 1) {
            return res.status(400).json({ message: "Choices must be filled!" })
        } else {
            QuestionModel.create(newQuestion)
            .then(data => {
                return res.status(201).json(data.ops[0])
            })
            .catch(error => {
                return res.status(500).json({ message: error });
            })
        }
    };
};

module.exports = QuestionController;