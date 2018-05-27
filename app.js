console.log('starting the app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const exportdata = require('./export');

const bodyObject = {
  discribe : 'body of the note',
  demand : true,
  alias:'b'
};

const titleObject = {
  discribe : 'Title of note',
  demand : true,
  alias:'t'
};

const command = process.argv[2];
const argv = yargs
.command('add','add a new note',{
  title:titleObject,
  body: bodyObject

})
.command('list','list all notes')
.command('read','read a specific notw',
{
  title:titleObject
})
.command('remove','remove a specific note',
{title:titleObject})
.help()
.argv;
console.log('Command: ', command);
console.log('Yargs', argv);

if(command === 'add')
{
   var note = exportdata.addNote(argv.title,argv.body);
   if (note) {
    console.log('Note created');
    exportdata.callRepeat(note);
  } else {
    console.log('Note title taken');
  }
} else if (command === 'list') {
  
  var notes = exportdata.getAll();
  var len = notes.length; 

  console.log(`There are ${len} elements in the array`)

  notes.forEach(element => {
    exportdata.callRepeat(element);
  });
  
} else if (command === 'read') {
    
  var note = exportdata.getNote(argv.title);

  if(note){
  console.log("display note");
  exportdata.callRepeat(note);
  }else
  {
    console.log("Undefined variable");
  }

} else if (command === 'remove') {
  exportdata.removeNote(argv.title);
} else {
  console.log('Command not recognized');
}


