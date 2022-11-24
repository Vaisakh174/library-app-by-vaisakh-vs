
const express = require("express");
const router = express.Router();
const DATA = require("../models/libraryData");
const userDATA = require("../models/libraryUsers");
const jwt = require('jsonwebtoken')



function verifytoken(req, res, next) {

    if (!req.headers.autherization) {
        return res.status(401).send('Unautherized request1');
    }
    let token = req.headers.autherization.split(''[1])
    if (token == 'null') {
        return res.status(401).send('Unautherized request2');
    }
    let payload = jwt.verify(token, 'secretkey');
    console.log("payload=", payload);
    if (!payload) {
        return res.status(401).send('Unautherized request3');
    }
    req.userid = payload.subject;
    next();

}



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
        let item = { //remove 'data' from below if we not pass data object from frontend
            bookname: req.body.data.bookname,
            bookimgaddress: req.body.data.bookimgaddress,
            author: req.body.data.author,
            content: req.body.data.content
        }
        console.log("incoming data from update", item);

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




//auth


// //get all list (get) for users
// router.get('/getall/user', async (req, res) => {

//     try {
//         let list = await userDATA.find();

//         console.log(`from get method ${list}`);
//         res.send(list);
//     }
//     catch (error) {
//         console.log(`error from get method ${error}`);

//     }

// });



//add data (post) for users
router.post('/signup', async (req, res) => {
    let item = {

        name: req.body.name,
        email: req.body.email,
        password: req.body.password

    }


    userDATA.findOne({ email: item.email }, async (err, foundResults) => {

        console.log("data from signup body", foundResults, err)
        
        if (foundResults == null) {
            console.log("no matching email found");

            try {

                const newdata = new userDATA(item);
                const savedata = await newdata.save();
                // console.log(`from post method, signup ${savedata}`);
                // res.send(savedata);
                res.status(200).send({savedata});

            } catch (error) {
                console.log(`error from post, signup method ${error}`);
            }


        }
        else {
            console.log("matching email found");
            res.status(401).send("Email already registered");


        }


    });




});



//auth

// let email = "vaishakh174@gmail.com"
// let password = "12345"

router.post("/login", async (req, res) => {
    let emailf = req.body.email;
    let passwordf = req.body.password;
    console.log(emailf, passwordf);

    try {

        userDATA.findOne({ email: emailf }, (err, foundResults) => {

            console.log("error 400", foundResults, err)

            if (foundResults == null) {
                console.log("error 401 invalid email")

                res.status(401).send("invalid email or password");
            }

            else if (foundResults.password != passwordf) {
                console.log("error 401 invalid password")

                res.status(401).send("invalid password");

            }

            else {
                console.log("success login with jwt")
                let payload = { subject: emailf + passwordf }
                let token = jwt.sign(payload, "secretkey");
                res.status(200).send({ token });
            }
        })

    } catch (error) {
        console.log("error try login ", error)


    }




});




module.exports = router;