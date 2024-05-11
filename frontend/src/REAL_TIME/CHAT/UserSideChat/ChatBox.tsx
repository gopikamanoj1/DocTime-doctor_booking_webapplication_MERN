import React, { useState, useEffect, useRef, ChangeEvent } from "react";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../../AxiosConfig/axiosInstance";
import { format } from "date-fns"; 
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"; 
import EmojiPicker from "emoji-picker-react"; 
import AudioWaveLoader from "../AudioChat/AudioWaveLoader";
import SendIcon from "../AudioChat/SendIcon";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css"; 
interface ChatBoxProps {
  selectedDoctor: any;
  socket: any;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedDoctor, socket }) => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false); 
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const { convesationId } = useParams();
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const User = useSelector((state: any) => state.persisted.auth);
  const userId = User?.user?._id;
  const messageRef = useRef<any>(null);


  const formatTime = (timestamp: any) => {
    return format(new Date(timestamp), "hh:mm a"); // 12-hour format with AM/PM
  };

  const toggleEmojiPicker = () => {
    setEmojiPickerOpen((prev) => !prev);
  };

  const onEmojiClick = (emoji: any) => {
    console.log(emoji, "Selected Emoji");
    setMessageInput((prev) => prev + (emoji.native || emoji.emoji || "")); // Append any valid property
    setEmojiPickerOpen(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setSelectedFile(file); // Save the file for sending later
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setImagePreview(null);
    setSelectedFile(null);
  };

  useEffect(() => {
    (async () => {
      const response = await axiosInstance.get(
        `/api/auth/getConverstationById?id=${convesationId}`
      );

      if (response.data.status) {
        setMessages(response.data.data);
      } else {
        toast.error(response.data.data);
      }
    })();
  }, [convesationId, userId]);

  useEffect(() => {
    if (socket) {
      if (User?.user?._id !== undefined) {
        socket?.emit("joinChat", { id: userId, chatId: convesationId });
      }
    }
  }, [convesationId, socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (data: any) => {
        if (data.converstationId === convesationId) {
          setMessages((prevMessages: any) => {
            const setNewMessage = [...prevMessages, data];
            return setNewMessage;
          });
        }
      });
    }
  }, [socket]);

  const sendImage = async () => {
    if (selectedFile && socket) {
      // Read the image as a base64 string
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result; // The base64 representation of the image

        const currentTime = new Date();
        socket.emit("sendImage", {
          senderId: User.user._id,
          recieverId: selectedDoctor._id,
          converstationId: convesationId,
          content: base64Image, // Send the base64 image data
          type: "image",
          timestamp: currentTime,
        });

        setImagePreview(null);
        setSelectedFile(null); // Clear the state after sending
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const sendMessage = async () => {
    const data = {
      converstationId: convesationId,
      content: messageInput,
      recieverId: selectedDoctor._id,
      senderId: User.user._id,
      type: "text",
    };
    const currentTime = new Date(); // Get the current timestamp

    socket?.emit("sendMessage", {
      senderId: User.user._id,
      recieverId: selectedDoctor._id,
      content: messageInput,
      type: "text",
      converstationId: convesationId,
      timestamp: currentTime, // Include the current timestamp
    });
    setMessageInput("");
  };

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        setIsRecording(true); // Update state to indicate recording
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setAudioStream(stream); // Save the stream for later stopping

        // Initialize or reinitialize the MediaRecorder
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
          console.log("Data available:", event.data.size, event.data.type); // Confirm the Blob details
          setAudioData(new Blob([event.data], { type: "audio/wav" })); // Update audioData
        };

        mediaRecorder.start(); // Start recording
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      console.error("getUserMedia is not supported in this browser");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      console.log("Stopping recording...");
      mediaRecorderRef.current.stop(); // Stop the recording
      setIsRecording(false); // Update state

      if (audioStream) {
        console.log("Stopping audio stream...");
        audioStream.getTracks().forEach((track) => track.stop()); // Stop the stream
        setAudioStream(null); // Clear the audio stream
      }
    }
  };

  const sendAudio = () => {
    stopRecording(); // Stop recording before sending

    setTimeout(() => {
      console.log("Audio Data after stopping:", audioData); // Check if `audioData` is set

      if (audioData) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Audio = reader.result;

          // Emit the audio data via socket
          socket.emit("audioStream", {
            content: base64Audio,
            senderId: User.user._id,
            recieverId: selectedDoctor._id,
            converstationId: convesationId,
            type: "voice_note",
            timestamp: new Date(),
          });

          setAudioData(null); // Reset `audioData` after sending
        };

        reader.readAsDataURL(audioData); // Convert `Blob` to Base64
      } else {
        console.error("No audio data to send");
      }
    }, 2000); // Add a delay to ensure `audioData` is finalized
  };

  return (
    <div className="w-full h-5/6 p-6">
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-blue-200 h-full p-4">
        {/* Display selected doctor */}
        <div className="flex items-center justify-start w-full">
          {selectedDoctor && (
            <>
              <div className="h-8 w-8 bg-indigo-200 rounded-full ml-5 overflow-hidden">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="ml-2 flex flex-col">
                <div className="text-sm font-semibold">
                  {selectedDoctor.name}
                </div>
                <div className="text-xs text-gray-500"></div>
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`col-start-1 col-span-12 md:col-span-8 p-3 rounded-lg ${
                  msg.senderId === userId ? "self-end" : "self-start"
                }`}
              >
                <div className="flex flex-row items-center">
                  <div className="relative ml-3 ">
                    <div className="flex flex-row items-center">
                      <div className="relative">
                        {msg.type === "image" ? (
                          <img
                            src={msg.content} // Base64-encoded image data
                            alt="Sent image"
                            className="w-44 h-44 bg-transparent object-cover rounded-lg"
                          />
                        ) : msg.type === "voice_note" ? (
                          <AudioPlayer
                            src={msg.content} // The source for the audio player
                            onPlay={() => console.log("Playing audio")}
                            showJumpControls={true} // Hide fast forward/rewind controls
                            layout="stacked" // Choose between 'horizontal' or 'stacked'
                            customAdditionalControls={[]} // Hide additional controls
                          />
                        ) : (
                          <div className="bg-cyan-950 ml-3 text-white text-base py-2 px-4 shadow rounded-xl">
                            {msg.content}
                          </div>
                        )}
                        <div className="text-xs text-gray-800 mt-1">
                          {format(new Date(msg.timestamp), "hh:mm a")}
                        </div>
                      </div>
                    </div>

                    <div ref={messageRef}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message input and send button */}
        <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
          <button onClick={toggleEmojiPicker} className="mr-4">
            🙂
          </button>
          {emojiPickerOpen && (
            <EmojiPicker onEmojiClick={(emoji) => onEmojiClick(emoji)} />
          )}

          <button onClick={startRecording}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 1a5 5 0 0 1 5 5v6a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5z" />
              <path d="M19 11v2a7 7 0 0 1-7 7 7 7 0 0 1-7-7v-2" />
              <path d="M12 19v4" />
            </svg>
          </button>

          <div className="p-4">
            <label className="flex items-center  space-x-2 p-2">
              <PhotoIcon className="w-6 h-6" />
              <input
                type="file"
                className="hidden "
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {imagePreview && (
              <div className=" bg-red-400 ">
                <div className="relative h-full w-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-44 h-44 object-cover "
                  />
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    onClick={handleCancel}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="absolute bottom-2 left-2 rounded-md text-white p-1  bg-slate-400 hover:bg-slate-500"
                    onClick={sendImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              {isRecording ? (
                <AudioWaveLoader /> // Display the loader while recording
              ) : (
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)} // Standard text input
                  className="flex w-full border bg-slate-200 border-gray-400 rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-gray-700"
                />
              )}
            </div>
          </div>
          <div className="ml-4">
            {isRecording ? (
              <button
                onClick={sendAudio}
                className="flex items-center justify-center bg-cyan-800 hover:bg-cyan-950 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            ) : (
              <button
                onClick={sendMessage}
                className="flex items-center justify-center bg-cyan-800 hover:bg-cyan-950 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span className="ml-2">
                  <svg
                    className="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
