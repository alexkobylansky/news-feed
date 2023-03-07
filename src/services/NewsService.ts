import {getPostById} from "../apis/api";

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