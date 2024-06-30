"use client";

import { FormBtn } from "@/components/form-btn";
import { FormInput } from "@/components/form-input";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { getUploadUrl, handleUpload } from "./actions";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [photoUploadUrl, setPhotoUploadUrl] = useState("");

  const onPhotoChage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    if (!file) {
      return;
    }

    const validFileType = ["image/jpeg", "image/png"];
    if (!validFileType.includes(file.type)) {
      setPreview("");
      alert("Not A Image");
      return;
    }

    if (file.size > 2097152) {
      setPreview("");
      alert("Too Big Image");
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);

    const { success, result } = await getUploadUrl();
    if (!success) {
      return;
    }

    setPhotoId(result.id);
    setPhotoUploadUrl(result.uploadURL);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setPreview("");
  };

  async function interceptAction(_: any, formData: FormData) {
    const file = formData.get("file");
    if (!file) {
      return;
    }
    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const result = await fetch(photoUploadUrl, {
      method: "POST",
      body: cloudflareForm,
    });
    if (result.status !== 200) {
      return;
    }

    const photoUrl = `https://imagedelivery.net/6YgtGjQy_S9vZGeZ75HNHA/${photoId}`;

    formData.set("file", photoUrl);

    return handleUpload(_, formData);
  }

  const [state, action] = useFormState(interceptAction, null);

  return (
    <div className="p-5">
      <form action={action} className="space-y-4">
        <label htmlFor="file">
          {preview !== "" && (
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <Image
                fill
                src={preview}
                alt="Preview Image"
                className="object-cover"
              />
              <button className="z-10 absolute right-2 top-2" onClick={onClick}>
                <XMarkIcon className="size-6 text-neutral-600" />
              </button>
            </div>
          )}
          {preview === "" && (
            <div className="aspect-square w-full flex flex-col items-center justify-center border-4 border-dashed rounded-xl">
              <PhotoIcon className="size-24 text-neutral-300" />
              {state?.fieldErrors.photo ? (
                <span className="text-sm text-red-500">
                  {state?.fieldErrors.photo}
                </span>
              ) : (
                <span className="text-sm text-neutral-400">
                  사진을 업로드해주세요.
                </span>
              )}
            </div>
          )}
        </label>
        <input
          id="file"
          type="file"
          hidden
          name="file"
          onChange={onPhotoChage}
        />

        <FormInput
          label="Product Title"
          name="title"
          type="text"
          required
          placeholder="Enter a product title"
          errors={state?.fieldErrors.title}
        />
        <FormInput
          label="Product Description"
          name="description"
          type="text"
          required
          placeholder="Enter a product description"
          errors={state?.fieldErrors.description}
        />
        <FormInput
          label="Product Price"
          name="price"
          type="number"
          required
          placeholder="Enter a product price"
          errors={state?.fieldErrors.price}
        />
        <FormBtn label="Add Product" />
      </form>
    </div>
  );
}
