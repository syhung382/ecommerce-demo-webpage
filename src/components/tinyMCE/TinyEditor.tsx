import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState } from "react";
import type { ImageRes } from "../../utils/responseUtils";
import { PopupModal } from "../modals";
import ImageSelectOne from "../../modules/library/ImageSelectOne";
import type { TinyEditorProps } from "../../utils/interface";
import { currentUrlImage } from "../../api/axiosInstance";
import { useAppSelector } from "../../hooks/hook";

const TinyEditor = ({ onChange, value }: TinyEditorProps) => {
  const [isSelectImage, setIsSelectImage] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageSelectRef = useRef<any>(null);
  const isDarkMode = useAppSelector((state) => state.global.darkMode);

  const handleConfirmImageSelected = (value: ImageRes) => {
    setIsSelectImage(false);
    if (editorRef.current) {
      const html = `<img src="${currentUrlImage}${value.imageUrl}" alt="${value.imageUrl}" />`;
      editorRef.current.insertContent(html);

      // Gửi nội dung mới về cha
      const newContent = editorRef.current.getContent();
      onChange(newContent);
    }
  };

  const handlePopupConfirm = () => {
    if (imageSelectRef.current) {
      imageSelectRef.current.confirmSelected();
    }
  };

  return (
    <>
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        onInit={(_evt, editor) => {
          editorRef.current = editor;

          // Ghi đè nút image để mở popup
          editor.ui.registry.addButton("image", {
            icon: "image",
            tooltip: "Chèn ảnh",
            onAction: () => {
              setIsSelectImage(true);
            },
          });
        }}
        value={value}
        key={isDarkMode ? "editor-dark" : "editor-light"}
        onEditorChange={(newContent) => onChange(newContent)}
        licenseKey="gpl"
        init={{
          height: 700,
          menubar: false,
          skin: isDarkMode ? "oxide-dark" : "oxide",
          content_css: isDarkMode ? "dark" : "default",
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
          ],
          toolbar: [
            "undo redo | styles  bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "image link | " +
              "bullist numlist outdent indent",
            "removeformat | fullscreen help",
          ],
        }}
      />

      <PopupModal
        isOpen={isSelectImage}
        onCancel={() => setIsSelectImage(false)}
        onConfirm={handlePopupConfirm}
        buttonCancelTitle="Trở lại"
        buttonConfirmTitle="Chọn ảnh"
        typeButton="success"
        title="Chọn ảnh"
      >
        <ImageSelectOne
          ref={imageSelectRef}
          handleSelectConfirm={handleConfirmImageSelected}
        />
      </PopupModal>
    </>
  );
};

export default TinyEditor;
