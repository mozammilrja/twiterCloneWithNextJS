
import { useRef, useState } from "react";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
// import { Picker } from "emoji-mart";



const Input = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
    
    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
    //   id: session.user.uid,
    //   username: session.user.name,
    //   userImg: session.user.image,
    //   tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        
        if (selectedFile) {
          await uploadString(imageRef, selectedFile, "data_url").then(
            async () => {
              const downloadURL = await getDownloadURL(imageRef);
              await updateDoc(doc(db, "posts", docRef.id), {
                image: downloadURL,
              });
            }
          );
        }
        
            setLoading(false);
            setInput("");
            setSelectedFile(null);
            setShowEmojis(false);
    }

 const addImageToPost = (e) => {
   const reader = new FileReader();
   if (e.target.files[0]) {
     reader.readAsDataURL(e.target.files[0]);
   }

   reader.onload = (readerEvent) => {
     setSelectedFile(readerEvent.target.result);
   };
};
  
      const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
      };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${
        loading && "opacity-60"
      }`}
    > 
      <img
        className='h-10 w-10 rounded-full cusdor-pointer'
        src='data:image/png;base64,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'
      />
      <div className='divide-y divide-gray-700 w-full'>
        <div className=''>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
          />

          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='text-white h-5' />
              </div>
              <img
                src={selectedFile}
                alt=''
                className='rounded-2xl max-h-80 object-contain'
              />
            </div>
          )}
        </div>
        {!loading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='text-[#1d9bf0] h-[22px]' />
                <input
                  type='file'
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
              </div>

              <div className='icon rotate-90'>
                <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              <div className='icon'>
                <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>
            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
