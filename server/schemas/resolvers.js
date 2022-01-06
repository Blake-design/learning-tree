const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in");
    },
  },

  Mutation: {
    addUser: async (parent, { firstname, lastname, email, password }) => {
      const user = await User.create({ firstname, lastname, email, password });
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne(username);

      if (!user) {
        throw new AuthenticationError("Wrong username/password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong username/password");
      }

      const token = signToken(user);

      return { token, user };
    },

    removeUser: async (parent, args, { context }) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in");
    },
  },
};

module.export = resolvers;
