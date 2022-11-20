const mongoose = require("mongoose");
const schema = mongoose.Schema;

const blogschema = new schema({
    blogerName: { type: String, requied: true },
    blogerImg: { type: String, requied: true },
    followCount: { type: Number, requied: true },
    // _id: { type: Number, requied: true },
    articleTitle: { type: String , requied: true },
    articleDate: { type: Date, requied: true },
    comment: { type: String, requied: true },
    user: { type: String, requied: true },
    content1: { type: String, requied: true },
    content2: { type: String, requied: true },
    content3: { type: String, requied: true },
    content4: { type: String, requied: true },
    content5: { type: String, requied: true },
    content6: { type: String, requied: true },
    content7: { type: String, requied: true },
    content8: { type: String, requied: true },
    content9: { type: String, requied: true },
    content10: { type: String, requied: true },
    date:{type:Date,default:Date.now()}

});
let blogDATA = mongoose.model("myBlogData", blogschema);
module.exports = blogDATA;