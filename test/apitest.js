let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
let should = require('chai').should();
var assert = require("assert");
chai.use(chaiHttp);

var posts=[];
var doings=[];
var dones = [];

describe("Crud Operations", function () {

    let testPosts = [
        {"title": "Todo From Test 1"}, {"title": "Todo From Test 2"}, {"title": "Todo From Test 3"},
        {"title": "Todo From Test 4"}, {"title": "Todo From Test 5"}, {"title": "Todo From Test 6"},
        {"title": "Todo From Test 7"}, {"title": "Todo From Test 8"}, {"title": "Todo From Test 9"},
        {"title": "Todo From Test 10"}, {"title": "Todo From Test 11"}, {"title": "Todo From Test 12"},
        {"title": "Todo From Test 13"}, {"title": "Todo From Test 14"}, {"title": "Todo From Test 15"},
        {"title": "Todo From Test 16"}, {"title": "Todo From Test 17"}, {"title": "Todo From Test 18"},
        {"title": "Todo From Test 19"}, {"title": "Todo From Test 20"}, {"title": "Todo From Test 21"},
        {"title": "Todo From Test 22"}, {"title": "Todo From Test 23"}, {"title": "Todo From Test 24"},
        {"title": "Todo From Test 25"}, {"title": "Todo From Test 26"}, {"title": "Todo From Test 27"},
        {"title": "Todo From Test 28"}, {"title": "Todo From Test 29"}, {"title": "Todo From Test 30"}];

    //*---------TODOS----------*/
    it("Should Remove All Todos First", async  ()=>{
        await chai.request(server)
            .delete("/posts")
            .send({})
            .then(function(res){
                res.should.have.status(200);
            })
    })

    it("Should add Posts From Test in DB", async() => {
        for(post in testPosts){
            await chai.request(server)
                .post("/posts")
                .send(testPosts[post])
                .then(function (res) {
                    res.should.have.status(200);
                })
        }
    })

    it("Should Fecth all the Posts", async () => {
        try{
          await  chai.request(server)
                .get("/posts")
                .then(function (res) {
                    res.should.have.status( 200);
                    posts = res.body.slice();
                })
        }catch (err) {
            console.log(err);
        }

    })

    it("Should Update Particular Post Only", async () => {

        var updatedPost = {
            "_id": posts[7]._id,
            "title": "Updated From Test"
        }

        try{

          var result = await chai.request(server).patch("/posts" ).send(updatedPost);

          result.should.have.status( 200);

        }catch (err) {
            console.log(err);
        }
    })

    it("Should Delete Particular Post", async () => {

        try{
            await chai.request(server)
                .delete("/posts/" + posts[2]._id)
                .then(function(res) {
                    res.should.have.status(200)
                })

        }catch (err) {
            console.log(err);

        }
    })

    //*---------DOINGS----------*/
    it("Should remove all Doings first", async ()=>{
        await chai.request(server)
            .delete("/doings")
            .send({})
            .then(function (res) {
                res.should.have.status(200);
            })
    })

    it('Should Get Doings from Todos', async () => {
        try{
            doings = await posts.slice(10,30);
            assert.equal(doings.length,20);
        }catch (err) {
            console.log(err);
        }
    });

    it("Should Add 20 Doings To DB From Todos", async  () => {

        try{
            for (doing in doings){
                await chai.request(server)
                    .post("/doings")
                    .send(doings[doing])
                    .then(function (res) {
                        res.should.have.status(200);
                    })
            }
        }catch (e) {
            console.log(err);
        }


    })

    it('Should Delete 20 Todos From Todos Table After After Drag And Drop To Doings', async () => {
        try{
            for(doing in doings){
                await chai.request(server)
                    .delete("/posts/" + doings[doing]._id )
                    .then(function (res) {
                        res.should.have.status(200);
                    })
            }
        }catch (err) {
            console.log(err);
        }
    });

    it("Should Fecth All Doings",  async () => {
        try{
          await chai.request(server)
                .get("/doings")
                .then(function (res) {
                    res.should.have.status(200);
                    doings = res.body.slice();
                })
        }catch (err) {
            console.log(err);
        }
    })

    it("Should Update Particular Doing Only", async () => {

        var updatedPost = {
            "_id": doings[1]._id,
            "title": "Updated Doing From Test"
        }

        try{

            var result = await chai.request(server).patch("/doings" ).send(updatedPost);
            result.should.have.status(200);

        }catch (err) {
            console.log(err);
        }
    })

    it("Should Delete Particular Doing", async () => {

        try{
             await chai.request(server)
                .delete("/doings/" + doings[3]._id)
                .then(function(res) {
                    res.should.have.status(200)
                })
        }catch (err) {
            console.log(err);

        }
    })

    //*---------DONES----------*/
    it("should remove all done first", async()=>{
        await chai.request(server)
            .delete("/dones")
            .send({})
            .then(function(res){
                res.should.have.status(200);
            })
    })

    it('Should Get Dones from Doings', async () => {
        try{
            dones = await doings.slice(10,20);
            assert.equal(dones.length,10);

        }catch (err) {
            console.log(err);
        }
    });

    it("Should Add 10 Dones From Doings ", async () => {

        for (done in dones){
            await chai.request(server)
                .post("/dones")
                .send(dones[done])
                .then(function (res) {
                    res.should.have.status(200);
                })
        }
    })

    it('Should Delete 10 Doings From Doings Table After Drag And Drop To Done', async () => {
        try{
            for(done in dones){
                await chai.request(server)
                    .delete("/doings/" + dones[done]._id)
                    .then(function (res) {
                        res.should.have.status(200);
                    })
            }
        }catch (err) {
            console.log(err);
        }
    });

    it("Should Fecth All Doings", async () => {
        try{
           await chai.request(server)
                .get("/dones")
                .then(function (res) {
                    res.should.have.status(200);
                    dones = res.body.slice();
                })
        }catch (err) {
            console.log(err);
        }
    })

    it("Should Update Particular Done Only", async () => {

        var updatedDone = {
            "_id": dones[1]._id,
            "title": "Updated Done From Test"
        }
        try{

            var result = await chai.request(server).patch("/dones" ).send(updatedDone);
            result.should.have.status(200);

        }catch (err) {
            console.log(err);
        }
    })

    it("Should Delete Particular Doing", async () => {

        try{
           await chai.request(server)
                .delete("/dones/" + dones[2]._id)
                .then(function(res) {
                    res.should.have.status(200)
                })
        }catch (err) {
            console.log(err);

        }
    })
})

