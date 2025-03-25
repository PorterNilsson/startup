# Week 10

## Data Services

| Service | Specialty |
| --- | --- |
| MySQL | Relational queries |
| Redis | Memory cached objects |
| ElasticSearch | Ranked free text |
| MongoDB | JSON objects |
| DynamoDB | Key value pairs |
| Neo4J | Graph based data |
| InfluxDB | Time series data |

- Mongo DB's data model is literally just JSON objects which each have a unique ID
- ```JavaScript
      // find all houses
      db.house.find();
      
      // find houses with two or more bedrooms
      db.house.find({ beds: { $gte: 2 } });
      
      // find houses that are available with less than three beds
      db.house.find({ status: 'available', beds: { $lt: 3 } });
      
      // find houses with either less than three beds or less than $1000 a night
      db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000 })] });
      
      // find houses with the text 'modern' or 'beach' in the summary
      db.house.find({ summary: /(modern|beach)/i });
    ```

## Simon DB

- Must npm install mongoDB in service folder
