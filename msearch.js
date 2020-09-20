const client = require('./elk/client');

run();

async function run(){


    /* Executes several searches with a single API request. The format of the request is similar to the bulk API format 
    GET /<target>/_msearch
    
    
    */

    try {

        const msearchResponse = await client.msearch({
            max_concurrent_searches: 1,
            body: [
              { index: 'fehr' },
              { query: { match: { 'Kundensegment': 'Transactional Pragmatist' } } },
        
              { index: 'fehr' },
              { query: { match: { 'Kundensegment': 'IKEA FAN' } } },
            ]
        });
        console.log(msearchResponse.body.responses);
        
    } catch (error) {
        console.error(error);        
    }

}