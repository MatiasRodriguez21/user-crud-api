import { User } from './models/User';

export const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getUser: async (_: any, { id }: { id: string }) => await User.findById(id),
  },
  Mutation: {
    createUser: async (_: any, { name, email, password }: { name: string, email: string, password: string }) => {
      const user = new User({ name, email, password });
      await user.save();
      return user;
    },
    updateUser: async (_: any, { id, name, email, password }: { id: string, name?: string, email?: string, password?: string }) => {
      const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
      return user;
    },
    deleteUser: async (_: any, { id }: { id: string }) => {
      const user = await User.findByIdAndDelete(id);
      return user;
    },
  },
};
