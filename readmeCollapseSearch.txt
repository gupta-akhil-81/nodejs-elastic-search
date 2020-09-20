You can use the collapse parameter to collapse search results based on field values. The collapsing is done by selecting only the top sorted document per collapse key.
The total number of hits in the response indicates the number of matching documents without collapsing. The total number of distinct group is unknown.
The field used for collapsing must be a single valued keyword or numeric field with doc_values activated
The collapsing is applied to the top hits only and does not affect aggregations.

GET /my-index-000001/_search
{
  "query": {
    "match": {
      "message": "GET /search"
    }
  },
  "collapse": {
    "field": "user.id"                
  },
  "sort": [ "http.response.bytes" ],  
  "from": 10                          
}


GET /my-index-000001/_search
{
  "query": {
    "match": {
      "message": "GET /search"
    }
  },
  "collapse": {
    "field": "geo.country_name",
    "inner_hits": {
      "name": "by_location",
      "collapse": { "field": "user.id" },
      "size": 3
    }
  }
}
Resppnse:

"hits": [
    {
      "_index": "my-index-000001",
      "_type": "_doc",
      "_id": "9",
      "_score": ...,
      "_source": {...},
      "fields": { "geo": { "country_name": [ "UK" ] }},
      "inner_hits": {
        "by_location": {
          "hits": {
            ...,
            "hits": [
              {
                ...
                "fields": { "user": "id": { [ "user124" ] }}
              },
              {
                ...
                "fields": { "user": "id": { [ "user589" ] }}
              },
              {
                ...
                "fields": { "user": "id": { [ "user001" ] }}
              }
            ]
          }
        }
      }
    },


