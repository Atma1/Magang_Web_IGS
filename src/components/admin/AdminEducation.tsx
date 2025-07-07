import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { EducationContent } from '@/types';
import { useEducation } from '@/hooks/useEducation';

const categoryOptions = ['Awareness', 'Safety', 'Emergency', 'Prevention'];

const AdminEducation = () => {
  const {
    educations,
    loading,
    error,
    addEducation,
    updateEducation,
    deleteEducation
  } = useEducation();
  const [formData, setFormData] = useState<Omit<EducationContent, 'id'>>({
    title: '', content: '', tags: [], summary: '', image_url: '', category: ''
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateEducation(editingId, formData);
      setEditingId(null);
    } else {
      await addEducation(formData);
    }
    setFormData({ title: '', content: '', tags: [], summary: '', image_url: '', category: '' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await deleteEducation(id);
  };

  const handleEdit = (edu: EducationContent) => {
    setEditingId(Number(edu.id));
    setFormData({
      title: edu.title,
      content: edu.content,
      tags: edu.tags,
      summary: edu.summary,
      image_url: edu.image_url,
      category: edu.category
    });
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: category
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Manage Education Materials</h2>
      {error && <div className="text-red-500">{error}</div>}
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl bg-white shadow">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="w-full p-2 border rounded"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Summary</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.summary}
            onChange={e => setFormData({ ...formData, summary: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.content}
            onChange={e => setFormData({ ...formData, content: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tags</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.tags}
            onChange={e => setFormData({ ...formData, tags: e.target.value.split(',') })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mt-1">Category</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {categoryOptions.map(category => (
              <button
                type="button"
                key={category}
                className={`px-3 py-1 rounded-full border text-sm ${formData.category.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          {editingId ? 'Update' : 'Add'} Education
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {educations.map((edu) => (
            <motion.div
              key={edu.id}
              className="p-4 rounded-xl bg-gray-100 shadow flex justify-between items-start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <h3 className="text-lg font-bold">{edu.title}</h3>
                <p className="text-gray-600 text-sm">{edu.content}</p>
                <div className="flex flex-wrap mt-2 gap-2">
                  {edu.tags.map(tag => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="p-2 bg-yellow-400 text-white rounded"
                  onClick={() => handleEdit(edu)}
                >
                  <FaEdit />
                </button>
                <button
                  className="p-2 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(Number(edu.id))}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEducation;
