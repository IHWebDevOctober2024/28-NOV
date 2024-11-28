const router = require("express").Router();
const Character = require("../models/Character.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/steal-data", async (req, res) => {
  const response = await fetch(
    "https://dragonball-api.com/api/characters?limit=200"
  );
  const jsonResponse = await response.json();

  const newArray = jsonResponse.items.map((eachCharacter) => {
    return {
      name: eachCharacter.name,
      image: eachCharacter.image,
      affiliation: eachCharacter.affiliation,
    };
  });
  await Character.deleteMany();
  const allCharacters = await Character.insertMany(newArray);
  // res.send("All characters have been deleted");
  res.json(allCharacters);
});

module.exports = router;
