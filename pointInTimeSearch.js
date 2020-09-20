const axios=require('axios');
const ELK_URL = process.env.ELKURL;

run();

async function run(){


    /* 
    Elasticsearch pit (point in time) is a lightweight view into the state of the data as it existed when initiated.
    A point in time must be opened explicitly before being used in search requests. 
    The keep_alive parameter tells Elasticsearch how long it should keep a point in time alive,
    a point in time (PIT) to preserve the current index state over your searches.
    Step1 : Create a PIT.
    POST /my-index-000001/_pit?keep_alive=1m
    Response: 
    {
        "id": "46ToAwMDaWR4BXV1aWQxAgZub2RlXzEAAAAAAAAAAAEBYQNpZHkFdXVpZDIrBm5vZGVfMwAAAAAAAAAAKgFjA2lkeQV1dWlkMioGbm9kZV8yAAAAAAAAAAAMAWICBXV1aWQyAAAFdXVpZDEAAQltYXRjaF9hbGw_gAAAAA=="
    }
    
    Step 2: Make 1st search using PIT and proper sort values.
    Step 3: Make subseuqent serahces by using PIT values as retuned in previous responses.
    */

    try {

        const response = await axios.post(ELK_URL + '_pit?keep_alive=1m',  {});        
        console.log(response.data);      

        curl -X POST "localhost:9200/my-index-000001/_pit?keep_alive=1m&pretty"

        
        
    } catch (error) {
        console.error(error);        
    }

}