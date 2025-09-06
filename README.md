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
1. db.inventory.find( { item: "canvas" } )
2. db.inventory.find( {} )
3. db.inventory.find( { status: { $in: [ "A", "D" ] } } ) // In operator
4. db.inventory.find( { status: "A", qty: { $lt: 30 } } ) // AND operator
5. db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } ) // OR operator
6. db.inventory.find( { // AND + OR operator
     status: "A",
     $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
   } )
7. db.inventory.find( { "size.h": { $lt: 15 } } ) // Embedded documents
8. 

