const axios=require('axios');
const ELK_URL = process.env.ELKURL;

run();

async function run(){


    /* 
    A search request can be executed purely using a URI by providing request parameters. 
    Not all search options are exposed when executing a search using this mode, 
    but it can be handy for quick "curl tests". Here is an example:
    */

    try {
        const requestObj={
            method: 'get',
            baseURL: ELK_URL,
            url:  'actors/_search',
            headers: {
                
            },
            data : {                
                "size" : 5,
                 
                // "from" : 10, 
                
                // "query": { "match_all": {} }, //--> match_all does not give any _score for each hits
                // "query": { "match": { "text": "going coming" } }, // on 'text' types search for Kundensegment having 'going' or 'coming'
                // "query": { "match_phrase": { "text": "Witer is coming" } }, // search for exact values 
                
                // "bool": {
                //     "must": [
                //         { "match": {  "age": "40"  }  }
                //     ],
                //     "must_not": [ // this is like a filter from the results. it does not impact the score.
                //         { "match": { "state": "ID" } }
                //     ],
                // "filter": {
                //     "range": {
                //         "id": {  // name of the filter
                //             "gte": 1,
                //             "lte": 5
                //         }
                //     }
                // }
                // },
                
                
                // "sort": [
                //     { "user": "asc" }  //sorting can not be done on 'text' types but on 'keyword' types or other datatypes.
                // ]
                
                                                  
            },
            timeout : 10000
        };
        const response = await axios(requestObj);        
        
        console.log(response.data.hits.hits);      
      
        
    } catch (error) {
        console.error(error.response.data);        
    }

}
