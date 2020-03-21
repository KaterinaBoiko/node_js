import { Component, OnInit } from '@angular/core';
import { baseURL } from '../shared/baseURL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../shared/note';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[];
  httpOptions: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      })
    };
    this.getNotes().subscribe(data => {
      this.notes = data.notes;
    },
      error => console.log(error));
  }

  getNotes(): Observable<any> {
    return this.http.get<any>(baseURL + 'api/notes', this.httpOptions);
  }

  deleteNote(id: number) {
    var index = this.notes.indexOf(this.notes.find(n => n.id == id));
    if (index !== -1) this.notes.splice(index, 1);
    this.http.delete<any>(baseURL + 'api/notes/' + id, this.httpOptions)
      .subscribe(data => console.log(data),
        error => console.log(error));
  }

  changeNote(note: Note) {
    this.http.put<any>(baseURL + 'api/notes', note, this.httpOptions)
      .subscribe(data => console.log(data),
        error => console.log(error));
  }

  addNote() {
    let newNote = new Note('new note', 'description here');
    this.http.post<any>(baseURL + 'api/notes', newNote, this.httpOptions)
      .subscribe((data: any) => {this.notes = data.notes},
        error => console.log(error));
  }
}
