// Sources
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAUf-nHHI2__98Q4136LGCQTMP-GQh5T-0",
    authDomain: "softing-429223.firebaseapp.com",
    projectId: "softing-429223",
    storageBucket: "softing-429223.appspot.com",
    messagingSenderId: "38865749696",
    appId: "1:38865749696:web:8b7948a422d874d2ee0f25",
    measurementId: "G-G16R6HNS2B"
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadImage = async (file: File, folder: string, fileName: string) => {
    const storageRef = ref(storage, `${folder}/${fileName}`);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
};

const deleteImage = async (folder: string, fileName: string) => {
    const storageRef = ref(storage, `${folder}/${fileName}`);

    return await deleteObject(storageRef);
}

export { storage, uploadImage, deleteImage };