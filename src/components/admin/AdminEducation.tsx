import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Education {
  id: number;
  title: string;
  description: string;
  topics: string[];
}

const topicOptions = ['Awareness', 'Safety', 'Emergency', 'Prevention'];

const AdminEducation = () => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({ title: '', description: '', topics: [] });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/education');
      const data = await res.json();
      setEducations(data);
    } catch (err) {
      console.error('Failed to fetch education:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(editingId ? `http://localhost:5000/api/education/${editingId}` : 'http://localhost:5000/api/education', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Failed to save education');
      fetchEducations();
      setFormData({ title: '', description: '', topics: [] });
      setEditingId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/education/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      fetchEducations();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData({ title: edu.title, description: edu.description, topics: edu.topics });
  };

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Manage Education Materials</h2>

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
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Topics</label>
          <div className="flex flex-wrap gap-2">
            {topicOptions.map(topic => (
              <button
                type="button"
                key={topic}
                className={`px-3 py-1 rounded-full border text-sm ${formData.topics.includes(topic)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'}`}
                onClick={() => handleTopicToggle(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
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
                <p className="text-gray-600 text-sm">{edu.description}</p>
                <div className="flex flex-wrap mt-2 gap-2">
                  {edu.topics.map(topic => (
                    <span key={topic} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                      {topic}
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
                  onClick={() => handleDelete(edu.id)}
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
