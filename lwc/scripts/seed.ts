process.env.DATABASE_URL = "mongodb+srv://jethvaharsh333:3u2X5tufCRahcJnC@cluster0.aom9pia.mongodb.net/testing3?retryWrites=true&w=majority"
const { PrismaClient } = require("@prisma/client");
// import dotenv from "dotenv";

// dotenv.config();

const database = new PrismaClient();
// console.log("DATABASE_URL:", process.env.DATABASE_URL);
async function main() {
    try{
        await database.category.deleteMany();
        await database.category.createMany({
            data: [
                { name: "Computer Science"},
                { name: "Music"},
                { name: "Fitness"},
                { name: "Photography"},
                { name: "Accounting"},
                { name: "Engineering"},
                { name: "Filming"},
            ],
        });

        // console.log("success");
    }
    catch(error){
        console.log("Error seeding the database categories", error);
    }
    finally{
        await database.$disconnect();
    }
}

main();