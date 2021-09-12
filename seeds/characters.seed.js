const mongoose = require("mongoose");
const Character = require("../models/Character.model");
const db = require("../db");

/**
 * Crear un array de datos iniciales para nuestra base de datos.
 */

const charactersSeed = [
  {
    name: "Lädelbar",
    level: 1,
    experiencie: 0,
    fightOptions: ['Ataque Básico', 'Ataque Especial', 'Defensa'],
    stats: {
      healthPoints: 10,
      attack: 1,
      defense: 1,
      criticalRate: 0.2,
      criticalDamage: 1.5,
    },
    image: 'https://res.cloudinary.com/dfxq5lwn7/image/upload/v1625090114/CRUD-battle/Erza_zbpxbg.png',
    imageSprite: ['https://res.cloudinary.com/dfxq5lwn7/image/upload/v1625121694/CRUD-battle/MicrosoftTeams-image_10_lmjinh.png'],
  },
  {
    name: "Ëldelgâsh",
    level: 1,
    experiencie: 0,
    stats: {
      healthPoints: 10,
      attack: 1,
      defense: 1,
      criticalRate: 0.2,
      criticalDamage: 1.5,
    },
    fightOptions: ['Ataque Básico', 'Ataque Especial', 'Defensa'],
    image: 'https://res.cloudinary.com/dfxq5lwn7/image/upload/v1625090113/CRUD-battle/jellal_qlmhoq.jpg',
    imageSprite: ['https://res.cloudinary.com/dfxq5lwn7/image/upload/v1625121694/CRUD-battle/MicrosoftTeams-image_9_uezyii.png'],
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connecting to the database from the seed...");

    const allCharacters = await Character.find();

    if (allCharacters.length) {

      await Character.collection.drop();
      console.log("Character collection dropped successfully...");
    }
  })
  .then(async () => {

    await Character.insertMany(charactersSeed);
    console.log("SUCCESS: Characters added successfully...");
  })
  .catch((error) => {
    console.log("Error adding the characters seed", error);
  })
  .finally(() => mongoose.disconnect());
