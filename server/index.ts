// server/index.ts

import path from "path"; //const path = require('path');
import express from "express"; //const express = require("express");
import bodyParser from "body-parser"; //; const bodyParser = require('body-parser'); //var


const PORT = process.env.PORT || 3001;

const app = express();

// create application/json parser
const jsonParser = bodyParser.json(); //var

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false }) //var

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

let members : any[] = [];

function arrayRemove(arr: any[], value: any) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}

// Handle GET requests to /api route
app.get("/api", (req : any, res : any) => {
    //res.json({ message: "Hello from server!" });
    res.json({ memberList: members });
});

app.get("/api/get/:memberId", (req : any, res : any) => {
    //res.json({ message: "Hello from server!" });
    let response = {};
    members.forEach(member => {
        if (member.id === req.params.memberId) {
            response = {
                id : member.id,
                memberName: member.memberName,
                memberPhoto: member.memberPhoto,
            }
            //break;
        }
    })
    res.json({ responseMember: response });
});

app.post("/api", jsonParser, (req : any, res : any) => { //app.get("/post", [...])
    console.log(req);
    const newMember = {
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

app.put("/api/update/:memberId", jsonParser, (req : any, res : any) => { 
    console.log(req);
    /*const updateMember = {
        id: req.body.id_in_update,
        memberName: req.body.name_in_update,
        memberPhoto: req.body.photo_in_update,
    };*/

    members.forEach(member => {
        if (member.id === req.params.memberId) {
            console.log("[server/index.ts] found the member to update");
            member.memberName = req.body.name_in_update;
            member.memberPhoto = req.body.photo_in_update;
            //break;
        }
    })

    //members.push(newMember);
    //console.log("[server/index.ts] Newly updated member:");
    //console.log(newMember);
    console.log("[server/index.ts] Current member list:");
    console.log(members);
    res.json({ message: "put succesfull" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req : any, res : any) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});*/

app.delete('/api/delete/:memberId', function (req : any, res : any) {
    console.log("[server/index.ts] memberId for delete is " + req.params.memberId);
    members.forEach(member => {
        if (member.id === req.params.memberId) {
            members = arrayRemove(members, member);
            //break;
        }
    })
    //members = members.filter({ member.id != req.params.memberId });
    console.log("[server/index.ts] Current member list after deletion:");
    console.log(members);
    res.send('Completed a DELETE request');
})



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});