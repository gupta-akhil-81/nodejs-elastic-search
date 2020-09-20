const axios=require('axios');
const ELK_URL = process.env.ELKURL;

run();

async function run(){


    /* 
    In case of text format, the cursor is returned as Cursor http header.
    */

    try {
        let requestObj={
            method: 'post',
            baseURL: ELK_URL,
            url:  '_sql',
            params: {
                'format' : 'json'     // txt , json, csv, tsv, yaml, cbor, smile, 
            },
            headers: {
                
            },
            data : {
                "query": "SELECT * FROM fehr WHERE Kundensegment='Transactional Pragmatist' LIMIT 50", 
                "fetch_size": 5,
                "columnar": false // to get results in 2d array of columns and rows.
            },
            timeout : 10000
        };
        let response = await axios(requestObj);        
        
        console.log(response.data);   
        let cursor = response.data.cursor;   

        if(cursor){        
            requestObj={
                method: 'post',
                baseURL: ELK_URL,
                url:  '_sql',
                params: {
                    'format' : 'json'     // txt , json, csv, tsv, yaml, cbor, smile, 
                },
                headers: {
                    
                },
                data : {
                    "cursor": cursor                    
                },
                timeout : 10000
            };
            response = await axios(requestObj);        
            
            console.log(response.data); 
            cursor = response.data.cursor; 


            requestObj={
                method: 'post',
                baseURL: ELK_URL,
                url:  '_sql/close',
                params: {
                    'format' : 'json'     // txt , json, csv, tsv, yaml, cbor, smile, 
                },
                headers: {
                    
                },
                data : {
                    "cursor": cursor                    
                },
                timeout : 10000
            };
            response = await axios(requestObj);        
            
            console.log(response.data); 
        }
      
        
    } catch (error) {
        console.error(error);        
    }

}