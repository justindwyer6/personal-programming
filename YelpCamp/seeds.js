const mongoose   = require("mongoose"),
      Campground = require("./models/campground")
      Comment    = require("./models/comment")

var seeds = [
    {
        name: "Chad Kroeger's Party Hard Outdoor Adventures",
        image: "http://cdn0.wideopenspaces.com/wp-content/uploads/2015/04/slide1.png",
        description: "Don't camp like a shmole, camp like Chad Kroeger and get righteously raged out while bonding with your bros"
    },
    {
        name: "Boulder Rock Creek",
        image: "http://www.wrightpatmanlake.com/wp-content/uploads/2015/07/Rocky-Point-campground-4.jpg",
        description: "You like rocks? You like the outdoors? You ok sleeping on rocks? Or boulders? Those are your choices."
    },
    {
        name: "Camp Nada",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/3d/c0/b3/eastham.jpg",
        description: "Hay no nada aquí. ¡Retíraos!"
    }
];

async function seedDB(){
    try {
        await Comment.deleteMany({});
        await Campground.deleteMany({});
        for(const seed of seeds) {
            let campground = await Campground.create(seed);
            let comment = await Comment.create(
                {
                    text: "You should see Oregon.",
                    author: "Kevin Shmole"
                }
            );
            campground.comments.push(comment);
            campground.save();
            console.log(`${seed.name} saved to the database.`);
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports = seedDB;
