import path from 'path';

const post = {
  title: 'How to overcome stress working as a group',
};
export default class Gif {
  constructor() {
    this.post = post;
    this.gifPost = {
      ...post,
      imagePath: path.resolve(__dirname, '../Images/giphy.gif'),
      incorrectImagePath: path.resolve(__dirname, '../Images/jpeg.JPG'),
    };
  }
}
