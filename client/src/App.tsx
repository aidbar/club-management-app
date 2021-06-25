// client/src/App.tsx

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
    //const [data, setData] = React.useState(null);
    const [name, setName] = React.useState(""); //useState('');
    const [photo, setPhoto] = React.useState(null); //useState('');
    const [memberList, setMemberList] = React.useState([]);
    const [editMode, setEditMode] = React.useState(null);
    //const [id_num, setIdNum] = React.useState(0);

    let _ = require('lodash');
    let id_root : string = _.uniqueId('member_'); //let id = uniqueId('member_');

    //let editMode = false;


    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setMemberList(data.memberList));
    }, []);

    
    //console.log(id); // 'id_1'

    function inputCheck() {
        if (name != null) console.log("name is ", name, " length of name is ", name.length);

        if (name == null || photo == null) {
            console.log("missing input");
            return false;
        }
        else if (name.length <= 0) {
            console.log("missing input/no name length");
            return false;
        }
        else if (photo.length <= 0) {
            console.log("missing input/no photo length");
            return false;
        }

        return true;
    }

    function addNewMember(e) {
        e.preventDefault();
        console.log('add new member button clicked');

        console.log(editMode);
        
        if (inputCheck()) {

            if (editMode != null) {

                let dataToSendForUpdate = {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_in_update: editMode,
                        name_in_update: name,
                        photo_in_update: photo,
                    })
                };

                fetch("/api/update/" + editMode, dataToSendForUpdate)
                    //.then(console.log("[App.tsx] 1st then of update"))
                    //.then(console.log("[App.tsx] 2nd then of update"));

                setEditMode(null);
            }

            else {
                let id : string = id_root; //+ '1'
                //id_root = id;

                let dataToSend = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    /*body: {
                        'name_in_post': name,
                        //photo_in_post: photo,
                    }*/
                    body: JSON.stringify({
                        id_in_post: id,
                        name_in_post: name,
                        photo_in_post: photo,
                    })
                };

                console.log(dataToSend);

                setPhoto(null);

                fetch("/api", dataToSend)
                    //.then(console.log("[App.tsx] 1st then of post"))
                    //.then(console.log("[App.tsx] 2nd then of post"));

            }
            window.location.reload(true);
        }
    }

    function handleInput(e) {
        console.log("clicked edit button for " + e.target.value);

        setEditMode(e.target.value);

        /*fetch("/api/get/" + e.target.value)
            .then((res) => res.json())
            .then((response) => {
                  setName(response.memberName);
                  setPhoto(response.memberPhoto);
               }
        );*/

        console.log(name);
        console.log("edit mode prepared, now waiting for the start of addNewMember...");

    }

    function handleInputDelete(e) {
        console.log("clicked delete button for " + e.target.value);

        let dataToSendForDelete = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_in_delete: e.target.value,
            })
        };

        fetch("/api/delete/" + e.target.value, dataToSendForDelete)
            //.then(console.log("[App.tsx] 1st then of delete"))
            //.then(console.log("[App.tsx] 2nd then of delete"));

        window.location.reload(true);
    }

    /*function showCurrentMembers(memberList) {
        console.log("setting the member list, member list is: ");
        console.log(memberList);
        /*currentMemberList = memberList; //setData(memberList);
        console.log("currentMemberList is: ");
        console.log(currentMemberList);
        console.log("setting the member list done");
        currentMemberList.map((item =>
            console.log("currentMemberList item is " + item.memberName + " " + item.memberPhoto)
        ));


        if (currentMemberList) {
            tableRows = <tr>
                {currentMemberList.map((item) => {
                    
                            <tr key={item.memberName}> <td>{item.memberName}></td><td>{item.memberPhoto}</td></tr>
                        
                    //)
                })}
            </tr>
        }*--/
        
    }*/

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberList.map((item) => {
                            return <tr key={item.memberName}> <td>{item.memberName}</td> <td>{item.memberPhoto}</td> <td><button value={item.id} onClick={handleInput}>Edit member</button></td> <td><button value={item.id} onClick={handleInputDelete}>Delete member</button></td></tr>
                        })}
                    </tbody>
                </table>

                <label htmlFor="newmember_name">Name:</label>
                <input type="text" id="newmember_name" onChange={event => setName(event.target.value)}></input>

                <label htmlFor="newmember_pic"> Select a member photo to upload: </label>
                <input type="file" name="newmember_pic" id="newmember_pic" accept="image/*" onChange={event => setPhoto(event.target.value)}></input>
                

                <form onSubmit={addNewMember}>
                    <button type="submit">Add New Member</button>
                </form>

            </header>
        </div>
    );
}

export default App;