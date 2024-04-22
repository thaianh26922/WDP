import { Post } from "../Model/Post.js";

class PostData {
    constructor(post, priority) {
        this.post = post;
        this.priority = priority;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    setPost(post) {
        this.post = post;
    }
}

async function searchByKeyword(keyword) {
    const parts = keyword.split(' ');
    const posts = await Post.find().populate('jobCategory').populate('companyId').exec();
    let listData = [];
    let priority = 0;
    let postData = null;
    try {
        posts.forEach((post, index) => {
            postData = new PostData(null, 0);
            parts.forEach(part => {
                if (post.title.toLowerCase().includes(part.toLowerCase())) {
                    priority++;
                    postData.setPriority(priority);
                    postData.setPost(post);
                }
            });
            if (postData && postData.priority !== 0) {
                        listData.push(postData);
            }
            priority = 0;
        });
    } catch (error) {
        console.log(error);
    }
    return listData;
}

export { searchByKeyword }