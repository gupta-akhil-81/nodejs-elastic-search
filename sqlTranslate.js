const axios=require('axios');
const ELK_URL = process.env.ELKURL;

run();

async function run(){


    /* 
    */

    try {
        const requestObj={
            method: 'post',
            baseURL: ELK_URL,
            url:  '_sql/translate',
            params: {
                'format' : 'csv'     // txt , json, csv        
            },
            headers: {
                
            },
            data : {
                "query": "SELECT * FROM fehr WHERE Kundensegment='Transactional Pragmatist' LIMIT 10"
            },
            timeout : 10000
        };
        const response = await axios(requestObj);        
        
        console.log(response.data);      
      
        
    } catch (error) {
        console.error(error);        
    }

}