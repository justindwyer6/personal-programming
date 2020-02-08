const mongoose   = require("mongoose"),
      Campground = require("./models/campground")
      Comment    = require("./models/comment")

var seeds = [
    {
        name: "Chad Kroeger's Party Hard Outdoor Adventures",
        image: "http://cdn0.wideopenspaces.com/wp-content/uploads/2015/04/slide1.png",
        description: "Don't camp like a shmole, camp like Chad Kroeger and get righteously raged out while bonding with your bros. Well, the way they make shows is, they make one show. That show's called a pilot. Then they show that show to the people who make shows, and on the strength of that one show they decide if they're going to make more shows. Some pilots get picked and become television programs. Some don't, become nothing. She starred in one of the ones that became nothing."
    },
    {
        name: "Boulder Rock Creek",
        image: "http://www.wrightpatmanlake.com/wp-content/uploads/2015/07/Rocky-Point-campground-4.jpg",
        description: "You like rocks? You like the outdoors? You ok sleeping on rocks? Or boulders? Those are your choices. Pommy ipsum smeg head whizz morris dancers come hither, bugger codswallop gob. Taking the mick middle class bog roll bow ties are cool posh nosh off t'shop, stew and dumps taking the mick know your onions pulled a right corker 'tis, anorak mince pies tosser warts and all knackered, complete mare stupendous proper on the beat."
    },
    {
        name: "Camp Nada",
        image: "https://media-cdn.tripadvisor.com/media/photo-s/01/3d/c0/b3/eastham.jpg",
        description: "Hay no nada aquí. ¡Retíraos! Bro ipsum dolor sit amet gaper backside single track, manny Bike epic clipless. Schraeder drop gondy, rail fatty slash gear jammer steeps clipless rip bowl couloir bomb hole berm. Huck cruiser crank endo, sucker hole piste ripping ACL huck greasy flow face plant pinner. Japan air Skate park big ring trucks shuttle stoked rock-ectomy."
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
