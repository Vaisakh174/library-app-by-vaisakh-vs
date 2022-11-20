
const express = require("express");
const router = express.Router();
const DATA = require("../models/blogdata")

//get all list (get)
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


// // fetch single student (get)
// router.get('/getsingle', async (req, res) => {

//     try {
//         let id = req.params.id;
//         const singlestudent = await DATA.findById(id);
//         console.log(`from get with id method ${singlestudent}`);
//         res.send(singlestudent)
//     } catch (error) {
//         console.log(`error from get method ${error}`);
//     }

// });



//add data (post)
router.post('/post', async (req, res) => {

    try {
        let item = {
                        blogerName: req.body.blogerName,
                        blogerImg: req.body.blogerImg,
                        followCount: req.body.followCount,
                        articleTitle: req.body.articleTitle,
                        articleDate: req.body.articleDate,
                        comment: req.body.comment,
                        user: req.body.user,
                        content1: req.body.content1,
                        content2: req.body.content2,
                        content3: req.body.content3,
                        content4: req.body.content4,
                        content5: req.body.content5,
                        content6: req.body.content6,
                        content7: req.body.content7,
                        content8: req.body.content8,
                        content9: req.body.content9,
                        content10: req.body.content10
                    }
        const newdata = new DATA(item);
        const savedata = await newdata.save();
        console.log(`from post method ${savedata}`);
        res.send(savedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});


// // delete student
// router.delete('/delete/:id', async (req, res) => {

//     try {
//         let id = req.params.id;
//         let deletestudent = await DATA.findByIdAndDelete(id);
//         console.log(`from delete method ${deletestudent}`);
//         res.send(deletestudent);

//     } catch (error) {
//         console.log(`error from get method ${error}`);
//     }

// });




// update data
router.put('/update', async (req, res) => {

    try {
        let id = req.body._id;
        let item = {
            // comment: req.body.comment,
            followCount:req.body.followCount
        }
        console.log("incoming data from update",this.id,this.item);

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