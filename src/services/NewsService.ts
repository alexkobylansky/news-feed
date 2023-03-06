import {getAllPosts, getPostById, getDeletePost} from "../apis/api";

export const getPosts = async (count: number, limiti: number) => {
  return await getAllPosts(count, limiti)
};

export const getRandomPosts = async (count: number): Promise<IPost[] | undefined> => {
  const idSet = new Set<number>();
  const randomId = () => Math.floor(Math.random() * 100);
  const randomPostsArray: IPost[] = [];
  for (let i = 0; ; i++) {
    const id = randomId();
    // If id !== 0
    if (id) {
      idSet.add(id);
      if (idSet.size === count) {
        break
      }
    }
  }
  for (const value of idSet) {
    const post = await getPostById(value);
    if (post) {
      randomPostsArray.push(post)
    }
  }
  return randomPostsArray
};

export const deletePost = async (id: number): Promise<boolean | undefined> => {
  return await getDeletePost(id);
};