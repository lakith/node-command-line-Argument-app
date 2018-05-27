console.log('starting export');

const fs = require('fs');

var fatchdata = () =>{
    try
    {

        var data = fs.readFileSync('notes-node.json');
        return JSON.parse(data);

    }catch(e){
        return [];
    }
};

var saveNodes = (note) => {

    fs.writeFileSync('notes-node.json',JSON.stringify(note));
}

var addNote = (title,body) => {
    var notes = [];
    notes = fatchdata ();
    var note = {title,body};

    var duplicate = notes.filter((note) => note.title === title);

    if(duplicate.length === 0){
        notes.push(note);
        saveNodes(notes);
        return notes; 
    }
}

var getAll = () => {
    
    var notes = fatchdata();
    return notes;

  };
  
  var getNote = (title) => {
    var notes = fatchdata();
    var filter = notes.filter((note)=>note.title === title);
    console.log('Getting note', title);
    return filter[0];
    
  };
  
  var removeNote = (title) => {
    var notes =  fatchdata();
    var filter = notes.filter((note)=>note.title !== title);
    saveNodes(filter);
    if(notes.length != filter.length)
    console.log("Note removed successfully");
    else
    console.log("Note removed failed");
  };

  var callRepeat = (note)=>{
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};
  
  module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    callRepeat
  };
  