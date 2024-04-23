'use client';


import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
interface EditorProps {
   onChange: (value: string) => void;
   initialContent?: string;
   editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
   const editor: BlockNoteEditor = useCreateBlockNote({
      initialContent: initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined,
   });



   return <BlockNoteView onChange={() => {
      onChange(JSON.stringify(editor.document, null, 2));
   }}
      theme={'light'} editor={editor} />;
};

export default Editor;