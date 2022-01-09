const { AuthenticationError } = require("apollo-server-express");
const { User, Focus, Spark } = require("../models");
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
    login: async (parent, { userName, password }) => {
      const user = await User.findOne(userName);

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
    addUser: async (
      parent,
      { firstName, lastName, userName, email, password }
    ) => {
      const user = await User.create({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
      const token = signToken(user);

      return { token, user };
    },
    addFriend: async (
      parent,
      { firstName, lastName, userName, email },
      context
    ) => {
      if (context.user) {
        const friend = await User.findById({
          firstName,
          lastName,
          userName,
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
        const focus = await Focus.create({
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
        const spark = await Spark.create({
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
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("Please log in");
    },
    removeFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: { _id: friendId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },
    removeFocus: async (parent, { focusId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { focuses: { _id: focusId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },

    removeSpark: async (parent, { sparkId }, context) => {
      if (context.user) {
        return Focus.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { sparks: { _id: sparkId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },
  },
};

module.export = resolvers;
