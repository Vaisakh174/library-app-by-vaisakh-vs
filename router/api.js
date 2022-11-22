
const express = require("express");
const router = express.Router();
const DATA = require("../models/libraryData");
const userDATA = require("../models/libraryUsers");


//get all list (get) for users
router.get('/getall/user', async (req, res) => {

    try {
        let list = await userDATA.find();

        console.log(`from get method ${list}`);
        res.send(list);
    }
    catch (error) {
        console.log(`error from get method ${error}`);

    }

});


//add data (post) for users
router.post('/post/user', async (req, res) => {

    try {
        let item = {

            bookname: req.body.bookname,
            bookimgaddress: req.body.bookimgaddress,
            author: req.body.author,
            content: req.body.content
        }
        const newdata = new userDATA(item);
        const savedata = await newdata.save();
        console.log(`from post method ${savedata}`);
        res.send(savedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});









//get all list (get) for data
router.get('/getall', async (req, res) => {

    try {
        let list = await DATA.find();

        console.log(`from get method ${list}`);
        res.send(list);
    }
    catch (error) {
        console.log(`error from get method ${error}`);

    }

});


// fetch single data (get)
router.get('/getsingle/:id', async (req, res) => {

    try {
        let id = req.params.id;
        const singledata = await DATA.findById(id);
        console.log(`from get with id method ${singledata}`);
        res.send(singledata)
    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});



//add data (post)
router.post('/post', async (req, res) => {

    try {
        let item = {

            bookname: req.body.bookname,
            bookimgaddress: req.body.bookimgaddress,
            author: req.body.author,
            content: req.body.content
        }
        const newdata = new DATA(item);
        const savedata = await newdata.save();
        console.log(`from post method ${savedata}`);
        res.send(savedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});


// delete data
router.delete('/delete/:id', async (req, res) => {

    try {
        let id = req.params.id;
        let deletedata = await DATA.findByIdAndDelete(id);
        console.log(`from delete method ${deletedata}`);
        res.send(deletedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});




// update data
router.put('/update', async (req, res) => {

    try {
        let id = req.body._id;
        let item = {
            bookname: req.body.bookname,
            bookimgaddress: req.body.bookimgaddress,
            author: req.body.author,
            content: req.body.content
        }
        console.log("incoming data from update", this.id, this.item);

        let updatedata = await DATA.findByIdAndUpdate(
            { "_id": id },
            { $set: item }
        );
        console.log(`from put method old data ${updatedata}`);
        res.send(updatedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});



module.exports = router;