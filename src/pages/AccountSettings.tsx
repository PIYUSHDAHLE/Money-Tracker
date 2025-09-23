import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useAppDispatch } from "../hooks";
import { Helmet } from "react-helmet";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Textarea,
  Button,
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import GlobalButton from "@/components/common/GlobalButton";
import { fetchUser, updateUser } from "../store/authSlice";
import Cropper from "react-easy-crop";

export default function AccountSettings() {
  const user = useSelector((s: RootState) => s.auth.user);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    familyCount: 0,
    familyMembers: [] as string[],
    currentAddress: "",
    permanentAddress: "",
    profilePicture: "",
  });

  const [profileModal, setProfileModal] = useState(false);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        familyCount: user.familyCount || 0,
        familyMembers: user.familyMembers || [],
        currentAddress: user.currentAddress || "",
        permanentAddress: user.permanentAddress || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  function handleFamilyCountChange(count: number) {
    setForm((f) => {
      const newMembers = [...f.familyMembers];
      while (newMembers.length < count) newMembers.push("");
      while (newMembers.length > count) newMembers.pop();
      return { ...f, familyCount: count, familyMembers: newMembers };
    });
  }

  async function handleUpdate() {
    try {
      await dispatch(
        updateUser({
          ...form,
          familyMembers: form.familyMembers.filter(Boolean),
        })
      ).unwrap();

      alert("Profile updated successfully!");

      if (user?.id) {
        dispatch(fetchUser(user.id));
      }
    } catch (err: any) {
      alert(err.message || "Update failed");
    }
  }

  function handleProfileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
        setProfileModal(true); // open cropper modal
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ util: crop image via canvas
  const getCroppedImg = useCallback(
    async (imageSrc: string, cropPixels: any) => {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      canvas.width = cropPixels.width;
      canvas.height = cropPixels.height;

      ctx.drawImage(
        image,
        cropPixels.x,
        cropPixels.y,
        cropPixels.width,
        cropPixels.height,
        0,
        0,
        cropPixels.width,
        cropPixels.height
      );

      return canvas.toDataURL("image/jpeg");
    },
    []
  );

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  async function saveCroppedImage() {
    if (profilePreview && croppedAreaPixels) {
      const cropped = await getCroppedImg(profilePreview, croppedAreaPixels);
      if (cropped) {
        setForm((f) => ({
          ...f,
          profilePicture: cropped,
        }));
      }
    }
    setProfileModal(false);
    setProfilePreview(null);
  }

  // 🚨 Guard: If no user is logged in
  if (!user) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        Loading user data...
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Account Settings | Money Tracker</title>
                <meta name="title" content="Account Settings | Money Tracker" />
        <meta
          name="description"
          content="Update your profile, manage preferences, and customize your Money Tracker account securely."
        />
      </Helmet>

      <div className="container mx-auto p-6 lg:px-25 space-y-6 dark:bg-black">
        <h1 className="text-2xl font-semibold dark:text-white mb-4">
          Account Settings
        </h1>

        <Card className="bg-[#f0f8ff] dark:bg-[#1a1a1a]">
          <CardHeader className="text-xl">Profile Information</CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-end  space-x-6">
              <Avatar
                src={form.profilePicture || undefined}
                size="lg"
                className="cursor-pointer w-40 h-40"
                onClick={() => document.getElementById("fileInput")?.click()}
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileUpload}
              />
            </div>

            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
            />
            <Input
              label="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(e) =>
                setForm((f) => ({ ...f, phone: e.target.value }))
              }
            />

            <Input
              label="Total Family Members"
              type="number"
              value={form.familyCount.toString()}
              onChange={(e) =>
                handleFamilyCountChange(Number(e.target.value) || 0)
              }
            />

            {form.familyMembers.map((member, idx) => (
              <Input
                key={idx}
                label={`Family Member ${idx + 1}`}
                value={member}
                onChange={(e) =>
                  setForm((f) => {
                    const updated = [...f.familyMembers];
                    updated[idx] = e.target.value;
                    return { ...f, familyMembers: updated };
                  })
                }
              />
            ))}

            <Textarea
              label="Current Address"
              value={form.currentAddress}
              onChange={(e) =>
                setForm((f) => ({ ...f, currentAddress: e.target.value }))
              }
            />
            <Textarea
              label="Permanent Address"
              value={form.permanentAddress}
              onChange={(e) =>
                setForm((f) => ({ ...f, permanentAddress: e.target.value }))
              }
            />

            <div className="flex justify-end">
              <GlobalButton onClick={handleUpdate}>Update</GlobalButton>
            </div>
          </CardBody>
        </Card>

        {/* Profile Crop Modal */}
        <Modal isOpen={profileModal} onOpenChange={setProfileModal}>
          <ModalContent>
            <ModalHeader>Crop Profile Picture</ModalHeader>
            <ModalBody>
              {profilePreview && (
                <div className="relative w-full h-64 bg-black">
                  <Cropper
                    image={profilePreview}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                variant="solid"
                onClick={() => {
                  setProfileModal(false);
                  setProfilePreview(null);
                }}
              >
                Cancel
              </Button>
              <Button color="primary" variant="flat" onClick={saveCroppedImage}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
