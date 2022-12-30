module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './checklist.db'
    },
    useNullAsDefault: true
  }
};
