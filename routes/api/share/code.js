const debug = require('debug')('app:share:c')
const {
    SharedCode
} = require("../../../database/models");
const {
    getNanoId10
} = require('./utils')

async function getAllCode() {
    /* 
        get all the code documents in collection
    */
    const filter = {}
    try {
        const storedDocs = await SharedCode.find(filter, null, {
            sort: { creation_timestamp: -1 } // sort in Descending order
        }).lean();
        return storedDocs;
    } catch (err) {
        return null;
    }

}

async function getCodeById(id) {
    /* 
        get a code document by mongodb _id
    */
    try {
        let user = await SharedCode.findById(id);
        return user;
    } 
    catch (err) {
        return null;
    }
}
async function delCodeById(id) {
    /* 
        delete a code document by mongodb _id
    */
    try {
        let doc = await SharedCode.findOneAndDelete({
            '_id': id,
          }).exec();
        return doc;
    } 
    catch (err) {
        return null;
    }
}

async function getCodeByUrl(docid) {
    /* 
        get a code document by shorter url id
    */
    try {
        let user = await SharedCode.findOne({
            url: docid
        });
        return user;
    } 
    catch (err) {
        return null;
    }
}

async function saveCode(reqBody) {
    /* 
        makes mongo document and save the code
    */
    debug(reqBody);
    try {
        let nanoUrl = getNanoId10();
        let newDoc = {
            code_text: reqBody.code_text,
            language: reqBody.language,
            url: nanoUrl,
        }
        const code = new SharedCode(newDoc);
        const storedData = await code.save();
        return storedData;
    } 
    catch (err) {
        return null;
    }
}

module.exports = {
    saveCode,
    getCodeById,
    getCodeByUrl,
    getAllCode,
    delCodeById
}

/*

test.cpp

#include<iostream.h>

int main(){
    cout<<"Hello\n";
}

test.py

print("Hello")

*/