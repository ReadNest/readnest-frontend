/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editor } from "@tinymce/tinymce-react";
import { uploadFileToCloudinary } from "@/lib/utils";

export const TinyMCETextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const handleEditorPaste = async (event: any, editor: any) => {
    const clipboardData =
      event.clipboardData || event.originalEvent.clipboardData;
    if (!clipboardData) return;

    const items = clipboardData.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        event.preventDefault();

        const blob = item.getAsFile();

        if (blob) {
          try {
            const file = new File([blob], "pasted-image.png", {
              type: blob.type,
            });
            const url = await uploadFileToCloudinary(file);

            editor.insertContent(`<img src="${url}" alt="pasted image"/>`);
          } catch (error) {
            console.error("Failed to upload pasted image:", error);
          }
        }
      }
    }
  };

  return (
    <Editor
      value={value}
      onEditorChange={onChange}
      apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
      init={{
        height: 500,
        menubar: true,
        base_url: "/tinymce",
        suffix: ".min",
        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css",
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "autosave",
          "paste", // plugin paste
        ],
        toolbar:
          "undo redo | formatselect | bold italic underline | " +
          "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
          "link image media code preview fullscreen",
        automatic_uploads: true,
        paste_data_images: true,
        images_upload_handler: async (
          blobInfo: any,
          success: any,
          failure: any
        ) => {
          try {
            const blob = blobInfo.blob();
            const file = new File([blob], blobInfo.filename(), {
              type: blob.type,
            });
            const url = await uploadFileToCloudinary(file);
            console.log("Uploaded image URL:", url);
            success(url);
          } catch {
            failure("Failed to upload image");
          }
        },
        setup: (editor: any) => {
          editor.on("paste", (e: any) => handleEditorPaste(e, editor));
        },
      }}
    />
  );
};
