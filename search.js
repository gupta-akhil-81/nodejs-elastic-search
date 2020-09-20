const client = require('./elk/client');

run();

async function run(){

    /* 
    GET /<target>/_search  e.g. GET /my-index-000001/_search
    GET /_search
    POST /<target>/_search
    POST /_search
    You can provide search queries using the q query string parameter or request body.

    <target> --> (Optional, string) Comma-separated list of data streams, indices, and index aliases to search. Wildcard (*) expressions are supported.
    To search all data streams and indices in a cluster, omit this parameter or use _all or *.


    
    */

    const result = await client.search(
        {
            index: 'fehr',
            size: 6,
            from: 5,    //Avoid using from and size to page too deeply or request too many results at once. For deep pages or large sets of results, 
                        //these operations can significantly increase memory and CPU usage, resulting in degraded performance or node failures.
                        //By default, you cannot use from and size to page through more than 10,000 hits.
            pretty: true, //Pretty format the returned JSON response.
            body: {
                query: {
                    match: { 
                        Kundensegment : 'Transactional Pragmatist' 
                    }
                }
            }
        },
        {
            id: ('search-' + (Math.random() * 100000000000)), // custom request id
            ignore: [404],  //HTTP status codes which should not be considered errors for this request.
            maxRetries: 3, //Max number of retries for the request, it overrides the client default. Default: 3
            requestTimeout: 10000, //Max request timeout for the request in milliseconds, it overrides the client default. Default: 30000,
            asStream : false, // Instead of getting the parsed body back, you get the raw Node.js stream of data. Default is falseapp.all('path', (req, res, next) => {
            headers: null, // it is an obkect.  Custom headers for the request.Default: null
            querystring : null, //Custom querystring for the request.,
            context : {contextAttribute : 'yoyo'}

        }
    );

    console.log(result.body.hits.total.value);

}