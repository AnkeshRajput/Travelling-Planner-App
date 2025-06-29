"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { createTrip } from "@/lib/actions/create-trip";
import { UploadButton } from "@/lib/upload-thing";
import { error } from "console";
import Image from "next/image";


const NewTrip = () => {
  const [isPending , startTransition]=useTransition()
  const [imageUrl,setImageUrl] = useState("")
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <form className="space-y-6" action={(formdata : FormData)=>{
            if(imageUrl){
              formdata.append("image", imageUrl)
            }
            startTransition(() =>{createTrip(formdata)})
          }}>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1 ">
                Title
                <input
                  type="text"
                  name="title"
                  placeholder="Trip title"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description
                <textarea
                  name="description"
                  placeholder="Description of Trip...."
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            <div className="flex justify-between">
              <label>
                Start Date
                <input
                  type="Date"
                  name="startDate"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              <label>
                End Date
                <input
                  type="Date"
                  name="endDate"
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
            </div>
            {imageUrl && (
              <Image src={imageUrl} height={48} width={48} alt="Trip Preview" className="w-full mb-4 rounded-md max-h-48 object-cover" ></Image>
            )}
            <UploadButton endpoint="imageUploader" onClientUploadComplete={(res)=>{
              if(res && res[0].ufsUrl){
                setImageUrl(res[0].ufsUrl)
              }
            }}
            onUploadError={(error:Error)=>{console.log("Error in uploading image",error)}}></UploadButton>
            

            <Button type="submit" disabled={isPending} className="w-full mt-2 bg-blue-600 hover:bg-blue-800">{isPending?"Creating..." : "Create Trip"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
