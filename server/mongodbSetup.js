const { MongoClient } = require("mongodb");

async function main() {
  const uri =
    "mongodb+srv://dylanmasschelein:<password>@cluster0.bzy9l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  // const newListings = [  // ------------------------ a list of objects to demo inserting many objs
  //   {
  //     name: "george",
  //     place: "portugal",
  //   },
  //   {
  //     name: "george",
  //     place: "portugal",
  //   },
  //   {
  //     name: "george",
  //     place: "portugal",
  //   },
  // ];

  try {
    await client.connect();

    // await findMultipleListings(client, { --- calling the fucntion to find multiple listings
    //   minBedrooms: 2,
    //   minBathrooms: 2,
    //   maxNumberOfResults: 5,
    // });

    // await findOneListingByName(client, "george");  ---------- finding a single document

    // await createMultipleListing(client, newListings); --------- inserting many documents, the objects are removed from the array!

    // await createListing(client, {  -------- creating a single new document call
    //   name: "lofty",
    //   summary: "lofty",
    //   bedroom: "3",
    // });

    // await listDatabases(client); -------- just a call to list the databases in the collection
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

// ------------ Finding multiple listings --- probably how id go about finding areas within your country/province etc..
async function findMultipleListings(
  client,
  {
    minBedrooms = 0,
    minBathrooms = 0,
    maxNumberOfResults = Number.MAX_SAFE_INTEGER,
  } = {}
) {
  const cursor = client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .find({
      bedrooms: { $gte: minBedrooms }, // gte === greaterThan or equal to ---- checkout query operators in the docs
      bathrooms: { $gte: minBathrooms },
    })
    .sort({ last_review: -1 }) // acednding/decsending
    .limit(maxNumberOfResults); //Limits number of queries returned

  const result = await cursor.toArray(); // store the results in an array

  console.log(result);
}

// ----------- Finding a single listing
async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .findOne({ name: nameOfListing });

  if (result) {
    console.log("found listing");
  } else {
    console.log("no listings found");
  }
}

// createing a single new document/object
async function createListing(client, newListing) {
  const result = await client
    .db("smaple_airbnb")
    .collection("listingsAndReviews")
    .insertOne(newListing);

  console.log("new listing created");
}

async function createMultipleListing(client, newListings) {
  const result = await client
    .db("sample_airbnb")
    .collection("listingsAndReviews")
    .insertMany(newListings);

  console.log(`${result.insertedCount} new listings with the following ides`);
  console.log(result.insertedIds);
}

// listing out existing collections
async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("databases");

  databasesList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
}

// look into updating a document when necessary
// look into upsert which updates a document if it exists or inserts the document if it doesn't exist
// Upsert is just an extra parameter on "updateOne"
//updateMany can be used to add any and all listings an extra field
// LOOK INTO DELETE WHEN NEEDED
