import {
    createRequire
} from "module";
const require = createRequire(
    import.meta.url);
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {
    useNewUrlParser: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please name data, because it is missing!"],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 8,
    review: "Kiwi a day keeps what away?",
});

const orange = new Fruit({
    // name: "Orange",
    rating: 4,
    review: "Too sour for Angela",
});

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Very nutritious",
});

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great Stuff",
});

// pineapple.save()
// orange.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    favFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

const bob = new Person({
    name: "Bob",
    age: 25,
});

const Amy = new Person({
    name: "Bob",
    age: 25,
    favFruit: pineapple,
});

// Amy.save()

// bob.save()

const katya = new Person({
    name: "Katya",
    age: 32,
    height: 172,
});

Person.updateOne({
    name: "Katya"
}, {
    favFruit: pineapple
}, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated");
    }
});

// Person.updateOne({ favFruit: pineapple, }, { name: "Amy" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated");
//     }
// }
// );

// katya.save()

// Fruit.insertMany([kiwi, orange, banana], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("success");
//     }
// })
// person.save()

// Fruit.find(function (err, fruits) {
//     if (err) {
//         console.log(err);
//     } else {
//         fruits.forEach((e) => console.log(e.name));
//     }
//     mongoose.connection.close();
// });

// Fruit.updateOne({ _id: "614c4807df3980bbb053ff87" }, { name: "Peach" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated")
//     }
// })

// Fruit.deleteMany({ name: "Bob", id: "614c4e3aa96f85bdf1c48db7", age: 25 }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted")
//     }
// })

// Person.insertMany([bob, katya], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully added")
//     }
// })

Person.find(function (err, people) {
    if (err) {
        console.log(err);
    } else {
        people.forEach((e) => console.log(e.name));
    }
    mongoose.connection.close();
});
// Person.deleteMany({ name: "Katya" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted")
//     } mongoose.connection.close();
// })
