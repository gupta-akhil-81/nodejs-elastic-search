const client = require('./elk/client');

run();

async function run(){


    /* 

    The Scroll api is recommended for efficient deep scrolling but scroll contexts are costly and it is not recommended to use it for real time user requests. 


    While a search request returns a single “page” of results, the scroll API can be used to retrieve large numbers of 
    results (or even all results) from a single search request, in much the same way as you would use a cursor on a traditional database.

    The results that are returned from a scroll request reflect the state of the index at the time that the initial search request was made, 
    like a snapshot in time. Subsequent changes to documents (index, update or delete) will only affect later search requests.

    In order to use scrolling, the initial search request should specify the scroll parameter in the query string, 
    which tells Elasticsearch how long it should keep the “search context” alive.
    
    
    We no longer recommend using the scroll API for deep pagination. If you need to preserve the index state while paging through more than 10,000 hits, 
    use the search_after parameter with a point in time (PIT).
    
    POST /my-index-000001/_search?scroll=1m
    {
        "size": 100, --> The size parameter allows you to configure the maximum number of hits to be returned with each batch of results
        "query": {
            "match": {
            "message": "foo"
            }
        }
    }
    The result from the above request includes a _scroll_id, which should be passed to the scroll API in order to retrieve the next batch of results.
    

    POST /_search/scroll                                                               
    {
        "scroll" : "1m",           --> tells Elasticsearch to keep the search context open for another 1m.                                                       
        "scroll_id" : "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==" 
    }
    GET or POST can be used and the URL should not include the index name — this is specified in the original search request instead.
    Each call to the scroll API returns the next batch of results until there are no more results left to return, ie the hits array is empty.
    
    IMPORTANT : The initial search request and each subsequent scroll request each return a _scroll_id. 
    While the _scroll_id may change between requests, it doesn’t always change — in any case, only the most recently received _scroll_id should be used.

    IMPORTANT: If the request specifies aggregations, only the initial search response will contain the aggregations results.

    Each scroll request (with the scroll parameter) sets a new expiry time. If a scroll request doesn’t pass in the scroll parameter, 
    then the search context will be freed as part of that scroll request.

    Search context are automatically removed when the scroll timeout has been exceeded. However keeping scrolls open has a cost,
    as discussed in the previous section so scrolls should be explicitly cleared as soon as the scroll is not being used anymore using the clear-scroll API:

    DELETE /_search/scroll/_all

    DELETE /_search/scroll
    {
        "scroll_id" : "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ=="
    }

    DELETE /_search/scroll
    {
        "scroll_id" : [
            "DXF1ZXJ5QW5kRmV0Y2gBAAAAAAAAAD4WYm9laVYtZndUQlNsdDcwakFMNjU1QQ==",
            "DnF1ZXJ5VGhlbkZldGNoBQAAAAAAAAABFmtSWWRRWUJrU2o2ZExpSGJCVmQxYUEAAAAAAAAAAxZrUllkUVlCa1NqNmRMaUhiQlZkMWFBAAAAAAAAAAIWa1JZZFFZQmtTajZkTGlIYkJWZDFhQQAAAAAAAAAFFmtSWWRRWUJrU2o2ZExpSGJCVmQxYUEAAAAAAAAABBZrUllkUVlCa1NqNmRMaUhiQlZkMWFB"
        ]
    }
    */

    try {

        const searchResponse = await client.search(
            {            
                index: 'fehr',
                scroll : '1m',
                size: 2,
                _source : ['UID', 'IF Nummer'],
                body: { 
                    query: { 
                        match: { 
                            'Kundensegment': 'Transactional Pragmatist' 
                        } 
                    } 
                },
            }
        );

        let responseQueue=[];
        let allHits = [];
        responseQueue.push(searchResponse);

        while(responseQueue.length){
            let response = responseQueue.shift(); 

            if(response.body.hits.hits.length === 0){
                break;
            }
            if (!response.body._scroll_id) {
                break
            }

            response.body.hits.hits.forEach(function (hit) {
                allHits.push(hit._source)
            });

            responseQueue.push(
                await client.scroll(
                    {
                        scrollId: response.body._scroll_id,
                        scroll: '1m'
                    }
                )
            );

            console.log('---ALL HITS---'+ allHits.length);

        }

        
        
    } catch (error) {
        console.error(error);        
    }

}