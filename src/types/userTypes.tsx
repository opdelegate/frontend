export type User = {
  address: string;
  formattedAddress: string;
  userName: string;
  profileImage: string;
};

export type UserContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
