const client = require('./elk/client');

run();

async function run(){

    let createIndexResponse = await client.indices.create(
        {
            index: 'tweets',
            body: {
            mappings: {
                properties: {
                    id: { type: 'integer' },
                    text: { type: 'text' },
                    user: { type: 'keyword' },
                    date: { type: 'date' }
                }
            }
        }
      }, 
      { ignore: [400] }
    );

    // console.log('---createIndexResponse---');
    // console.log(createIndexResponse);

    const actors = [
      {
        id: 1,
        text: 'If I fall, don\'t bring me back.',
        user: 'jon',
        date: new Date()
      }, 
      {
        id: 2,
        text: 'Witer is coming',
        user: 'ned',
        date: new Date()
      }, 
      {
        id: 3,
        text: 'A Lannister always pays his debts.',
        user: 'tyrion',
        date: new Date()
      }, 
      {
        id: 4,
        text: 'I am the blood of the dragon.',
        user: 'daenerys',
        date: new Date()
      }, 
      {
        id: 5, // change this value to a string to see the bulk response with errors
        text: 'A girl is Arya Stark of Winterfell. And I\'m going home.',
        user: 'arya',
        date: new Date()
      }];

      let bulkInputArray = [];

      for (let i=0 ; i < actors.length ; i++) {
        let actor = actors[i];
        bulkInputArray.push( {  index: { _index: 'actors' }  } );
        bulkInputArray.push( actor );
      }

    // bulk can be used for create, delete, index, update, doc  
    // create - indexes(insert) the specified document if it does not already exist.
    // index - Indexes (inserts) the specified document. If the document exists, replaces the document and increments the version.
      const { body: bulkResponse } = await client.bulk({ refresh: true, body : bulkInputArray });

      console.log('---bulkResponse--');
      console.log(bulkResponse);
      

}