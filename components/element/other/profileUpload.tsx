'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ProfileUpload() {
  const [previewSrc, setPreviewSrc] = useState('/images/logo/reallogo.png');

  const loadFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewSrc(URL.createObjectURL(file));
    }
  };

  return (
    <form>
      <div className="flex items-center space-x-6">
        <div className="shrink-0">
          <Image
            src={previewSrc}
            width={80}
            height={80}
            className="h-28 w-28 rounded-full object-cover"
            alt="Picture of the author"
          />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            type="file"
            onChange={loadFile}
            className="block w-full text-sm text-slate-500
              file:mr-4 file:rounded-full file:border-0
              file:bg-violet-50 file:px-4
              file:py-2 file:text-sm
              file:font-semibold file:text-violet-700
              hover:file:bg-violet-100
            "
          />
        </label>
      </div>
    </form>
  );
}
