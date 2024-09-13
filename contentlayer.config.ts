import { defineDocumentType, makeSource } from "contentlayer2/source-files"

export const Post = defineDocumentType(() => ({
  computedFields: {
    url: {
      resolve: (post) => `/${post._raw.flattenedPath}`,
      type: "string"
    }
  },
  fields: {
    date: { required: true, type: "date" },
    description: { required: true, type: "string" },
    edited: { required: false, type: "date" },
    icon: { required: false, type: "string" },
    page: { required: false, type: "boolean" },
    showDate: { required: false, type: "boolean" },
    title: { required: true, type: "string" }
  },
  filePathPattern: `**/*.md`,
  name: "Post"
}))

export default makeSource({
  contentDirPath: "content/posts",
  documentTypes: [Post]
})
