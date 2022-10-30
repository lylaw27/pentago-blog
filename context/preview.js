import React, { useState } from 'react'

const BlogContext = React.createContext()

export  const BlogProvider = (props) => {
  const [blogContent, setBlogContent] = useState({
        title: "",
        subtitle: "",
        article: "",
        timestamp: "",
        videoUrl: "",
        category: "樓價",
        contentType: "英國懶人包",
        uploadDate : "",
        image_id: [],
        url: "",
        imagefile: [],
  })
  const [article,setArticle] = useState('')
  const [blogImage,setBlogImage] = useState([]);


  return <BlogContext.Provider value={{ useBlogContent: [blogContent, setBlogContent], useArticle:[article,setArticle], useBlogImage:[blogImage,setBlogImage]}}>{props.children}</BlogContext.Provider>
}

export default BlogContext;
