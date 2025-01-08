'use server';

import {CreateUserParams} from "@/types";
import {ID, Query} from "node-appwrite";
import {users} from "@/lib/appwrite.config";
import {parseStringify} from "@/lib/utils";

export const createUser = async (user: CreateUserParams) => {
    try {
        // https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        console.log({newUser});

        return parseStringify(newUser);
    } catch (error: any) {
        if (error && error?.code == 409) {
            const documents = await users.list([
                Query.equal('email', [user.email]),
            ]);

            return documents?.users[0];
        }
        console.error('inside catch of createUser:', error);
    }
}
