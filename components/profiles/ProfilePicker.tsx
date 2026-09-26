"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useProfileStore } from "@/store/useProfileStore";
import { Profile } from "@/types/tmdb";
import { Plus, Edit3, Trash2, Check, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const AVATAR_OPTIONS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
];

export default function ProfilePicker() {
  const router = useRouter();
  const { profiles, activeProfile, setActiveProfile, addProfile, updateProfile, deleteProfile } =
    useProfileStore();

  const [isManaging, setIsManaging] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [isKids, setIsKids] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);

  const handleSelect = (profileId: string) => {
    if (isManaging) return;
    setActiveProfile(profileId);
    router.push("/");
  };

  const openEdit = (p: Profile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProfile(p);
    setName(p.name);
    setIsKids(p.isKids);
    setSelectedAvatar(p.avatar);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProfile || !name.trim()) return;
    updateProfile(editingProfile.id, {
      name: name.trim(),
      isKids,
      avatar: selectedAvatar,
    });
    setEditingProfile(null);
  };

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addProfile(name.trim(), isKids, selectedAvatar);
    setIsAddingNew(false);
    setName("");
    setIsKids(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex flex-col items-center justify-center p-6 select-none">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Who&apos;s Watching?
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Select your profile to personalize your watchlists and recommendations.
        </p>
      </motion.div>

      {/* Staggered Profile Cards Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-4xl"
      >
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            variants={{
              hidden: { opacity: 0, scale: 0.8, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
            onClick={() => handleSelect(profile.id)}
            className="group relative flex flex-col items-center gap-3 cursor-pointer"
          >
            {/* Avatar Circle Frame */}
            <div
              className={`relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl ${
                profile.id === activeProfile.id && !isManaging
                  ? "border-violet-500 ring-4 ring-violet-500/30 shadow-violet-950/60"
                  : "border-white/10 group-hover:border-violet-400"
              }`}
            >
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, 150px"
              />

              {/* Kids Mode Badge */}
              {profile.isKids && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-slate-950 text-[10px] font-black tracking-wider uppercase shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Kids
                </div>
              )}

              {/* Management Edit Overlay */}
              {isManaging && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => openEdit(profile, e)}
                    className="p-2.5 rounded-full bg-violet-600 text-white hover:scale-110 transition-transform"
                    aria-label={`Edit ${profile.name}`}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {profiles.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteProfile(profile.id);
                      }}
                      className="p-2.5 rounded-full bg-red-600 text-white hover:scale-110 transition-transform"
                      aria-label={`Delete ${profile.name}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile Name */}
            <span
              className={`text-sm sm:text-base font-bold transition-colors ${
                profile.id === activeProfile.id
                  ? "text-violet-400 font-extrabold"
                  : "text-slate-300 group-hover:text-white"
              }`}
            >
              {profile.name}
            </span>
          </motion.div>
        ))}

        {/* Add Profile Card */}
        {profiles.length < 6 && (
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              show: { opacity: 1, scale: 1 },
            }}
            onClick={() => {
              setName("");
              setIsKids(false);
              setIsAddingNew(true);
            }}
            className="group flex flex-col items-center gap-3 cursor-pointer"
          >
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl border-2 border-dashed border-white/20 group-hover:border-violet-400 flex items-center justify-center transition-all bg-white/5 group-hover:bg-violet-600/10 transform group-hover:scale-105">
              <Plus className="w-10 h-10 text-slate-400 group-hover:text-violet-400 transition-colors" />
            </div>
            <span className="text-sm font-semibold text-slate-400 group-hover:text-white">
              Add Profile
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Action Toggle Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <Button
          variant={isManaging ? "primary" : "secondary"}
          size="md"
          onClick={() => setIsManaging(!isManaging)}
        >
          {isManaging ? "Done Managing" : "Manage Profiles"}
        </Button>
      </motion.div>

      {/* Edit / Add Modal Dialog */}
      <AnimatePresence>
        {(editingProfile || isAddingNew) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-[#14141e] border border-violet-500/30 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="text-lg font-bold text-white">
                  {isAddingNew ? "Create New Profile" : "Edit Profile"}
                </h3>
                <button
                  onClick={() => {
                    setEditingProfile(null);
                    setIsAddingNew(false);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={isAddingNew ? handleAddNew : handleSaveEdit} className="mt-4 flex flex-col gap-4">
                {/* Choose Avatar */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Choose Avatar
                  </label>
                  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                    {AVATAR_OPTIONS.map((av, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedAvatar(av)}
                        className={`relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                          selectedAvatar === av
                            ? "border-violet-500 ring-2 ring-violet-500/50 scale-105"
                            : "border-white/10 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={av} alt="Avatar" fill className="object-cover" sizes="48px" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Profile Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. CinemaLover"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0f] border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>

                {/* Kids Mode Toggle */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-sm font-semibold text-white">Kids Profile?</p>
                    <p className="text-xs text-slate-400">Only shows PG, G and family-safe titles</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={isKids}
                    onChange={(e) => setIsKids(e.target.checked)}
                    className="w-5 h-5 accent-violet-600 rounded cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setEditingProfile(null);
                      setIsAddingNew(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    <Check className="w-4 h-4 mr-1.5" />
                    Save Profile
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
