function makeNotesArray() {
  return [
    {
      id: 1,
      title: 'Note 1',
      content: 'Content Content',
      date: '2029-01-22T16:28:32.615Z',
      folder_id: 1,
    },
    {
      id: 2,
      title: 'Note 2',
      content: 'Content Content 2',
      date: '2029-01-22T16:28:32.615Z',
      folder_id: 1,
    },
    {
      id: 3,
      title: 'Note 3',
      content: 'Content Content 3',
      date: '2029-01-22T16:28:32.615Z',
      folder_id: 2,
    },
  ];
}

function makeFoldersArray() {
  return [
    {
      id: 1,
      title: 'test folder 1',
    },
    {
      id: 2,
      title: 'test folder 2',
    },
  ];
}

module.exports = {
  makeNotesArray,
  makeFoldersArray,
};
