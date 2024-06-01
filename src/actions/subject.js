'use server';
import { conectDB } from "@/lib/conection";
import Subject from "@/models/Subject";


conectDB();

export const fetchSubjects = async ({ branch, sem } = {}) => {
    
    
    try {
        let subjects = [];

        if (branch && sem)
            subjects = await Subject.find({ $and: [{ branch }, { sem }] });
        
        else subjects = await Subject.find({});
        return subjects;

    } catch (error) {
        console.log(error);
        return []
    }
};