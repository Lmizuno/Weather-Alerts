import { getAuth } from "firebase/auth";
import { app } from "./FirebaseConfig";

export const auth = getAuth();