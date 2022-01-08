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
    addUser: async (
      parent,
      { firstname, lastname, username, email, password }
    ) => {
      const user = await User.create({
        firstname,
        lastname,
        username,
        email,
        password,
      });
      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (
      parent,
      { firstname, lastname, username, email },
      context
    ) => {
      if (context.user) {
        const friend = await friend.create({
          firstname,
          lastname,
          username,
          email,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friend } }
        );

        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addFocus: async (parent, { title, description }, context) => {
      if (context.user) {
        const focus = await focus.create({
          title,
          description,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { focuses: focus } }
        );

        return focus;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addSpark: async (parent, { title, description }, context) => {
      if (context.user) {
        const spark = await spark.create({
          title,
          description,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { sparks: spark } }
        );

        return spark;
      }
      throw new AuthenticationError("You need to be logged in!");
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

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in");
    },

    removeSpark: async (parent, { sparkId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { sparks: { _id: sparkId } } }
        );
      }
      throw new AuthenticationError("Please log in");
    },
  },
};

module.export = resolvers;
