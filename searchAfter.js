const client = require('./elk/client');

run();

async function run(){


    /* 
    You can use the search_after parameter to retrieve the next page of hits using a set of sort values from the previous page.
    The Scroll api is recommended for efficient deep scrolling but scroll contexts are costly and it is not recommended to use it for real time user requests. 
    The search_after parameter provides a live cursor. The idea is to use the results from the previous page to help the retrieval of the next page.
    */

    try {

        const searchResponse = await client.search(
            {            
                index: 'fehr',
                size: 5,
                body: { 
                    query: { 
                        match: { 
                            'Kundensegment': 'Transactional Pragmatist' 
                        } 
                    },
                    sort : [
                        
                        { 'IF Nummer' : 'asc'}    // it should be a unique id, Otherwise the sort order for documents that have the same sort values would be undefined 
                                            // and could lead to missing or duplicate results.
                    ] 
                },
            }
        );

        // For subsequent pages, we can use the sort values of the last document returned by this request and we pass these values with the search_after parameter
        // The from parameter can’t be used when search_after is passed as the functionality of both contradicts.
        // This solution is very similar to the scroll API but it relieves the server from the keeping the pagination state. 
        // Which also means it always returns the latest version of the data. 
        // For this reason the sort order may change during a walk if updates or deletes happen on the index.

        // IMPORTANT: This solution has the clear disadvantage of not being able to get a page at random as there is a need to fetch pages 
        // from 0..99 to fetch page 100. Still the solution is good for user pagination when you can only move next/previous through the pages.
        
        let searchAfter = searchResponse.body.hits.hits[searchResponse.body.hits.hits.length - 1].sort[0];

        const searchAfterResponse = await client.search(
            {            
                index: 'fehr',
                size: 5,
                body: { 
                    query: { 
                        match: { 
                            'Kundensegment': 'Transactional Pragmatist' 
                        } 
                    },
                    search_after: [searchAfter],
                    sort : [
                        
                        { 'IF Nummer' : 'asc'}    // it should be a unique id, Otherwise the sort order for documents that have the same sort values would be undefined 
                                            // and could lead to missing or duplicate results.
                    ] 
                },
            }
        );

        console.log('---searchAfterResponse---');
        console.log(searchAfterResponse);
        

        
        
    } catch (error) {
        console.error(error);        
    }

}