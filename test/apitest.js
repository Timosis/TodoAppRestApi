var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = chai.should();
chai.use(chaiHttp);

describe("Delete All Posts", function () {
    it("should remove all first", ()=>{
         chai.request(server)
            .delete("/posts")
            .send({})
            .end((err,res)=>{
                res.should.have.status(200);
            })
    })
})

describe("CRUD OPERATIONS", function () {
    let posts=[];

    let testPosts = [
        {"title": "Todo From Test 1"},
        {"title": "Todo From Test 2"},
        {"title": "Todo From Test 3"},
        {"title": "Todo From Test 4"},
        {"title": "Todo From Test 5"}
    ];

    it("Should add Posts From Test in DB", () => {
        for(post in testPosts){
            chai.request(server)
                .post("/posts")
                .send(testPosts[post])
                .then(function (res) {
                    res.should.have.status(200);
                })
        }
    })

    it("Should Fecth all the Posts", async () => {
        try{
           await chai.request(server)
                .get("/posts")
                .then(function (res) {
                    res.should.have.status(200);
                    posts = res.body.slice();
                })
        }catch (err) {
            console.log(err);
        }
    })

    it("Should Update Particular Post Only", async () => {

        var updatedPost = {
            "_id": posts[3]._id,
            "title": "Updated From Test"
        }

        try{

          var result = await chai.request(server).patch("/posts" ).send(updatedPost);
          result.should.have.status(200);

        }catch (err) {
            console.log(err);
        }
    })

    it("Should Delete Particular Post", () => {

        try{
            chai.request(server)
                .delete("/posts/" + posts[1]._id)
                .then(function(res) {
                    res.should.have.status(200)
                })
        }catch (err) {
            console.log(err);

        }
    })
})
