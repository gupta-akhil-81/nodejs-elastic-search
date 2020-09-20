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
            method: 'put',
            baseURL: ELK_URL,
            url:  'customers/doc/1',
            headers: {
                
            },
            data : {
                "name": "John Doe"
            },
            timeout : 10000
        };
        const response = await axios(requestObj);        
        
        console.log(response.data);      
      
        
    } catch (error) {
        console.error(error);        
    }

}