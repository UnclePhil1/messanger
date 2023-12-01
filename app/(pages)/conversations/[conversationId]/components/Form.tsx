"use client";
import axios from "axios";
import useConversation from "../../../../hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUploadFile = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId
    });
  }

  return (
    <div className="p-4 bg-white border-t flex justify-between items-center gap-2 lg:gap-4 w-[100%] overflow-x-hidden">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        onUpload={handleUploadFile}
        uploadPreset="eb13vgqh"
      >
        <HiPhoto size={30} className="hover:text-primary text-sky-600" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex md:justify-between items-center gap-2 lg:gap-4 w-[100%]"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          placeholder="Start a Conversation..."
          required
        />
        <button
          type="submit"
          className="rounded-full p-2 hover:bg-primary cursor-pointer bg-sky-600 transition-all"
        >
          <HiPaperAirplane size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
