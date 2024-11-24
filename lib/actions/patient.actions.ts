import { Query } from "node-appwrite";
import { users } from "../appwrite.config"

// Define an interface for the Appwrite error structure
interface AppwriteError extends Error {
    code: number;
    response?: {
        message: string;
        code: number;
    };
}

export const createUser = async (user: CreateUserParams) => {
    try {
        // user creation logic

    } catch (error) {  // Removed the explicit type annotation
        // Type guard to ensure error is AppwriteError
        if (error && typeof error === 'object' && 'code' in error) {
            const appwriteError = error as AppwriteError;
            
            if (appwriteError.code === 409) {
                //Means user already exists 
                const existingUserDocuments = await users.list([
                    Query.equal('email', [user.email])
                ])
                return existingUserDocuments?.users[0]
            }
        }

        console.log(`error while creating user ${error}`)
    }
}