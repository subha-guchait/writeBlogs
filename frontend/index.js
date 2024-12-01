const createBlogForm = document.getElementById("create-blog-form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const content = document.getElementById("content");
const blogList = document.getElementById("blogs-list");

createBlogForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    const blogDetails = {
      title: title.value,
      author: author.value,
      content: content.value,
    };
    console.log(blogDetails);
    const response = await axios.post(
      "http://localhost:3000/create-blog",
      blogDetails
    );
    displayBlog(response);
    form.reset();
  } catch (err) {
    console.log(err);
  }
});

function displayBlog(blogDetails) {
  const blogItem = document.createElement("li");
  blogItem.setAttribute("id", blogDetails.id);
  blogItem.innerHTML = `
    <h2>${blogDetails.title}</h2>
    <h3>Author: ${blogDetails.author}</h3>
    <p>${blogDetails.content}</p>
    `;
  blogList.appendChild(blogItem);
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const blogs = await axios.get("http://localhost:3000/blogs");
    for (let i = 0; i < blogs.data.length; i++) {
      displayBlog(blogs.data[i]);
    }
  } catch (err) {
    console.log(err);
  }
});
