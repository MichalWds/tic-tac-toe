import {collection} from "firebase/firestore";
import {db} from "./init-firebase";

export const statsRef = collection(db, 'stats')