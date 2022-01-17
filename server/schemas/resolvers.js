const { AuthenticationError } = require("apollo-server-express");
const { query } = require("express");
const { user } = require("../config/connection");
const { User } = require("../models");
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
      throw new AuthenticationError("Please log in to view your profile.");
    },

    sparks: async (parent, { userName }) => {
      return Spark.find({ userName: userName });
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
        return User.findOneAndDelete({ userName: context.user.userName });
      }
      throw new AuthenticationError("Please log in");
    },

    addSpark: async (parent, { title, description }, context) => {
      console.log("we hit the function");
      if (context.user) {
        const spark = {
          title,
          description,
        };
        console.log(" obj assign was ran");
        await User.findOneAndUpdate(
          { userName: context.user.userName },
          { $push: { sparks: spark } }
        );
        console.log("find and update ran ");
        await User.save();
        console.log("document saved ");
        return spark;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    addSpark2Spark: async (
      parent,
      { parentTitle, title, description },
      context
    ) => {
      if (context.user) {
        const childSpark = {
          title,
          description,
        };

        function findParent(spark) {
          if ((spark.title = parentTitle)) {
            spark.push(childSpark);
          } else
            spark.map((spark) => {
              findParent(spark);
            });
        }
        try {
          user.sparks.map((spark) => {
            findParent(spark);
          });
        } catch (error) {
          console.error("could not find parent");
        }
        await User.save();
        return User;
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeSpark: async (parent, { title }, context) => {
      if (context.user) {
        function findParent(spark) {
          if ((spark.title = title)) {
            spark.remove();
          } else
            spark.map((s) => {
              findParent(s);
            });
        }
        try {
          user.sparks.map((spark) => {
            findParent(spark);
          });
        } catch (error) {
          console.error("could not find parent");
        }
        await User.save();
        return User;
      }
      throw new AuthenticationError("Please log in");
    },

    addFriend: async (parent, { userName }, context) => {
      console.log("we hit the function");
      if (context.user) {
        const friend = await User.findOne({ userName: userName });
        console.log("we found the friends account");
        await User.findOneAndUpdate(
          { userName: context.user.userName },
          { $push: { friends: friend } },
          { new: true }
        );
        console.log("we updated your account ");

        return friend;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeFriend: async (parent, { userName }, context) => {
      if (context.user) {
        const friend = await User.findOne({ userName: userName });
        User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { friends: { _id: friend } } }
        );
      }
      throw new AuthenticationError("Please log in");
    },
  },
};
module.exports = resolvers;
