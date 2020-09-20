const axios=require('axios');
const ELK_URL = process.env.ELKURL;

run();

async function run(){


    /* 
    In case of text format, the cursor is returned as Cursor http header.

    Single quotes ' --> used to declare a string literal
    Double quotes " --> used for identifiers

    SELECT [TOP [ count ] ] select_expr [, ...]
    [ FROM table_name ]  --> The name can be a pattern pointing to multiple indices . eg. SELECT emp_no FROM "e*p" LIMIT 1;
    [ WHERE condition ]
    [ GROUP BY grouping_element [, ...] ]
    [ HAVING condition]  --> it eliminates groups that do not satisfy the given condition. works only with GROUP BY. 
                            Only groups that match the condition (to true) are returned.
                            HAVING works on the groups created by ``GROUP BY``   
                            e.g. SELECT languages AS l, COUNT(*) AS c FROM emp GROUP BY l HAVING c BETWEEN 15 AND 20;
    [ ORDER BY expression [ ASC | DESC ] [, ...] ]   --> For queries that perform grouping, ordering can be applied either on the grouping 
                                                        columns (by default ascending) or on aggregate functions.
                                                        Ordering by aggregation is possible for up to 10000 entries for memory consumption reasons. 
                                                        In cases where the results pass this threshold, use LIMIT or TOP to reduce the number of results.
                                                        
    [ LIMIT [ count ] ]  --> both TOP and LIMIT cannot be used
    [ PIVOT ( aggregation_expr FOR column IN ( value [ [ AS ] alias ] [, ...] ) ) ] 

    PIVOT --> it aggregates the results and rotates rows into columns
    e.g. 
    SELECT * FROM test_emp PIVOT (SUM(salary) FOR languages IN ('en', 'se')) LIMIT 5;


    When doing full-text queries in the WHERE clause, results can be returned based on their score or relevance to the given query.
    e.g. SELECT SCORE(), * FROM library WHERE MATCH(name, 'dune') ORDER BY SCORE() DESC;

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
                "query": "SELECT * FROM actors WHERE text like ? LIMIT 5",                 
                // "query": "SELECT properties.kommunnamn, properties.trakt, properties.area, properties.fnr_fds FROM properties WHERE geometry.type = ? LIMIT 5",                 
                // "params": ['Transactional Pragmatist']                
                "params": ['Witer is%']                
            },
            timeout : 10000
        };
        let response = await axios(requestObj);        
        
        console.log(response.data);   
        
      
        
    } catch (error) {
        console.error(error);        
    }

}