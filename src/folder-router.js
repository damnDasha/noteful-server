const path = require("path");
const express = require("express");
const folderService = require("./folders-service");

const folderRouter = express.Router();
const jsonParser = express.json();

const serializeFolders = (folder) => ({
  id: folder.id,
  title: folder.title,
});

folderRouter
  .route("/:id")

  .all((req, res, next) => {
    folderService
      .getByFolderId(req.app.get("db"), req.params.id)
      .then((folder) => {
        if (!folder)
          return res.status(404).json({
            error: {
              message: "Folder does not exist",
            },
          });
        else {
          res.status(201).json(folder);
        }
      })
      .catch(next);
  })

  .patch((req, res, next) => {
    const { title } = req.body;
    const folder = {
      title,
    };
    if (!title) {
      return res.status(404).json({
        error: "Must include title",
      });
    }
    folderService.updateFolder(req.app.get("db"), folder).catch(next);
  })
  .delete((req, res, next) => {
    folderService
      .deleteFolder(req.app.get("db"), req.params.id)
      .then(() => {
        res.status(204).end();
      })
      .catch(next);
  });

folderRouter
  .route("/")
  .get((req, res, next) => {
    folderService
      .getAllFolders(req.app.get("db"))
      .then((folders) => {
        res.json(folders.map(serializeFolders));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title } = req.body;
    const newFolder = {
      title,
    };
    if (!title) {
      return res.status(404).json({
        error: {
          message: "Must include title",
        },
      });
    }

    newFolder.title = title;

    folderService.insertFolder(req.app.get("db"), newFolder).then((folder) => {
      res.json(folder).then((folder) => {
        res.status(201).json(serializeFolders(folder));
      });
    });
  });

module.exports = folderRouter;
