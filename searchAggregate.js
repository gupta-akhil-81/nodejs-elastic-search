const axios=require('axios');
const ELK_URL = process.env.ELKURL;



run();

async function run(){


    /* 
    */

    try {
        const requestObj={
            method: 'get',
            baseURL: ELK_URL,
            url:  'fehr/_search',
            headers: {
                
            },
            params: {
                'format' : 'txt'
            },
            data : {                
                "size" : 0,
                "aggs": {
                    "group_by_Kundensegment": {  // customer name of the aggregate result colmn
                        "text": {
                            "field": "Kundensegment"
                      }
                    }
                }
                
                                                  
            },
            timeout : 10000
        };
        const response = await axios(requestObj);        
        
        console.log(response.data.hits.hits);      
      
        
    } catch (error) {
        console.error(error.response.data);        
    }

}