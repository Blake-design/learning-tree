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

    addFocus: async (parent, { title, createdBy }) => {
      const focus = await Focus.create( { title, createdBy });

      await User.findOneAndUpdate(
        { username: createdBy },
        { $addToSet: { foci: focus._id }}
      );

      return focus;
    },

    addSpark: async (parent, { focusId, title, description }) => {
      return Focus.findOneAndUpdate(
        { _id: focusId },
        { $addToSet: { sparks: { title, description } }},
        {
          new: true,
          runValidators: true
        }
      )
    },

    removeFocus: async (parent, { focusId }) => {
      return Focus.findOneAndDelete({ _id: focusId })
    },

    removeSpark: async (parent, { focusId, sparkId }) => {
      return Focus.findOneAndUpdate(
        { id: focusId },
        { $pull: { sparks: { _id: sparkId } }},
        { new: true }
      )
    }

  },
};

module.export = resolvers;
