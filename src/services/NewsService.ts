const url = new URL(`${process.env.REACT_APP_BASE_URL}`);

export const getAllPosts = async (count: number) => {
  try {
    const res = await fetch(`${url}posts?_start=${count}&_limit=12`);
    if (res.status === 200) {
      return await res.json();
    } else if (res.status === 404) {
      return new Error('Something went wrong')
    }
  } catch (e) {
    console.log(e);
    return []
  }
};

export const getPostById = async (id: number) => {
  try {
    const res = await fetch(`${url}posts/${id}`);
    if (res.status === 200) {
      return await res.json()
    } else if (res.status === 404) {
      return new Error('Something went wrong')
    }
  } catch (e) {
    console.log(e);
  }
}