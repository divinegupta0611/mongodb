# mongodb
A beginner's guide to mongodb
These commands are for mongodb shell

# Index
1. Create
2. Read
3. Update
4. Delete

# Create/Insert operations
If the collection does not currently exist, insert operations create the collection.
1. db.inventory.insertOne(
   { item: "canvas", qty: 100, tags: ["cotton"], size: { h: 28, w: 35.5, uom: "cm" } }
   )
2. db.inventory.insertMany([
   { item: "journal", qty: 25, tags: ["blank", "red"], size: { h: 14, w: 21, uom: "cm" } },
   { item: "mat", qty: 85, tags: ["gray"], size: { h: 27.9, w: 35.5, uom: "cm" } },
   { item: "mousepad", qty: 25, tags: ["gel", "blue"], size: { h: 19, w: 22.85, uom: "cm" } }
   ])

# Read operations
1. db.inventory.find( { item: "canvas" } ) // Returns particular documents
2. db.inventory.find( {} ) // To fetch all the documents
3. db.inventory.find( { status: { $in: [ "A", "D" ] } } ) // In operator
4. db.inventory.find( { status: "A", qty: { $lt: 30 } } ) // AND operator
5. db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } ) // OR operator
6. db.inventory.find( { // AND + OR operator
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
   } )
8. db.inventory.find( { "size.h": { $lt: 15 } } ) // Embedded documents
9. db.inventory.find( { "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } ) // AND condition in embedded documents
10. db.inventory.find( { size: { h: 14, w: 21, uom: "cm" } } ) // For equality
11. db.inventory.find( { tags: ["red", "blank"] } ) // for Array elements and maintains the order
12. db.inventory.find( { tags: { $all: ["red", "blank"] } } ) // Doesn't maintain the order
13. db.inventory.find( { dim_cm: { $gt: 15, $lt: 20 } } ) // Can satisfy any one of the conditions
14. db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } ) // Has to satisfy both the conditions
15. db.inventory.find( { "dim_cm.1": { $gt: 25 } } ) // queries for all documents where the second element in the array dim_cm is greater than 25
16. db.inventory.find( { "tags": { $size: 3 } } ) // where tags has 3 elements
17. db.inventory.find( { "instock": { warehouse: "A", qty: 5 } } ) // Fetching from array of embedded documents - order should be the same
18. db.inventory.find( { 'instock.qty': { $lte: 20 } } ) // Fetching a particular field
19. db.inventory.find( { 'instock.0.qty': { $lte: 20 } } ) // Fetching a partcular field of a particular index
20. db.inventory.find( { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } } ) // Has to satisfy both the conditions
21. db.inventory.find( { "instock.qty": { $gt: 10,  $lte: 20 } } ) // either of the condition can satisfy
22. db.inventory.find( { "instock.qty": 5, "instock.warehouse": "A" } ) // Checks for the equality
23. db.inventory.find( { status: "A" }, { item: 1, status: 1 } ) // Returns the specified fields
24. db.inventory.find( { status: "A" }, { item: 1, status: 1, _id: 0 } ) // Suppress the id field
25. db.inventory.find( { status: "A" }, { status: 0, instock: 0 } ) // Return all but the excluded field
26. db.inventory.find( // Return specific field in the embedded document
   { status: "A" },
   { item: 1, status: 1, "size.uom": 1 }
   ) 
27. db.inventory.find( // Suppress specific field in the embedded document
   { status: "A" },
   { "size.uom": 0 }
   )
28. db.inventory.find( { status: "A" }, { item: 1, status: 1, "instock.qty": 1 } ) // Projection of embedded document in an array
29. db.inventory.find( { status: "A" }, { item: 1, status: 1, instock: { $slice: -1 } } ) // Returns the last element of instock array
30. db.inventory.find( { item: null } ) // Returns the documents whose item value is null or doesn't have item value
31. db.inventory.find( { item: { $ne : null } } ) // To query for field whose value exist and is not null
32. db.inventory.find( { item : { $type: 10 } } ) // Returns the document whose item field has a value of null
33. db.inventory.find( { item : { $exists: false } } ) // Returns the document where item field does not exist

# Update Operations
1. db.inventory.updateOne( // Updates only one document 
   { item: "paper" },
   {
     $set: { "size.uom": "cm", status: "P" },
     $currentDate: { lastModified: true }
   }
   )
2. db.inventory.updateMany(
   { "qty": { $lt: 50 } },
   {
     $set: { "size.uom": "in", status: "P" },
     $currentDate: { lastModified: true }
   }
   )
3. db.inventory.replaceOne(
   { item: "paper" },
   { item: "paper", instock: [ { warehouse: "A", qty: 60 }, { warehouse: "B", qty: 40 } ] }
   )
4. db.students.updateOne( // Aggregation pipeline
     { _id: 3 },
     [
       {
         $set: {
           test3: 98,           // add/update test3
           modified: "$$NOW"    // set current timestamp
         }
       }
     ]
   )
 

# Remove Operations
1. db.inventory.deleteMany({}) // Delete all the documents
2. db.inventory.deleteMany({ status : "A" }) // Delete many documents with specified condition
3. db.inventory.deleteOne( { status: "D" } ) // Delete one document with specified condition
