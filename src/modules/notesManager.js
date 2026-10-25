// src/modules/notesManager.js — Complete CRUD, search, filter, export & import for study notes

class NotesManager {
  constructor(bridge, progressManager) {
    this.bridge = bridge;
    this.progressManager = progressManager;
  }

  getNotes() {
    return this.progressManager.data.notes || [];
  }

  getNoteById(id) {
    return this.getNotes().find(n => n.id === id);
  }

  async saveNote({ id, title, content, moduleId, lessonId, tags }) {
    const notes = this.getNotes();
    const now = new Date().toISOString();
    let note;

    if (id) {
      const idx = notes.findIndex(n => n.id === id);
      if (idx !== -1) {
        note = {
          ...notes[idx],
          title: (title || '').trim() || 'Untitled Note',
          content: content || '',
          moduleId: moduleId || null,
          lessonId: lessonId || null,
          tags: Array.isArray(tags) ? tags : [],
          updatedAt: now
        };
        notes[idx] = note;
      }
    }

    if (!note) {
      note = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        title: (title || '').trim() || 'Untitled Note',
        content: content || '',
        moduleId: moduleId || null,
        lessonId: lessonId || null,
        tags: Array.isArray(tags) ? tags : [],
        createdAt: now,
        updatedAt: now
      };
      notes.unshift(note);
    }

    this.progressManager.data.notes = notes;
    this.progressManager.logActivity('note_save', `Saved note: ${note.title}`);
    await this.progressManager.save();
    return note;
  }

  async deleteNote(id) {
    let notes = this.getNotes();
    const target = notes.find(n => n.id === id);
    if (!target) return false;

    this.progressManager.data.notes = notes.filter(n => n.id !== id);
    this.progressManager.logActivity('note_delete', `Deleted note: ${target.title}`);
    await this.progressManager.save();
    return true;
  }

  searchNotes(query = '', moduleId = null) {
    let notes = this.getNotes();
    const q = (query || '').toLowerCase().trim();

    return notes.filter(note => {
      const matchModule = moduleId ? note.moduleId === moduleId : true;
      if (!matchModule) return false;

      if (!q) return true;
      const matchTitle = (note.title || '').toLowerCase().includes(q);
      const matchContent = (note.content || '').toLowerCase().includes(q);
      const matchTags = (note.tags || []).some(t => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchTags;
    });
  }

  async exportNotesNative() {
    if (!this.bridge || !this.bridge.saveFileDialog) {
      throw new Error('Native file save dialog not available');
    }
    const notes = this.getNotes();
    const payload = {
      app: 'NeuralVerse Studio',
      exportedAt: new Date().toISOString(),
      notesCount: notes.length,
      notes
    };

    const res = await this.bridge.saveFileDialog(payload, `neuralverse_notes_${Date.now()}.json`);
    if (res.success) {
      this.progressManager.logActivity('notes_export', `Exported ${notes.length} notes`);
      if (this.bridge.showNotification) {
        this.bridge.showNotification('Notes Exported', `Saved to ${res.filePath}`);
      }
    }
    return res;
  }


  generateMarkdown(notes) {
    let md = `# NeuralVerse Study Notes Revision\nExported: ${new Date().toLocaleString()}\n\n---\n\n`;
    notes.forEach(n => {
      md += `## ${n.title}\n`;
      if (n.moduleId) md += `*Module: ${n.moduleId}*  \n`;
      if (n.tags && n.tags.length) md += `*Tags: ${n.tags.join(', ')}*  \n`;
      md += `\n${n.content}\n\n---\n\n`;
    });
    return md;
  }

  async exportNotesMarkdown() {
    if (!this.bridge || !this.bridge.saveFileDialog) {
      throw new Error('Native file save dialog not available');
    }
    const notes = this.getNotes();
    const md = this.generateMarkdown(notes);

    const res = await this.bridge.saveFileDialog(md, `neuralverse_notes_${Date.now()}.md`);
    if (res.success) {
      this.progressManager.logActivity('notes_export', `Exported notes as Markdown`);
      if (this.bridge.showNotification) {
        this.bridge.showNotification('Notes Exported (Markdown)', `Saved to ${res.filePath}`);
      }
    }
    return res;
  }

  async importNotesNative() {
    if (!this.bridge || !this.bridge.openFileDialog) {
      throw new Error('Native file open dialog not available');
    }
    const res = await this.bridge.openFileDialog();
    if (!res.success) return res;

    let importedCount = 0;
    const now = new Date().toISOString();

    if (res.type === 'json') {
      const incoming = Array.isArray(res.data) ? res.data : (res.data.notes || []);
      if (!Array.isArray(incoming)) {
        return { success: false, error: 'JSON does not contain a valid notes array' };
      }

      for (const item of incoming) {
        if (!item || typeof item !== 'object') continue;
        const newNote = {
          id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          title: item.title || 'Imported Note',
          content: item.content || '',
          moduleId: item.moduleId || null,
          lessonId: item.lessonId || null,
          tags: Array.isArray(item.tags) ? item.tags : ['imported'],
          createdAt: item.createdAt || now,
          updatedAt: now
        };
        this.progressManager.data.notes.unshift(newNote);
        importedCount++;
      }
    } else if (res.type === 'text') {
      const newNote = {
        id: 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        title: res.filename || 'Imported Text Document',
        content: res.data,
        moduleId: null,
        lessonId: null,
        tags: ['imported', 'text-file'],
        createdAt: now,
        updatedAt: now
      };
      this.progressManager.data.notes.unshift(newNote);
      importedCount = 1;
    }

    if (importedCount > 0) {
      await this.progressManager.save();
      this.progressManager.logActivity('notes_import', `Imported ${importedCount} notes from ${res.filename}`);
      if (this.bridge.showNotification) {
        this.bridge.showNotification('Notes Imported', `Successfully added ${importedCount} note(s).`);
      }
    }

    return { success: true, count: importedCount, filename: res.filename };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NotesManager };
}
