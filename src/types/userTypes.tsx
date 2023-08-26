export type User = {
  address: string;
  userName: string;
  profileImage: string;
};

export type UserContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
