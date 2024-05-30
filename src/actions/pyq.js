'usre server';
import { conectDB } from "@/lib/conection";
import Pyq from "@/models/Pyq";
import Subject from "@/models/Subject";

conectDB();

export const fetchPyq = async ({ branch, sem, subject } = {}) => {
    try {
        let pyqs = [];
        if (branch && sem && subject) {
            const sub = await Subject.findOne({
                $and: [{ name: subject }, { sem }, { branch }],
            });
            if (!sub) pyqs = [];
            else
                pyqs = await Pyq.find({ subject: sub._id }).populate([
                    { path: "subject", model: Subject },
                    // { path: "subject.branch", model: Branch },
                ]);
        } else {
            pyqs = await Pyq.find().populate([
                { path: "subject", model: Subject },
                // { path: "subject.branch", model: Branch },
            ]);
        }
        return pyqs
    } catch (error) {
        console.log(error);
        return []
    }
};