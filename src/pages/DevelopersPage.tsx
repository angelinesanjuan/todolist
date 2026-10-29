
import React, { useState } from 'react';
import {
  UserCheck,
  Mail,
  Edit3,
  Check,
  X,
  Plus,
  Trash2,
} from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';
import { Developer } from '../type';

export const DevelopersPage: React.FC = () => {
  const { developers, updateDevelopers } = useTaskContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedDevs, setEditedDevs] = useState<Developer[]>(developers);

  const handleStartEdit = () => {
    setEditedDevs([...developers]);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateDevelopers(editedDevs);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedDevs([...developers]);
    setIsEditing(false);
  };

  const handleMemberChange = (
    index: number,
    field: keyof Developer,
    value: string
  ) => {
    setEditedDevs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddMember = () => {
    if (editedDevs.length >= 4) return;

    const newMember: Developer = {
      id: `dev-${Date.now()}`,
      name: 'New Group Member',
      role: '',
      contribution: '',
      email: 'student@cvsu.edu.ph',
      studentId: '2023-XXXXX',
    };

    setEditedDevs((prev) => [...prev, newMember]);
  };

  const handleRemoveMember = (index: number) => {
    if (editedDevs.length <= 1) return;
    setEditedDevs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Developers Page
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Names and contact information of the project development team.
          </p>
        </div>

        <div>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancelEdit}
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>

              <button
                onClick={handleSaveEdit}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleStartEdit}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Edit Members</span>
            </button>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-4">
          <p>
            <strong>Edit Mode Active:</strong> You can edit member names,
            student IDs, and email addresses.
          </p>

          {editedDevs.length < 4 && (
            <button
              onClick={handleAddMember}
              type="button"
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(isEditing ? editedDevs : developers).map((member, index) => (
          <div
            key={member.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between"
          >
            {isEditing ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-emerald-800">
                    Member #{index + 1}
                  </span>

                  {editedDevs.length > 1 && (
                    <button
                      onClick={() => handleRemoveMember(index)}
                      type="button"
                      className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Complete Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={member.name}
                    onChange={(e) =>
                      handleMemberChange(index, 'name', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    value={member.studentId}
                    onChange={(e) =>
                      handleMemberChange(index, 'studentId', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleMemberChange(index, 'email', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                      {member.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-base font-bold text-slate-900 leading-tight">
                        {member.name}
                      </h2>
                    </div>
                  </div>

                  {member.studentId && (
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                      {member.studentId}
                    </span>
                  )}
                </div>

                {member.email && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{member.email}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end text-xs">
                  <span className="flex items-center gap-1 font-medium text-emerald-800">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Active Member</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
