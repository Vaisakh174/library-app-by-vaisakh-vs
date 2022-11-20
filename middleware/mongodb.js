const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://vaisakh:vaisakh123@cluster0.akamxkh.mongodb.net/FSDJulyBlog?retryWrites=true&w=majority', {
    useNewUrlParser: true,//to enable new features of mongidb
    useUnifiedTopology: true//to enable new features of mongidb
})
    .then(() => {
        console.log("mongodb is connected successfully");

    })
    .catch((err) => {
        console.log("mongodb not connected" + err);
    });
