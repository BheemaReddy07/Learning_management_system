import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const LectureTab = () => {
  const { backendurl, token } = useContext(AppContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const { data } = await axios.post(
          backendurl + "/api/media/upload-video",
          formData,
          {
            headers: { token },
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (data.success) {
          console.log(data)
          setUploadVideoInfo({
            videoUrl: data.result.url,
            publicId: data.result.public_id,
          });
          setBtnDisable(false);
          toast.success(data.message);
        }
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        toast.error(error.response?.data?.message || "Upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive">
            {removeLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className=" flex  flex-col gap-4">
        <div>
          <Label>
            {" "}
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            placeholder="Ex.Introduction to JS"
            onChange={fileChangeHandler}
            className="w-fit"
          />
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
