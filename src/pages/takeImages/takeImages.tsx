import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

export default function TakeImages() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);


  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (url) {
      //this return is necessary bc this makes run the function before url changes
      return () => {
        URL.revokeObjectURL(url);
      }
    }
  }, [url]);


  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file: File | undefined = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setUrl(URL.createObjectURL(file));
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-linear-to-br from-amber-50 to-orange-100 p-6">
      <img className="w-64" src="/images/scratch-logo-splash-screen.png" alt="" />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-amber-900 mb-8">Upload or take a Photo</h1>

        <div className='w-full flex flex-col gap-3 mb-8'>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 px-6 text-lg font-semibold bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            📁 Upload image
          </button>
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="w-full py-4 px-6 text-lg font-semibold bg-linear-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            📷 Open the camera
          </button>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          type="file"
          accept="image/*"
          ref={cameraInputRef}
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />

        {
          url && (
            <div className="flex flex-col space-y-3 bg-amber-50 rounded-lg shadow-lg p-6 overflow-hidden border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-900">Preview</h2>
              <div className="bg-linear-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center overflow-hidden max-h-96">
                <img src={url} alt="preview" className="w-full h-full object-contain" />
              </div>

              {
                selectedFile && (
                  <div className="bg-linear-to-r from-amber-100 to-orange-100 p-3 rounded-md border border-amber-300">
                    <p className="text-sm text-amber-900">
                      <span className="font-semibold">Archivo:</span> {selectedFile.name}
                    </p>
                    <p className="text-sm text-amber-800">
                      <span className="font-semibold">Tamaño:</span> {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )
              }

              {selectedFile && url && (
                <div className="flex justify-between items-center w-full py-4 px-6 text-lg font-semibold bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5">
                  Procesar imagen
                  <Link to="/processImage" className="cursor-pointer h-12 w-12 rounded-full flex justify-center items-center bg-amber-50 text-amber-700">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>

                  </Link>
                </div>
              )

              }
            </div>
          )
        }


      </div>

    </div>

  )
}