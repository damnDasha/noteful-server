/* eslint-disable quotes */
const knex = require("knex");
const app = require("../src/app");
const { TEST_DATABASE_URL } = require("../src/config");
const { makeNotesArray, makeFoldersArray } = require("./notes.fixtures");

describe("Notes Endpoints", function () {
  let db;
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db("notes")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE folders RESTART IDENTITY CASCADE"))
  );

  afterEach("cleanup", () =>
    db("notes")
      .truncate()
      .then(() => db.raw("TRUNCATE TABLE folders RESTART IDENTITY CASCADE"))
  );

  context("Given there are notes in the database", () => {
    const testFolders = makeFoldersArray();
    const testNotes = makeNotesArray();

    beforeEach("insert folders", () => {
      return db.insert(testFolders).into("folders");
    });
    beforeEach("insert notes", () => {
      return db.insert(testNotes).into("notes");
    });
    it("responds with 200 and all of the notes", () => {
      return supertest(app).get("/notes").expect(200, testNotes);
    });
  });

  describe("GET /notes/:id", () => {
    context("Given no notes in the database", () => {
      it("responds with 404", () => {
        const id = 123456;
  
        return supertest(app).get(`/notes/${id}`).expect(404);
      });
    });
  });
 
});


