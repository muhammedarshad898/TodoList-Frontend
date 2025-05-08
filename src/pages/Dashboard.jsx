import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/pages/Dashboard.module.css';
import AddTaskModal from '../components/Add';
import { api } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch tasks';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await api.addTask(taskData);
      setTasks(prevTasks => [...prevTasks, newTask]);
      toast.success('Task added successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      const errorMessage = err.message || 'Failed to add task';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error adding task:', err);
    }
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task._id === taskId);
    setEditingTask(taskToEdit);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this task?</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
          <button
            onClick={() => {
              toast.dismiss();
              deleteTask(taskId);
            }}
            style={{
              padding: '5px 15px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            style={{
              padding: '5px 15px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        style: {
          minWidth: '300px'
        }
      }
    );
  };

  const deleteTask = async (taskId) => {
    try {
      await api.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
      toast.success('Task deleted successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete task';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const result = await api.updateTask(editingTask._id, updatedTask);
      setTasks(tasks.map(task => 
        task._id === editingTask._id ? result : task
      ));
      setEditingTask(null);
      toast.success('Task updated successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error updating task:', err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const result = await api.updateStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task._id === taskId ? result : task
      ));
      toast.success(`Task marked as ${newStatus}!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      const errorMessage = err.message || 'Failed to update task status';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error updating task status:', err);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading tasks...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Header */}
      <div className={styles.dashboardHeader}>
        <h1>Dashboard</h1>
        <div className={styles.userInfo}>
          <span>Welcome, User</span>
        </div>
      </div>

      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>Welcome back! 👋</h2>
        <p className={styles.welcomeSubtitle}>Here's an overview of your tasks and progress</p>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{tasks.length}</div>
          <div className={styles.statLabel}>Total Tasks</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {tasks.filter(task => task.status === 'completed').length}
          </div>
          <div className={styles.statLabel}>Completed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {tasks.filter(task => task.status === 'pending').length}
          </div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {tasks.length > 0 
              ? Math.round((tasks.filter(task => task.status === 'completed').length / tasks.length) * 100)
              : 0}%
          </div>
          <div className={styles.statLabel}>Productivity</div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className={styles.recentTasks}>
        <h2 className={styles.sectionTitle}>
          <span>📋</span> Recent Tasks
        </h2>
        <div className={styles.taskList}>
          {tasks.map(task => (
            <div key={task._id} className={styles.taskItem}>
              <input
                type="checkbox"
                className={styles.taskCheckbox}
                checked={task.status === 'completed'}
                onChange={() => handleStatusChange(task._id, task.status === 'completed' ? 'pending' : 'completed')}
              />
              <span className={styles.taskTitle}>{task.title}</span>
              <span className={`${styles.taskStatus} ${
                task.status === 'completed' ? styles.statusCompleted : styles.statusPending
              }`}>
                {task.status}
              </span>
              <div className={styles.taskActions}>
                <button
                  className={`${styles.actionButton} ${styles.editButton} ${styles.tooltip}`}
                  onClick={() => handleEditTask(task._id)}
                  data-tooltip="Edit Task"
                >
                  ✏️
                </button>
                <button
                  className={`${styles.actionButton} ${styles.deleteButton} ${styles.tooltip}`}
                  onClick={() => handleDeleteTask(task._id)}
                  data-tooltip="Delete Task"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Task Button */}
      <button 
        className={styles.addTaskButton}
        onClick={() => {
          setEditingTask(null);
          setIsModalOpen(true);
        }}
      >
        +
      </button>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onAddTask={editingTask ? handleUpdateTask : handleAddTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;