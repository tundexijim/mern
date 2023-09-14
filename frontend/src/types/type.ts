export interface Note {
    _id: string;
    title: string;
    content: string;
    category: string;
  }

  export interface user {
    _id: string;
    name: string;
    email: string;
    pic: string;
    isAdmin: boolean;
    token: string;
  }