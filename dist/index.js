"use strict";
// server/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path")); //const path = require('path');
var express_1 = __importDefault(require("express")); //const express = require("express");
var body_parser_1 = __importDefault(require("body-parser")); //; const bodyParser = require('body-parser'); //var
var PORT = process.env.PORT || 3001;
var app = express_1.default();
// create application/json parser
var jsonParser = body_parser_1.default.json(); //var
// create application/x-www-form-urlencoded parser
var urlencodedParser = body_parser_1.default.urlencoded({ extended: false }); //var
// Have Node serve the files for our built React app
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client/build')));
var members = [];
function arrayRemove(arr, value) {
    return arr.filter(function (ele) {
        return ele != value;
    });
}
// Handle GET requests to /api route
app.get("/api", function (req, res) {
    //res.json({ message: "Hello from server!" });
    res.json({ memberList: members });
});
app.get("/api/get/:memberId", function (req, res) {
    //res.json({ message: "Hello from server!" });
    var response = {};
    members.forEach(function (member) {
        if (member.id === req.params.memberId) {
            response = {
                id: member.id,
                memberName: member.memberName,
                memberPhoto: member.memberPhoto,
            };
            //break;
        }
    });
    res.json({ responseMember: response });
});
app.post("/api", jsonParser, function (req, res) {
    console.log(req);
    var newMember = {
        id: req.body.id_in_post,
        memberName: req.body.name_in_post,
        memberPhoto: req.body.photo_in_post,
    };
    members.push(newMember);
    console.log("[server/index.ts] Newly added member:");
    console.log(newMember);
    console.log("[server/index.ts] Current member list:");
    console.log(members);
    //res.json({ message: "post succesfull" });
});
app.put("/api/update/:memberId", jsonParser, function (req, res) {
    console.log(req);
    /*const updateMember = {
        id: req.body.id_in_update,
        memberName: req.body.name_in_update,
        memberPhoto: req.body.photo_in_update,
    };*/
    members.forEach(function (member) {
        if (member.id === req.params.memberId) {
            console.log("[server/index.ts] found the member to update");
            member.memberName = req.body.name_in_update;
            member.memberPhoto = req.body.photo_in_update;
            //break;
        }
    });
    //members.push(newMember);
    //console.log("[server/index.ts] Newly updated member:");
    //console.log(newMember);
    console.log("[server/index.ts] Current member list:");
    console.log(members);
    res.json({ message: "put succesfull" });
});
// All other GET requests not handled before will return our React app
app.get('*', function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, '../client/build', 'index.html'));
});
/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});*/
app.delete('/api/delete/:memberId', function (req, res) {
    console.log("[server/index.ts] memberId for delete is " + req.params.memberId);
    members.forEach(function (member) {
        if (member.id === req.params.memberId) {
            members = arrayRemove(members, member);
            //break;
        }
    });
    //members = members.filter({ member.id != req.params.memberId });
    console.log("[server/index.ts] Current member list after deletion:");
    console.log(members);
    res.send('Completed a DELETE request');
});
app.listen(PORT, function () {
    console.log("Server listening on " + PORT);
});
//# sourceMappingURL=index.js.map