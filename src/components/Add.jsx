import React, { useState } from 'react';
import styles from '../styles/components/AddTaskModal.module.css';
import { api } from '../services/api';

const AddTaskModal = ({ isOpen, onClose, onAddTask, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    status: 'pending'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form data when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate || '',
        status: initialData.status || 'pending'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        status: 'pending'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (initialData) {
        // Update existing task
        const updatedTask = await api.updateTask(initialData._id, formData);
        onAddTask(updatedTask);
      } else {
        // Create new task
        const newTask = await api.addTask(formData);
        onAddTask(newTask);
      }

      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        status: 'pending'
      });
      onClose();
    } catch (err) {
      setError(err.message || 'An error occurred while saving the task');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {initialData ? 'Edit Task' : 'Add New Task'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className={styles.input}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              className={styles.textarea}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Priority</label>
            <div className={styles.priorityGroup}>
              {['low', 'medium', 'high'].map(priority => (
                <div
                  key={priority}
                  className={`${styles.priorityOption} ${
                    formData.priority === priority ? styles.selected : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, priority }))}
                >
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className={styles.input}
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Saving...' : (initialData ? 'Update Task' : 'Add Task')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;