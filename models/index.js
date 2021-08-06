const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
  foreignKey: 'username_id',
});

Blog.belongsTo(User, {
  foreignKey: 'username_id',
});

module.exports = { User, Blog };