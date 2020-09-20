Types of Aggregations:
1. Bucketing
Each document that meet the criteria is kept in a separate bucket. Each bucket has an agregation key and a criteria.
one can potentially associate aggregations on the bucket level, and those will execute within the context of that bucket. 
This is where the real power of aggregations kicks in: aggregations can be nested!
Bucketing aggregations can have sub-aggregations (bucketing or metric). The sub-aggregations will be computed for the buckets which their parent aggregation generates.

2. Metric
Aggregations that keep track and compute metrics over a set of documents.
It compute metrics based on values extracted in one way or another from the documents that are being aggregated.
The values are typically extracted from the fields of the document (using the field data), but can also be generated using scripts.

POST /exams/_search?size=0
{
  "size": 0,  //only aggreagted fields are returned. hits are not returned.
  "aggs": {
    "avg_grade": { "avg": { "field": "grade" } }
  }
}

Response:
{
  ...
  "aggregations": {
    "avg_grade": {
      "value": 75.0
    }
  }
}

3. Matrix
A family of aggregations that operate on multiple fields and produce a matrix result based on the values extracted from the requested document fields. Unlike metric and bucket aggregations, this aggregation family does not yet support scripting.

4. Pipeline
Aggregations that aggregate the output of other aggregations and their associated metrics

"aggregations" : {
    "<aggregation_name>" : {
        "<aggregation_type>" : {
            <aggregation_body>
        }
        [,"meta" : {  [<meta_data_body>] } ]?
        [,"aggregations" : { [<sub_aggregation>]+ } ]?
    }
    [,"<aggregation_name_2>" : { ... } ]*
}


