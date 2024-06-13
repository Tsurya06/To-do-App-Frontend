export type ReqType = {
  body?: object;
  params?: {};
  type?: string;
  id?: string;
};
export type TodoType = {
  id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  image_url?: string;
};

export type loginSignupType = { name: string; email: string; password: string };
