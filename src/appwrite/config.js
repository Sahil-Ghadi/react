import conf from "../conf/conf";
import { Client,Databases,Storage,Query } from "appwrite";
import { ID } from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setProject(conf.appwriteProjectId)
        .setEndpoint(conf.appwriteUrl);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userID}){
        try {
            if (!title || !slug || !content || !status || !userID) {
                throw new Error("Missing required fields for post creation");
            }
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                //here slug is used as document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                },)
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
    //here we take doc Id as first parameter as it is reqired
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            })
    } catch (error) {
        console.log("Appwrite serive :: updatePost :: error", error);
    }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    //to get/find 1 post
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false;
        }
    }
    //file upload method

    async uploadFile(file){
        try {
            //order of parameters is important
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try {
            //order of parameters is important
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
   
    getFilePreview(fileId){
        //we get a url here
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            if (!fileId) {
                console.log("Missing required fileId for getFilePreview");
            }
        }
       
    }
}

const service = new Service()
export default service