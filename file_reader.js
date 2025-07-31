const fs = require("fs").promises;
const path = require("path");

const firstnamePath = path.join(__dirname, "firstname.txt");
const lastnamePath = path.join(__dirname, "lastname.txt");
const agePath = path.join(__dirname, "age.txt");
const hobbiesPath = path.join(__dirname, "hobbies.txt");

// THEN-CATCH SOLUTION BELOW THIS LINE
function readWithThenCatch() {
  fs.readFile(firstnamePath, { encoding: "utf8" })
    .then((firstname) => {
      return fs
        .readFile(lastnamePath, { encoding: "utf8" })
        .then((lastname) => ({ firstname, lastname }));
    })
    .then((data) => {
      return fs
        .readFile(agePath, { encoding: "utf8" })
        .then((age) => ({ ...data, age }));
    })
    .then((data) => {
      return fs
        .readFile(hobbiesPath, { encoding: "utf8" })
        .then((hobbiesData) => {
          const hobbies = JSON.parse(hobbiesData);
          return { ...data, hobbies };
        });
    })
    .then((data) => {
      const { firstname, lastname, age, hobbies } = data;
      console.log(
        `[then-catch] ${firstname.trim()} ${lastname.trim()} is ${age.trim()} years old and his hobbies are ${
          hobbies[0]
        } and ${hobbies[1]}`
      );
    })
    .catch((err) => {
      console.error("Error then-catch:", err.message);
    });
}

// ASYNC/AWAIT SOLUTION BELOW THIS LINE
async function readWithAsyncAwait() {
  try {
    const firstname = await fs.readFile(firstnamePath, { encoding: "utf8" });
    const lastname = await fs.readFile(lastnamePath, { encoding: "utf8" });
    const age = await fs.readFile(agePath, { encoding: "utf8" });
    const hobbiesData = await fs.readFile(hobbiesPath, { encoding: "utf8" });

    const hobbies = JSON.parse(hobbiesData);

    console.log(
      `[async/await] ${firstname.trim()} ${lastname.trim()} is ${age.trim()} years old and his hobbies are ${
        hobbies[0]
      } and ${hobbies[1]}`
    );
  } catch (err) {
    console.error("Error async/await:", err.message);
  }
}

readWithThenCatch();
readWithAsyncAwait();
