npm install @elastic/elasticsearch --save
npm install dotenv --save


Elasticsearch is a distributed document store. Instead of storing information as rows of columnar data, 
Elasticsearch stores complex data structures that have been serialized as JSON documents. 
When you have multiple Elasticsearch nodes in a cluster, stored documents are distributed across the cluster and can be accessed immediately from any node
When a document is stored, it is indexed and fully searchable in near real-time--within 1 second.
Elasticsearch uses a data structure called an inverted index that supports very fast full-text searches. 
An inverted index lists every unique word that appears in any document and identifies all of the documents each word occurs in.
text fields are stored in inverted indices, and numeric and geo fields are stored in BKD trees
The ability to use the per-field data structures to assemble and return search results is what makes Elasticsearch so fast.

Elasticsearch also has the ability to be schema-less, which means that documents can be indexed without explicitly specifying 
how to handle each of the different fields that might occur in a document. 
When dynamic mapping is enabled, Elasticsearch automatically detects and adds new fields to the index. 
This default behavior makes it easy to index and explore your data—​just start indexing documents and Elasticsearch 
will detect and map booleans, floating point and integer values, dates, and strings to the appropriate Elasticsearch data types.

You can define rules to control dynamic mapping and explicitly define mappings to take full control of how fields are stored and indexed.
Defining your own mappings enables you to:
    Distinguish between full-text string fields and exact value string fields
    Perform language-specific text analysis
    Optimize fields for partial matching
    Use custom date formats
    Use data types such as geo_point and geo_shape that cannot be automatically detected

It’s often useful to index the same field in different ways for different purposes. 
For example, you might want to index a string field as both a text field for full-text search and as a keyword field for 
sorting or aggregating your data. 
Or, you might choose to use more than one language analyzer to process the contents of a string field that contains user input.

The full suite of search capabilities built on the Apache Lucene search engine library.

Types of queries-
structured queries, -- can be done by sql.  SQL does not give a seach score for each hit.
full text queries, and  -- gives score.
complex queries that combine the two


Elasticsearch exposes an HTTP layer to communicate with, and the client is a library that will help you do this. Because of this reason, you will see HTTP related parameters, such as body or headers.

Every API can accept two objects. 
The first contains all the parameters that will be sent to Elasticsearch.
The second includes the request specific parameters, such as timeouts, headers, and so on. 
In the first object, every parameter but the body will be sent via querystring or url parameter, depending on the API, and every unrecognized parameter will be sent as querystring.


Datatype 'text' --> an analyzed field, that is a full-text value that is interpreted in order to be effectively indexed.
are not used for sorting or aggregations 

Datatype 'keyword' --> type for storing the exact value. for sorting and aggregations.