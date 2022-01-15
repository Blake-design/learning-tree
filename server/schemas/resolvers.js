const { AuthenticationError } = require("apollo-server-express");
const { query } = require("express");
const { User, Focus, Spark } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userName }) => {
      return User.findOne({ userName: userName });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ userName: context.user.userName });
      }
      throw new AuthenticationError("Please log in");
    },
    sparks: async (parent, { userName }) => {
      return Spark.find({ userName: userName });
    },
    focus: async (parent, { userName }) => {
      return Focus.find({ userName: userName });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Wrong email/password");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Wrong email/password");
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

    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user.userName });
      }
      throw new AuthenticationError("Please log in");
    },

    addFocus: async (parent, { title, description }, context) => {
      if (context.user) {
        const focus = await Focus.create({
          userName: context.user.userName,
          title,
          description,
        });

        await User.findOneAndUpdate(
          { userName: context.user.userName },
          { $push: { focuses: focus } },
          { new: true }
        );

        return { focus };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFocus: async (parent, { title }, context) => {
      if (context.user) {
        const focusId = Focus.findOneDelete({ title: title });
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { focuses: { _id: focusId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },

    addSpark: async (parent, { title, description }, context) => {
      console.log("we hit the function");
      if (context.user) {
        const spark = await Spark.create({
          userName: context.user.userName,
          title,
          description,
        });
        console.log("create was ran");
        await Focus.findOneAndUpdate(
          { userName: context.user.userName },
          { $push: { sparks: spark } }
        );
        console.log("find on and update ran ");
        return spark;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeSpark: async (parent, { title }, context) => {
      if (context.user) {
        const sparkId = await Spark.findOneAndDelete({ title: title });
        await User.findOneAndUpdate(
          { userName: context.user.userName },
          { $pull: { sparks: { _id: sparkId } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },

    addFriend: async (parent, { userName }, context) => {
      if (context.user) {
        const friend = await User.findOne({ userName: userName });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { friends: friend } }
        );

        return thought;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriend: async (parent, { userName }, context) => {
      if (context.user) {
        const friend = await User.findOneDelete({ userName: userName });
        User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: { _id: friend } } },
          { new: true }
        );
      }
      throw new AuthenticationError("Please log in");
    },
  },
};
module.exports = resolvers;
