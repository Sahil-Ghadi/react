import conf from "../conf/conf";
import { Client,Databases,Storage,Query } from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectiontID,
                slug,
                //here slug is used as document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
    //here we take doc Id as first parameter as it is reqired
    try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseID,
            conf.appwriteCollectiontID,
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
                conf.appwriteDatabaseID,
                conf.appwriteCollectiontID,
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
                conf.appwriteDatabaseID,
                conf.appwriteCollectiontID,
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
                conf.appwriteDatabaseID,
                conf.appwriteCollectiontID,
                queries
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
                conf.appwriteBucketID,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }
    async deleteFile(fileID){
        try {
            //order of parameters is important
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileID,
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }
   
    getFilePreview(fileID){
        //we get a url here
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileID
        )
    }
}

const service = new Service()
export default service