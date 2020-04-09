const folderService = {
  getAllFolders(knex) {
    return knex.select('*').from('folders');
  },

  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into('folders')
      .returning('*')
      .then((folder) => {
        return folder[0];
      });
  },

  getByFolderId(knex, id) {
    return knex.from('folders').select('*').where('id', id).first();
  },

  deleteFolder(knex, id) {
    return knex
      .where({
        id,
      })
      .delete();
  },

  updateFolder(knex, id, newFolderFields) {
    return knex('folders')
      .where({
        id,
      })
      .update(newFolderFields);
  },
};

module.exports = folderService;
