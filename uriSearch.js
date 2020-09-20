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
            url:  '_search',
            params: {
                q: "UID:7B2C6954-3C69-4FA2-B215-0C2AA7C02FF2"                
            },
            headers: {
                
            },
            data : {


            },
            timeout : 10000
        };
        const response = await axios(requestObj);        
        
        console.log(response.data.hits.hits);      
      
        
    } catch (error) {
        console.error(error);        
    }

}