const db = require('../config/mongo');
const Template = db.collection('Template')
const { ObjectID } = require('mongodb');

class TemplateModel {
    static findAll() {
        return Template.find().toArray();
    }
    static create(newTemplate) {
        return Template.insertOne(newTemplate)
    }
    static delete(id) {
        return Template.findOneAndDelete({_id: ObjectID(id)})
    }
}

module.exports = TemplateModel;