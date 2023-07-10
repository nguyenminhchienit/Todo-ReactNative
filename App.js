import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const addTodo = () => {
    if (todoText.trim()) {
      if (editMode) {
        setTodos(todos.map(todo => {
          if (todo.id === editTodoId) {
            return { ...todo, text: todoText };
          }
          return todo;
        }));
        setEditMode(false);
        setEditTodoId(null);
      } else {
        setTodos([...todos, { id: Date.now().toString(), text: todoText }]);
      }
      setTodoText('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (todoToEdit) {
      setTodoText(todoToEdit.text);
      setEditMode(true);
      setEditTodoId(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Takis Tech Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter todo..."
          value={todoText}
          onChangeText={text => setTodoText(text)}
        />
        <Button style={{textAlign: 'center'}} title={editMode ? "Update" : "Add"} onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() => editTodo(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.todoItemContent}>
              <Text style={styles.todoText}>{item.text}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => editTodo(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removeTodo(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoItemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: '#333',
  },
  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#007BFF',
    borderRadius: 4,
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#DC3545',
    borderRadius: 4,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
