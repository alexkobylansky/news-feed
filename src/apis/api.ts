const url = new URL(`${process.env.REACT_APP_BASE_URL}`);

export const getPosts = async (count: number, limit: number): Promise<IPost[] | undefined> => {
  try {
    const res = await fetch(`${url}posts?_start=${count}&_limit=${limit}`);
    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      throw new Error('Not found')
    }
    throw new Error('Something went wrong')
  } catch (e) {
    console.log(e);
  }
};

export const getPostById = async (id: number): Promise<IPost | undefined> => {
  try {
    const res = await fetch(`${url}posts/${id}`);
    if (res.status === 200) {
      return await res.json()
    } else if (res.status === 404) {
      throw new Error('Not found')
    }
    throw new Error('Something went wrong')
  } catch (e) {
    console.log(e);
  }
};

export const deletePost = async (id: number): Promise<boolean | undefined> => {
  try {
    const res = await fetch(`${url}posts/${id}`);
    return res.status === 200;
  } catch (e: any) {
    console.log(e);
  }
};

export const submit = async (): Promise<IUser[] | undefined> => {
  try {
    const response = await fetch('/db/users.json');
    if (response.status === 200) {
      return await response.json();
    } else if (response.status === 400) {
      throw new Error("Bad request")
    } else if (response.status === 404) {
      throw new Error("Not found")
    }
    throw new Error("Something went wrong")
  } catch (e: any) {
    console.log(e);
  }
};